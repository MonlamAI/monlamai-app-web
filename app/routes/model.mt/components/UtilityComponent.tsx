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
      
   </div></div>
       )}
   <button onClick={deleteHandler} className=' hover:text-red-400'><MdDeleteForever/></button>
       </div>
 </div>
 }