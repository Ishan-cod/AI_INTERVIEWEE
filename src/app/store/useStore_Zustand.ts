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

type LangEditor = {
  language: "javascript" | "java" | "cpp" | "python";
  set_language: (lang: "javascript" | "java" | "cpp" | "python") => void;
};

type InterviewRole = {
  user: string;
  setUser: (userName: string) => void;
  job_role: string;
  setJobRole: (jobRole: string) => void;
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

export const useChangeLanguage = create<LangEditor>((set) => ({
  language: "javascript",
  set_language: (lang: "javascript" | "java" | "cpp" | "python") => {
    set(() => ({ language: lang }));
  },
}));

export const useInterviewRole = create<InterviewRole>((set) => ({
  user: "",
  setUser: (username: string) => {
    set(() => ({ user: username }));
  },
  job_role: "",
  setJobRole: (jobRole: string) => {
    set(() => ({ job_role: jobRole }));
  },
}));
