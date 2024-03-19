import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaFile } from "react-icons/fa6";
import { toast } from "react-toastify";
import { formatBytes } from "~/component/utils/formatSize";
import { MAX_SIZE_SUPPORT_DOC } from "~/helper/const";

function FileUpload({ setFile }) {
  const [myFiles, setMyFiles] = useState([]);
  const maxSize = MAX_SIZE_SUPPORT_DOC.replace("KB", "");
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setMyFiles([...myFiles, ...acceptedFiles]);
    var file = acceptedFiles[0];
    if (!file) {
      toast.error("Wrong file format. Please upload a .txt or .docx file.");
      return;
    }
    if (file.size > parseInt(maxSize) * 1024) {
      toast.info("File size is too big.");
      return;
    }

    if (!file.name.endsWith(".txt") && !file.name.endsWith(".docx"))  {
      toast.info("Unsupported file type.");
      return;
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        "text/html": [".txt", ".docx"],
      },
      multiple: false,
    });

  const removeAll = () => {
    setMyFiles([]);
  };
  useEffect(()=>{
    if(myFiles.length>0) setFile(myFiles[0]);
  },[myFiles.length])
  if (myFiles.length > 0)
    return (
      <div className="bg-gray-200 p-4 rounded-lg shadow-md flex justify-between items-center">
        <div className="flex gap-4">
          <FaFile size="20px" />
          {myFiles?.map((item) => (
            <div key={item?.name}>
              {item?.name}
              <p>{formatBytes(item?.size)}</p>
            </div>
          ))}
        </div>
        <button  className="bg-transparent text-black p-3 rounded-full hover:bg-gray-400"  onClick={removeAll}>
          X
        </button>
      </div>
    );

  return (
    <div className="min-h-full flex-1 flex cursor-pointer mb-3" {...getRootProps()}>
      <input {...getInputProps()} />
          <p style={{
            backgroundColor: isDragActive?"#f5f5f5":'transparent',
            borderColor: "#d3d3d3",
            borderWidth: "2px",
            borderStyle: "dashed",
            borderRadius: "5px",
            color: "#666",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            textAlign: "center",
            height: "100%",
            width: "100%",
          
          }} className="flex-1 flex flex-col justify-center items-center rounded text-slate-300 p-3">
            <img
              className="w-1/2 "
              src="//ssl.gstatic.com/translate/drag_and_drop.png"
            />
            Drag 'n' drop some files here, or click to select files
          </p>
    </div>
  );
}

export default FileUpload;
