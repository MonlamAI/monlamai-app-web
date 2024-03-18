import { Button, Textarea } from "flowbite-react";
import TextComponent from "../../../component/TextComponent";
import { motion } from "framer-motion";
import EditDisplay from "~/component/EditDisplay";
import FileUpload from "~/component/FileUpload";
import { MAX_SIZE_SUPPORT_AUDIO } from "~/helper/const";
import { useEffect, useState } from "react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { MdDeleteForever } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
type TextOrDocumentComponentProps = {
  selectedTool: string;
  sourceText: string;
  setSourceText: (text: string) => void;
  sourceLang: string;
  setFile: (file: any) => void;
};

type CharacterOrFileSizeComponentProps = {
  selectedTool: string;
  charCount: number;
  CHAR_LIMIT: number | undefined;
  MAX_SIZE_SUPPORT: string;
};

type EditActionButtonsProps = {
  handleCancelEdit: () => void;
  handleEditSubmit: () => void;
  editfetcher: any;
  editText: string;
  translated: any;
};

type OutputDisplayProps = {
  edit: boolean;
  editData: string;
  output: string;
  editText: string;
  setEditText: (p: string) => void;
};

export function TextOrDocumentComponent({
  selectedTool,
  sourceText,
  setSourceText,
  sourceLang,
  setFile
}: TextOrDocumentComponentProps) {
  if (selectedTool === "text") {
    return (
      <TextComponent
        sourceText={sourceText}
        setSourceText={setSourceText}
        sourceLang={sourceLang}
      />
    );
  } else if (selectedTool === "document") {
    return (
      <FileUpload
        setFile={setFile}
      />
    );
  }
  return null;
}

export function CharacterOrFileSizeComponent({
  selectedTool,
  charCount,
  CHAR_LIMIT,
  MAX_SIZE_SUPPORT,
}: CharacterOrFileSizeComponentProps) {
  if (selectedTool === "Recording") return <div />;
  if (selectedTool === "text") {
    return (
      <div className="text-gray-400 text-xs p-2">
        {charCount} / {CHAR_LIMIT}
      </div>
    );
  } else {
    return (
      <div className="text-gray-400 text-xs p-2">
        max size: {MAX_SIZE_SUPPORT}
      </div>
    );
  }
}

export function LoadingAnimation() {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function OutputDisplay({ edit, editData, output, animate, targetLang }) {
  if (edit) return null;
  let isNotEng = targetLang !== "en";
  let isNotTib = targetLang !== "bo";
  return (
    <div
      className={`p-2 text-[1.2rem] leading-[1.8] max-h-[40vh] overflow-y-auto first-letter 
      ${!isNotEng && "font-poppins text-xl"} ${
        !isNotTib && "text-lg leading-loose font-monlam"
      } ${isNotEng && isNotTib && "font-notosans"}`}
    >
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {editData ? editData : output}
      </motion.p>
    </div>
  );
}

export function EditActionButtons({
  handleCancelEdit,
  handleEditSubmit,
  editfetcher,
  editText,
  translated,
}: EditActionButtonsProps) {
  return (
    <>
      <p className="px-2 py-1 bg-[#F5F6B0] dark:bg-yellow-500 rounded-md text-sm my-2 text-black dark:text-white">
        Your contribution will be used to improve translation quality.
      </p>
      <div className="flex justify-between">
        <Button color="gray" onClick={handleCancelEdit}>
          cancel
        </Button>
        <Button
          color="blue"
          onClick={handleEditSubmit}
          isProcessing={editfetcher.state !== "idle"}
          disabled={editText === translated?.translation}
        >
          submit
        </Button>
      </div>
    </>
  );
}

export function SubmitButton({selectedTool,trigger,submitFile}){
  const { translation, locale } = uselitteraTranlation();
  const isFile=selectedTool==='document';
  return <Button
  size="xs"
  onClick={isFile?submitFile:trigger}
  className={
    locale !== "bo_TI" ? "font-poppins" : "font-monlam"
  }
>
  {translation.translate}
</Button>
}

export function InferenceList(){
  let {inferences}=useLoaderData();
  return <div className="space-y-2 max-h-[50vh] overflow-auto">
  {inferences.map((inference:any) => {
     return <EachInference inference={inference} key={inference.id}/>;
  })}
  
</div>
}

function EachInference({inference}:any){
  const [status,setStatus]=useState('');
   const deleteFetcher=useFetcher();
   let filename = inference.input.split('/MT/input/')[1].split('-%40-')[0];
   let updatedAt=new Date(inference.updatedAt).toLocaleString();
   useEffect(() => {
    if(!inference?.output || inference?.output===''){
     const fetchStatus = () => {
       let jobId=inference.jobId;
       fetch(`https://monlam-file-api.onrender.com/status/${jobId}`)
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
    }
    
   }, [filename]);
   function deleteHandler(){
   deleteFetcher.submit({id:inference.id},{
     method:'DELETE',
     action:"/testupload"
   })
   }
   let isComplete = status === 'complete';
   let outputURL=inference.input.replace('input', 'output').replaceAll('%20','%2520')
   
   return <div  className="bg-white rounded-lg  flex  justify-between items-center">
   <div>
   <span className="text-gray-800 truncate">{filename}</span>
   <span className="text-gray-500 text-xs block">{updatedAt}</span>
   </div>
   <div className='flex gap-5 items-center'>
   {isComplete ? (
     <a href={outputURL} className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"><FaDownload/></a>
     ) : (
       <div className="text-yellow-500">
         <span>{status}</span><div role="status">
       <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
       </svg>
       <span className="sr-only">Loading...</span>
   </div></div>
       )}
   <button onClick={deleteHandler} className=' hover:text-red-400'><MdDeleteForever/></button>
       </div>
 </div>
 }