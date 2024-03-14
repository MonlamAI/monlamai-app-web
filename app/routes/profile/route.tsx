import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react';
import React, { useEffect, useState } from 'react'
import { getUserFileInferences } from '~/modal/inference.server';
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


function Index() {
 const {inferences}= useLoaderData();
 const [status,setStatus]=useState({});
 useEffect(()=>{
   fetch('https://monlam-file-api.onrender.com/status').then(res=>res.json()).then(data=>
   setStatus(data));
 },[])
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">File Inferences</h1>
      <div className="space-y-2">
        {inferences.map((inference) => {
          let filename = inference.input.split('/MT/input/')[1];
          let fileStatus = status[filename];
          let isComplete = fileStatus === 'complete';

          return (
            <div key={inference.id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
              <span className="text-gray-800 truncate">{filename}</span>
              {isComplete ? (
                <a href={inference.input.replace('input', 'output')} className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out">Download Translation</a>
              ) : (
                <span className="text-yellow-500">Translating...</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Index
