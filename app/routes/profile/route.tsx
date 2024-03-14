import { LoaderFunction } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react';
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { MdDeleteForever } from 'react-icons/md';
import { deleteInference, getUserFileInferences } from '~/modal/inference.server';
import { getUser } from '~/modal/user.server';
import { auth } from '~/services/auth.server';

export const loader:LoaderFunction=async ({request})=>{

  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  let user = await getUser(userdata?._json.email);
  let inferences=await getUserFileInferences({userId:user?.id})
  return {inferences};
}
export const action:LoaderFunction=async ({request})=>{
  
  let formdata=await request.formData();
  let id=formdata.get('id') as string;
  if(request.method==='DELETE'){
    let delete_inference=await deleteInference({id})
    return delete_inference;
  }

  return null;
}

function Index() {
 const {inferences}= useLoaderData();
 
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">File Inferences</h1>
      <div className="space-y-2">
        {inferences.map((inference) => {
           return <EachInference inference={inference} key={inference.id}/>;
        })}
      </div>
    </div>
  );
}

export default Index


function EachInference({inference}:any){
 const [status,setStatus]=useState({});
  const deleteFetcher=useFetcher();
  let filename = inference.input.split('/MT/input/')[1];
  useEffect(() => {
    const fetchStatus = () => {
      fetch(`https://monlam-file-api.onrender.com/status/${filename.replaceAll('%20', '%2520')}`)
        .then(res => res.json())
        .then(data => {
          setStatus(data.status);
          if (data.status === 'complete') {
            clearInterval(statusInterval); // Clear the interval if the status is complete
          }
        })
        .catch(error => console.error('Failed to fetch status:', error));
    };

    fetchStatus();

    const statusInterval = setInterval(fetchStatus, 5000);

    return () => clearInterval(statusInterval);
  }, [filename]);
  function deleteHandler(){
  deleteFetcher.submit({id:inference.id},{
    method:'DELETE',
  })
  }
  let isComplete = status === 'complete';
  let outputURL=inference.input.replace('input', 'output').replaceAll('%20','%2520')
  
  return <div  className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
  <span className="text-gray-800 truncate">{filename}</span>
  <div className='flex gap-5 items-center'>
  {isComplete ? (
    <a href={outputURL} className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out">Download Translation</a>
    ) : (
      <span className="text-yellow-500">Translating...</span>
      )}
  <button onClick={deleteHandler} className=' hover:text-red-400'><MdDeleteForever/></button>
      </div>
</div>
}