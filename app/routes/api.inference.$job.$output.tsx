import { LoaderFunction } from "@remix-run/node";
import { db } from "~/services/db.server";

export const loader:LoaderFunction=async({request,params})=>{
    const jobId=params.job;
    const jobSource=params.output;
    const inferenceSelected=await db.inference.findFirst({where:{jobId:jobId}})
    if(inferenceSelected){
        const updatedJob=await db.inference.update({
            where:{
                id:inferenceSelected?.id,
                type:'file',
            },
            data:{
                output:jobSource
            }
        });
        return updatedJob;  
    }
    return {job:jobId,error:'job not found'}
}