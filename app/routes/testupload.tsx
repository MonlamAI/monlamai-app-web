import { ActionFunctionArgs, LoaderFunction, UploadHandler, json, redirect, unstable_composeUploadHandlers, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from '@remix-run/node'
import { useFetcher } from '@remix-run/react';
import { Button } from 'flowbite-react';
import { useState } from 'react';
import { addFileInference } from '~/modal/inference.server';
import { getUser } from '~/modal/user.server';
import { auth } from '~/services/auth.server';
import { uploadFile } from '~/services/uploadFile.server';
export const loader:LoaderFunction=async ({request})=>{
let data;
  return null;
}


export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const uploadHandler: UploadHandler = unstable_composeUploadHandlers(
    uploadFile,
    unstable_createMemoryUploadHandler(),
  );
  
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  let user = await getUser(userdata?._json.email);
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const inputFileUrl = formData.get("file") as string;
  var formdata = new FormData();
  const filename=inputFileUrl.split('/MT/input/')[1];
  formdata.append('link',inputFileUrl);
  let res=await fetch('https://monlam-file-api.onrender.com/aws', {
      method: 'POST',
      body: formdata
    });
  let data=await res.json();
   
  let inference_new=await addFileInference({
    userId:user.id,
    input:inputFileUrl,
    type:'file',
    model:'mt',
    jobId:data?.id
  });
  
  return redirect('/profile');
};


function FileUploadFeature() {
  const fileFetcher=useFetcher();
  const inputUrl=fileFetcher.data;
  
  return (
    <div className='flex   flex-col gap-3 justify-center items-center'>
    <h1 className='mt-[10vh]'>this is for testing purpose only</h1>
    
      <fileFetcher.Form className='flex shadow-lg flex-col gap-4 p-2 hover:ring-1 hover:ring-blue-400' method="post" encType="multipart/form-data">
        <input id="txt" type="file" name="file" accept='.txt' />
        <Button type="submit" disabled={!!inputUrl}>Upload to S3</Button>
      </fileFetcher.Form>
      
      </div>
  );
}

export default FileUploadFeature
