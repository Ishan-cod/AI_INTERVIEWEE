import { BaseMessage, HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import {
  mapChatMessagesToStoredMessages,
  mapStoredMessagesToChatMessages,
} from "@langchain/core/messages";

interface formatmsgArray {
  role: "ai" | "human";
  message: string;
}
export function BaseToFormatted(basemsgArray: Array<any>) {
  if (basemsgArray.length == 0) {
    return null;
  }

  // console.log(typeof basemsgArray);

  // Manual conversion to handle SystemMessage types properly
  const deserialized: Array<BaseMessage> = basemsgArray.map((msg) => {
    const messageType = msg.type || msg.data?.type || 'human';
    const content = msg.data?.content || msg.content || '';
    
    switch (messageType.toLowerCase()) {
      case 'system':
        return new SystemMessage(content);
      case 'ai':
      case 'assistant':
        return new AIMessage(content);
      case 'human':
      case 'user':
      default:
        return new HumanMessage(content);
    }
  });

  const filteredmsg: Array<BaseMessage> = deserialized.filter(
    (msg) => msg.getType() !== "system"
  );

  const formatedmsgArray: Array<formatmsgArray> = filteredmsg.map((msg) => ({
    role: msg.getType() as "ai" | "human",
    message: msg.content.toString(),
  }));

  if (!formatedmsgArray || !filteredmsg || formatedmsgArray.length == 0) {
    return null;
  }

  return formatedmsgArray;
}
