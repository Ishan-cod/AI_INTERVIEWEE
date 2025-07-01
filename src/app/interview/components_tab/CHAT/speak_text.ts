// Enhanced speak function with better error handling and reliability
const speak = (text: string, onComplete?: () => void) => {
  if (!window.speechSynthesis) {
    console.warn("Speech synthesis not supported in this browser.");
    onComplete?.();
    return;
  }

  // Validate input text
  if (!text || text.trim().length === 0) {
    console.warn("No text provided for speech synthesis.");
    onComplete?.();
    return;
  }

  console.log("SPEECH STARTED");

  // Cancel any ongoing speech with a small delay to ensure proper cleanup
  window.speechSynthesis.cancel();

  // Wait a bit for the cancellation to complete
  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text.trim());

    // Configure speech parameters
    utterance.rate = 1;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    utterance.lang = "en-IN";

    let hasCompleted = false;
    let completionTimer: NodeJS.Timeout;

    const handleCompletion = () => {
      if (hasCompleted) return;
      hasCompleted = true;

      if (completionTimer) {
        clearTimeout(completionTimer);
      }

      console.log("Speech ended");
      onComplete?.();
    };

    // Set up event handlers
    utterance.onend = () => {
      console.log("Speech synthesis onend event");
      handleCompletion();
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      console.error("Error details:", {
        error: event.error,
        charIndex: event.charIndex,
        elapsedTime: event.elapsedTime,
        name: event.name,
        utterance: event.utterance,
      });
      handleCompletion();
    };

    utterance.onstart = () => {
      console.log("Speech synthesis started");

      // Fallback timer in case onend doesn't fire
      // Estimate speech duration (roughly 150 words per minute)
      const wordCount = text.split(" ").length;
      const estimatedDuration = (wordCount / 150) * 60 * 1000; // Convert to milliseconds
      const timeoutDuration = Math.max(estimatedDuration + 5000, 10000); // At least 10 seconds

      completionTimer = setTimeout(() => {
        console.warn("Speech timeout reached, forcing completion");
        handleCompletion();
      }, timeoutDuration);
    };

    utterance.onpause = () => {
      console.log("Speech synthesis paused");
    };

    utterance.onresume = () => {
      console.log("Speech synthesis resumed");
    };

    const loadAndSpeak = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        console.log(
          "Available voices:",
          voices.map((v) => ({ name: v.name, lang: v.lang }))
        );

        const preferredVoices = [
          "Google UK English Female",
          "Google US English",
          "Microsoft Jenny Online (Natural) - English (United States)",
          "Microsoft Aria Online (Natural) - English (United States)",
          "Alex", // macOS
          "Samantha", // macOS
          "Google English", // General fallback
        ];

        // Try to find preferred voice
        let bestVoice = voices.find((v) => preferredVoices.includes(v.name));

        // If no preferred voice found, find any English voice
        if (!bestVoice) {
          bestVoice = voices.find((v) => v.lang.startsWith("en"));
        }

        // If still no voice found, use the first available voice
        if (!bestVoice && voices.length > 0) {
          bestVoice = voices[0];
        }

        if (bestVoice) {
          utterance.voice = bestVoice;
          console.log("Selected voice:", bestVoice.name, bestVoice.lang);
        } else {
          console.warn("No suitable voice found, using default");
        }

        // Check if speech synthesis is ready
        if (window.speechSynthesis.speaking) {
          console.warn(
            "Speech synthesis is already speaking, canceling previous"
          );
          window.speechSynthesis.cancel();

          // Wait a bit and try again
          setTimeout(() => {
            window.speechSynthesis.speak(utterance);
          }, 100);
        } else {
          window.speechSynthesis.speak(utterance);
        }
      } catch (error) {
        console.error("Error in loadAndSpeak:", error);
        handleCompletion();
      }
    };

    // Handle voice loading
    const voices = speechSynthesis.getVoices();
    if (voices.length === 0) {
      console.log("Waiting for voices to load...");

      // Set up voice loading handler with timeout
      const voiceTimeout = setTimeout(() => {
        console.warn("Voice loading timeout, proceeding with default voice");
        speechSynthesis.onvoiceschanged = null;
        loadAndSpeak();
      }, 3000);

      speechSynthesis.onvoiceschanged = () => {
        console.log("Voices loaded");
        clearTimeout(voiceTimeout);
        speechSynthesis.onvoiceschanged = null;
        loadAndSpeak();
      };
    } else {
      loadAndSpeak();
    }
  }, 100); // Small delay after cancellation
};

// Alternative approach for browsers with persistent issues
const speakWithChunking = (text: string, onComplete?: () => void) => {
  if (!window.speechSynthesis) {
    console.warn("Speech synthesis not supported in this browser.");
    onComplete?.();
    return;
  }

  // Split text into smaller chunks to avoid issues with long text
  const maxChunkLength = 200;
  const chunks: any = [];

  for (let i = 0; i < text.length; i += maxChunkLength) {
    const chunk = text.substring(i, i + maxChunkLength);
    // Try to break at word boundaries
    const lastSpace = chunk.lastIndexOf(" ");
    if (lastSpace > 0 && i + maxChunkLength < text.length) {
      chunks.push(text.substring(i, i + lastSpace));
      i = i + lastSpace; // Adjust index
    } else {
      chunks.push(chunk);
    }
  }

  let currentChunk = 0;

  const speakChunk = () => {
    if (currentChunk >= chunks.length) {
      onComplete?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunks[currentChunk]);
    utterance.rate = 1;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    utterance.lang = "en-IN";

    utterance.onend = () => {
      currentChunk++;
      setTimeout(speakChunk, 100); // Small delay between chunks
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error in chunk:", event);
      currentChunk++;
      setTimeout(speakChunk, 100); // Continue with next chunk
    };

    window.speechSynthesis.speak(utterance);
  };

  window.speechSynthesis.cancel();
  setTimeout(speakChunk, 100);
};

// Export both functions
export { speak, speakWithChunking };
