import { useEffect, useRef, useState } from "react";

interface UseSpeechToTextReturn {
  transcript: string;
  isListening: boolean;
  start: () => Promise<void>;
  stop: () => void;
}

export function useSpeechToText(
  lang: string = "en-IN",
  silenceTimeout: number = 3000
): UseSpeechToTextReturn {
  const [transcript, setTranscript] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
      }
      setTranscript((prev) => prev + finalTranscript);
    };

    recognition.onerror = (e: any) => {
      console.error("SpeechRecognition error:", e.error);
      stop();
    };

    recognitionRef.current = recognition;
  }, [lang]);

  const start = async (): Promise<void> => {
    if (!recognitionRef.current) return;

    try {
      micStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      recognitionRef.current.start();
      setTranscript("");
      setIsListening(true);

      // Start silence detection
      startSilenceDetection(micStreamRef.current);
    } catch (err) {
      console.error("Mic access error:", err);
    }
  };

  const stop = (): void => {
    if (recognitionRef.current) recognitionRef.current.stop();

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    setIsListening(false);
  };

  const startSilenceDetection = (stream: MediaStream): void => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);

    analyser.fftSize = 512;
    const data = new Uint8Array(analyser.fftSize);
    source.connect(analyser);

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;

    const checkSilence = (): void => {
      if (!analyserRef.current) return;

      analyserRef.current.getByteTimeDomainData(data);

      // Calculate average volume
      const avg =
        data.reduce((sum, val) => sum + Math.abs(val - 128), 0) / data.length;

      if (avg < 3) {
        // 💤 Quiet
        if (!silenceTimerRef.current) {
          silenceTimerRef.current = setTimeout(() => {
            console.log("TIMEOUT OCCURRED")
            stop(); // Auto stop
          }, silenceTimeout);
        }
      } else {
        // 🎙 Not silent — reset timer
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }
      }

      if (isListening) requestAnimationFrame(checkSilence);
    };

    checkSilence();
  };

  return { transcript, isListening, start, stop };
}

