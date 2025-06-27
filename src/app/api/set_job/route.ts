import dbConnect from "@/utils/db_connect";
import { job_interface } from "@/models/job.model";

export async function POST(request : Request){
    await dbConnect();

    
}