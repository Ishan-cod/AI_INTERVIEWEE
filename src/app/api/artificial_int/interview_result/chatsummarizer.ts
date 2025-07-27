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
    ChatPromptTemplate.fromTemplate(`You're an expert tech interviewer. Assess the human's technical skills from this AI-human interview transcript.

**Key Guidelines:**
- Score what was demonstrated, not what's missing
- Give partial credit for incomplete but reasonable attempts
- Consider effort and reasoning process even in wrong answers
- Differentiate "doesn't know" from "knows but explains poorly"

**Scoring:** 8-10 (strong), 5-7 (adequate), 2-4 (weak but some understanding), 0-1 (no understanding shown)

Return **only valid JSON**:

Here is the transcript:
{transcript}

{{
  "overall_score": 0–100,
  "hireable": true|false,
  "question_feedback": [
    {{
      "question": "<AI's question>",
      "feedback": "<what they demonstrated + key gap>",
      "topic": "<technical area>",
      "score": 0–10
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
  ],
  "concluding_statement": "<hire/no-hire with brief reasoning>"
    }}
  
  NOTE : PLEASE DONOT LEAVE ANY FIELD BLANK IF USER HAS NO STRENGTH STILL WRITE SOMETHING`);

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
