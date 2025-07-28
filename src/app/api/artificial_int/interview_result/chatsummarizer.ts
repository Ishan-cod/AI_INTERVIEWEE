import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Google_LLM_02 } from "../ai_model";
import { JsonOutputParser } from "@langchain/core/output_parsers";

export async function InterviewResultGeneration(
  transcript: Array<{ sender: "ai" | "human"; content: string }>
) {
  const model = Google_LLM_02;

  if (!transcript) {
    return null;
  }

  const prompt =
    ChatPromptTemplate.fromTemplate(`You are a expert transcript analyser, your task is to analyse the transcript provided and provide the mentioned results.

Transcript: {transcript}

RULES:
1. DONOT PROVIDE ANY OTHER INFORMATION APART FROM MENTIONED ONES.
2. BE SIMPLE WITH WORDS AND BE LENIENT
3. TRY TO PROVIDE CRISP AND SHORT REVIEWS
4. GIVE RESPONSE ONLY IN JSON FORMAT AS SHOWN
5. TRY TO EXTRACT ALL THE QUESTIONS ASKED AND SEPERATE THEM THEN GIVE RESPONSE.


RESULT FORMAT:
{{
  "overall_score": 0-100,
  "hireable": true|false,
  "question_feedback": [
    {{
      "question": "<AI's question>",
      "feedback": "<what they demonstrated + key gap>",
      "topic": "<technical area>",
      "score": 0-10
    }}
  ],
  "strengths": [
    {{ "topic": "<strength>", "detail": "<brief example>" }}
     ...
  ],
  "action_items": [
    "<specific study recommendation>",
    "<practice suggestion>",
    "<skill to develop>"
    ...
  ],
  "concluding_statement": "brief conclusion of interview>"
}}`);

  try {
    const chain = prompt.pipe(model);

    const response = await chain.invoke({ transcript: transcript });

    if (!response) return null;

    const parser = new JsonOutputParser();
    const parsed_content = await parser.parse(response.content.toString());
    return parsed_content;
  } catch (error) {
    return null;
  }
}
