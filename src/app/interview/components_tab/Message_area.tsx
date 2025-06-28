import React, { useState } from "react";
import AI_Message from "./CHAT/AI_message";
import Human_message from "./CHAT/Human_message";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Message_Container } from "./Message_container";
import { Scrollable_MSG_AREA } from "./Scrollable_message_area";
import axios from "axios";
import { BaseMessage } from "@langchain/core/messages";

interface msg_arr {
  sender: "ai" | "human";
  content: string;
}
export default function Message_BOX() {
  const [input_msg, set_input_msg] = useState<string>("");
  const [is_loading, set_is_loading] = useState<Boolean>(false);
  const [msg_arr, set_msg_arr] = useState<Array<msg_arr>>([]);
  const [chat_history, set_chat_history] = useState<BaseMessage[]>([]);

  const handle_send_button = async () => {
    const human_msg_obj: msg_arr = {
      sender: "human",
      content: input_msg,
    };
    set_msg_arr((prev_arr) => [...prev_arr, human_msg_obj]);
    const human_msg = input_msg;
    set_input_msg("");
    set_is_loading(true);
    const response = await axios.post("/api/artificial_int/interviewee", {
      human_message: human_msg,
      chat_history: chat_history,
    });

    if (response.status == 200) {
      set_chat_history(response.data.chat_history);
      const ai_msg = response.data.response.data;
      const ai_obj: msg_arr = {
        sender: "ai",
        content: ai_msg,
      };
      set_msg_arr((prev_arr) => [...prev_arr, ai_obj]);
      set_is_loading(false);
    } else {
      const ai_obj: msg_arr = {
        sender: "ai",
        content: "Failed to call LLM",
      };
      set_is_loading(false);
    }
  };

  return (
    <Message_Container>
      {/* Messages container with proper scrolling */}
      <Scrollable_MSG_AREA>
        {msg_arr.map((msg_obj) =>
          msg_obj.sender == "ai" ? (
            <AI_Message message={msg_obj.content} />
          ) : (
            <Human_message message={msg_obj.content} />
          )
        )}
      </Scrollable_MSG_AREA>

      <Separator className="bg-white/15 flex-shrink-0" />

      {/* Input container - fixed height */}
      <div className="flex-shrink-0 pt-2">
        <div className="text-amber-50 flex">
          {!is_loading ? (
            <Input
              placeholder="Your Response here..."
              className="border-0 bg-[#212121]"
              value={input_msg}
              onChange={(e) => {
                set_input_msg(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handle_send_button();
                }
              }}
            />
          ) : (
            <Input
              placeholder="Interviewer is cooking response"
              className="border-0 bg-[#212121]"
              value={input_msg}
              disabled
            />
          )}
          {!is_loading ? (
            <Button
              className="ml-2 hover:bg-[#212121]"
              onClick={handle_send_button}
            >
              <Send />
            </Button>
          ) : (
            <Button className="ml-2 hover:bg-[#212121]" disabled>
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid"></span>
            </Button>
          )}
        </div>
      </div>
    </Message_Container>
  );
}
