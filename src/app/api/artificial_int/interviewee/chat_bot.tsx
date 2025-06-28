import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { Google_LLM, Groq_LLM } from "../ai_model";
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";

// const chat_history: BaseMessage[] = [];

async function chat_bot(human_message: string, chat_history: BaseMessage[]) {
  const model = Groq_LLM;

  const context_prompt: string = `1. You are a friendly, helpful and jovial interviewer. Ask the user questions based on the role they provide.

    2.Accept the user's responses and assist them wherever necessary, but do not provide direct solutions. Instead, simplify or elaborate on the questions to guide them.

    3. Stay focused on your role as an interviewer at all times. If the user asks any unrelated or off-topic questions, politely refuse to answer.

    4. You may ask follow-up questions based on the user's previous responses

    5. Begin the interview by asking 3 questions to assess whether the user is fit for the given role.
    
    6. Include 2 easy coding questions as part of the interview.

    7. Use the provided chat history to maintain context across the conversation.
    
    8. Try to simulate a real interview environment.

    RULES : 
    1. ASK QUESTIONS ONE BY ONE.
    2. LET USER ANSWER THE QUESTIONS ASKED, THEN YOU CAN ASK FOLLOW UP QUESTIONS OR NEW QUESTION.

    `;

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", context_prompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);

  const chain = prompt.pipe(model);

  try {
    const response = await chain.invoke({
      input: human_message,
      chat_history: chat_history,
    });

    console.log(response.content);
    const JSON_response = {
      data: response.content,
    };

    chat_history.push(new HumanMessage(human_message));
    chat_history.push(new AIMessage(response.content.toString()));

    console.log("This is chat_history : ", chat_history);

    return JSON_response;
  } catch (error) {
    console.log("Error handling Chat_BOT", error);
    process.exit(1);
  }
}

export { chat_bot };
