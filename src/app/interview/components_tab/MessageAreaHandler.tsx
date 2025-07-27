import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import AI_Message from "./CHAT/AI_message";
import Human_message from "./CHAT/Human_message";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Message_Container } from "./MessageBoxContainer";
import { Scrollable_MSG_AREA } from "./ScrollableMessageArea";
import axios, { AxiosError } from "axios";
import { BaseMessage, SystemMessage } from "@langchain/core/messages";

import { speak } from "../../../utils/speak_text";
import {
  useAIResponseStore,
  useInterviewRole,
  useTranscriptStore,
} from "@/app/store/useStore_Zustand";

// Interface defination
interface Message {
  sender: "ai" | "human";
  content: string;
  timestamp?: number;
  id?: string;
}
interface ApiResponse {
  response: { data: string };
  chat_history: BaseMessage[];
}

// Custom hook for managing speech state
const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = useCallback((text: string, onComplete?: () => void) => {
    setIsSpeaking(true);
    speak(text, () => {
      setIsSpeaking(false);
      onComplete?.();
    });
  }, []);

  return { isSpeaking, speakText };
};

// Custom hook for API calls
const useApiCall = () => {
  const [isLoading, setIsLoading] = useState(false);

  const makeApiCall = useCallback(
    async (
      humanMessage: string,
      chatHistory: BaseMessage[]
    ): Promise<ApiResponse> => {
      setIsLoading(true);
      try {
        const response = await axios.post<ApiResponse>(
          "/api/artificial_int/interviewee",
          {
            human_message: humanMessage,
            chat_history: chatHistory,
          }
        );

        if (response.status !== 200) {
          throw new Error(`API call failed with status: ${response.status}`);
        }

        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(
          "API call failed:",
          axiosError.response?.data || axiosError.message
        );
        throw new Error("Failed to communicate with the AI service");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { isLoading, makeApiCall };
};

export default function Message_BOX() {
  const { user, job_role } = useInterviewRole();
  const { updateTranscript } = useTranscriptStore();
  const interviewee = user;
  const jobRole = job_role;

  const [inputMsg, setInputMsg] = useState<string>("");

  // Logo change State (Zustand)
  const toggle_ai_responding = useAIResponseStore(
    (state) => state.toggleisAiResponding
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<BaseMessage[]>(() => [
    new SystemMessage(
      "When the Human tells their name and job role, greet them and ask for self intro politely, then begin the interview."
    ),
  ]);

  const { isSpeaking, speakText } = useSpeech();
  const { isLoading, makeApiCall } = useApiCall();
  const hasInitialized = useRef(false);

  // DEBUG::
  // useEffect(() => {
  //   console.log(transcript);
  // }, [transcript]);

  // Memoized computed values
  const isInputDisabled = useMemo(() => {
    toggle_ai_responding(isLoading || isSpeaking);
    return isLoading || isSpeaking;
  }, [isLoading, isSpeaking]);

  const placeholderText = useMemo(() => {
    if (isSpeaking) return "🎤 Interviewer is speaking...";
    if (isLoading) return "⏳ Thinking...";
    return "Your response here...";
  }, [isSpeaking, isLoading]);

  // Generate unique message ID
  const generateMessageId = useCallback(() => {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Add message to the conversation
  const addMessage = useCallback(
    (sender: "ai" | "human", content: string) => {
      const newMessage: Message = {
        sender,
        content,
        timestamp: Date.now(),
        id: generateMessageId(),
      };
      setMessages((prev) => [...prev, newMessage]);
      updateTranscript(sender, content);
      return newMessage;
    },
    [generateMessageId]
  );

  // Handle AI response
  const handleAiResponse = useCallback(
    async (humanMessage: string, onComplete?: () => void) => {
      try {
        const apiResponse = await makeApiCall(humanMessage, chatHistory);

        setChatHistory(apiResponse.chat_history);
        const aiMessage = addMessage("ai", apiResponse.response.data);

        speakText(aiMessage.content, onComplete);
      } catch (error) {
        console.error("Error handling AI response:", error);
        const errorMessage = addMessage(
          "ai",
          "⚠️ Failed to get response from AI. Please try again."
        );
        speakText(errorMessage.content, onComplete);
      }
    },
    [makeApiCall, chatHistory, addMessage, speakText]
  );

  // Initial system call
  const initializeChat = useCallback(async () => {
    if (!jobRole || !interviewee || hasInitialized.current) return;

    hasInitialized.current = true;
    const initialMessage = `My name is: ${interviewee}, Job Role: ${jobRole}`;
    await handleAiResponse(initialMessage);
  }, [jobRole, interviewee, handleAiResponse]);

  // Handle send button click
  const handleSendMessage = useCallback(async () => {
    const trimmedInput = inputMsg.trim();
    if (!trimmedInput || isInputDisabled) return;

    addMessage("human", trimmedInput);
    setInputMsg("");

    await handleAiResponse(trimmedInput);
  }, [inputMsg, isInputDisabled, addMessage, handleAiResponse]);

  // Handle Enter key press
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !isInputDisabled) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [isInputDisabled, handleSendMessage]
  );

  // Initialize chat on component mount (i.e page first load)
  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  // Validation for required parameters
  if (!jobRole || !interviewee) {
    return (
      <Message_Container>
        <div className="flex items-center justify-center h-full text-amber-50">
          <p>
            Missing required parameters: role and user must be provided in URL
          </p>
        </div>
      </Message_Container>
    );
  }

  return (
    <Message_Container>
      <Scrollable_MSG_AREA>
        {/* LOADING MSG CONTAINER */}
        {messages.map((message) =>
          message.sender === "ai" ? (
            <AI_Message key={message.id} message={message.content} />
          ) : (
            <Human_message key={message.id} message={message.content} />
          )
        )}
        {/* LOAD */}
      </Scrollable_MSG_AREA>

      <Separator className="bg-white/15 flex-shrink-0" />

      <div className="flex-shrink-0 pt-2">
        <div className="text-amber-50 flex">
          {/* MSG PLACEHOLDER */}
          <Input
            placeholder={placeholderText}
            className="border-0 bg-[#212121]"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isInputDisabled}
            aria-label="Type your message"
          />

          {/* SEND MSG BUTTON */}
          <Button
            className="ml-2 hover:bg-[#212121]"
            onClick={handleSendMessage}
            disabled={isInputDisabled}
            aria-label="Send message"
          >
            {isLoading || isSpeaking ? (
              <div
                className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid"
                aria-label="Loading"
              />
            ) : (
              <Send />
            )}
          </Button>
          {/* SEND MSG BUTTON */}
        </div>
      </div>
    </Message_Container>
  );
}
