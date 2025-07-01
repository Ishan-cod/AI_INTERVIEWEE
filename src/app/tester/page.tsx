"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Static_ChatBot from "../interview/components_tab/Static_chat_robo";

export default function Page() {
  const speak = (text: string) => {
    if (!window.speechSynthesis) {
      console.warn("Speech synthesis not supported in this browser.");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    utterance.lang = "en-IN";

    const loadAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();

      // Try to get a realistic human-like voice
      const preferredVoices = [
        "Google UK English Female",
        "Google US English",
        "Microsoft Jenny Online (Natural) - English (United States)",
        "Microsoft Aria Online (Natural) - English (United States)",
        "Alex", // macOS
      ];

      const bestVoice =
        voices.find((v) => preferredVoices.includes(v.name)) ||
        voices.find((v) => v.lang.startsWith("en"));

      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      window.speechSynthesis.speak(utterance);
    };

    // Sometimes voices are not immediately loaded
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = loadAndSpeak;
    } else {
      loadAndSpeak();
    }
  };
  const handle_click = () => {
    speak(
      `Hi there! Before we begin, thank you for applying to the frontend developer position at ABC Corp. I hope you're feeling confident today.

Let's start with something simple to warm up. Could you walk me through your understanding of how the Virtual DOM works in React, and why it's beneficial compared to manipulating the actual DOM directly?

Take your time with the response — I’m interested in your thought process.

Also, once you’ve answered that, I’d love to hear about a time you improved performance in a React application. For example, did you use memoization, lazy loading, or perhaps implemented code splitting with React.lazy or dynamic imports?

Remember, there are no perfect answers — I'm just trying to understand how you approach problems, structure your code, and think critically about user experience and performance.

Ready when you are!`
    );
  };
  return (
    <div>
      <Button onClick={handle_click}>SPEECH TESTER</Button>
      <div>
        <Static_ChatBot />
      </div>
    </div>
  );
}
