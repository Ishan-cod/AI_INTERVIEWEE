import { parse } from "path";
import { chat_bot } from "./chat_bot";
import { json } from "stream/consumers";



export async function POST(request : Request){
    const body = await request.json();
    const human_message = body.human_message
    if(!body || ! human_message)
    {
        return Response.json({
            success : false,
            message : "Human Message not provided"
        },{status : 400})
    }

    const json_response = await chat_bot(human_message);
    return Response.json({
        success : true,
        message : 'Successfully accessed AI RESPONSE',
        data : json_response
    },{status : 200})

}