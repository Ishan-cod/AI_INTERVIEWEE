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

type LoginHandler = {
  name: string;
  setName: (name: string) => void;
};

type SkillHandler = {
  skills_Array: Array<string>;
  setSkills: (skill: string) => void;
  unsetSkills: (skill: string) => void;
  clearSkills: () => void;
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

export const useLoginStore = create<LoginHandler>((set) => ({
  name: "",
  setName: (name: string) => {
    set(() => ({ name: name }));
  },
}));

export const useSkillStore = create<SkillHandler>((set) => ({
  skills_Array: [],
  setSkills: (skill: string) => {
    set((state) => ({
      skills_Array: [...state.skills_Array, skill],
    }));
  },
  unsetSkills: (skill: string) => {
    set((state) => ({
      skills_Array: state.skills_Array.filter((i) => i !== skill),
    }));
  },
  clearSkills: () => {
    set(() => ({
      skills_Array: [],
    }));
  },
}));
