import { create } from "zustand";

type VideoStore = {
  isVideo: boolean;
  toggleVideo: () => void;
};

type AIResponseStore = {
  isAiResponding: boolean;
  toggleisAiResponding: (value: boolean) => void;
};

type SpeechToTextStore = {
  transcript: string;
  set_transcript: (value: string) => void;
};

export const useVideoStore = create<VideoStore>((set) => ({
  isVideo: false,
  toggleVideo: () => {
    set((state) => ({ isVideo: !state.isVideo }));
  },
}));

export const useAIResponseStore = create<AIResponseStore>((set) => ({
  isAiResponding: false,
  toggleisAiResponding: (value: boolean) => {
    set(() => ({ isAiResponding: value }));
  },
}));

export const useTranscription = create<SpeechToTextStore>((set) => ({
  transcript: "",
  set_transcript: (value: string) => {
    set(() => ({ transcript: value }));
  },
}));
