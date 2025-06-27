import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Google_LLM } from "../ai_model";
import { JsonOutputParser } from "@langchain/core/output_parsers";

async function pdf_analysis(raw_pdf_text: string): Promise<any> {
  try {
    const model = Google_LLM;

    const prompt = ChatPromptTemplate.fromTemplate(
      `You are a intelligent text-data extractor, You are given a messy text, Your task is :
    1. Identify the technical skillset the user have
    2. Identify the name of the projects the user made
    3. Store these information in the form of a array and return a JSON response
  
    Raw data on which operations should be applied is :
    messy_data : {messy_data}
  
    For Example :
  JSON 
  [
      "skills": ["React", "Node.js"],
      "projects": ["AI Interviewee", "Weather app"]
  ]
          
  Rules : 
  1.Do not return any other data
  2. If the data donot have any skill or projects return empty array for that field
  `
    );

    const chain = prompt.pipe(model);
    const response = await chain.invoke({ messy_data: raw_pdf_text });

    const JSON_parser = new JsonOutputParser();
    const JSON_parsed_response = await JSON_parser.parse(
      response.content.toString()
    );

    return JSON_parsed_response[0];
  } catch (error) {
    throw new Error("Error in resume extraction");
  }
}


export {pdf_analysis}
