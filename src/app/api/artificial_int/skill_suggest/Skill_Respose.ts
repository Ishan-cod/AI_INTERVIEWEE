import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Google_LLM } from "../ai_model";
import { JsonOutputParser } from "@langchain/core/output_parsers";

export default async function SkillsResponse(job_role: string) {
  try {
    const model = Google_LLM;
    const text_prompt = `You are a professional job analyst. Your task is to provide the skills required for the given job role.
  
      **JOB ROLE : {JobRole}**
  
      Rules : 
      1. Donot provide any other information or explain any thing, just skills
      2. Provide only JSON response with 'skills' containing array of skills in text format
      
      
      For Eg : 
      skills : ['Node JS','REST API']
      `;
  
    const prompt = ChatPromptTemplate.fromTemplate(text_prompt);
    const chain = prompt.pipe(model);
  
    const response = await chain.invoke({ JobRole: job_role });
  
    const parser = new JsonOutputParser();
    const parsed_content = await parser.parse(response.content.toString());
  
    return parsed_content;
  } catch (error) {
    return error;
  }
}
