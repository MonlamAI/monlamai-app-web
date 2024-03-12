import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { update_location } from "~/modal/user.server";

export const loader:LoaderFunction=async({request})=>{

}

export const action:ActionFunction=async({request})=>{
  let formdata=await request.formData();

  let _action=formdata.get('_action') as string;
  let userId=formdata.get('user_id') as string;
  let city=formdata.get('city') as string;
  let country=formdata.get('country') as string;

  if(_action==='update_location'){
   let newLocation=await update_location(userId,city,country)
   return newLocation;
  } 
  return null; 
}