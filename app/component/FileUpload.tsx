import { Button } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaFile } from "react-icons/fa6";
import { toast } from "react-toastify";
import { formatBytes } from "~/component/utils/formatSize";
import { readDocxFile, readTextFile } from "~/component/utils/readers";
import { MAX_SIZE_SUPPORT } from "~/helper/const";

function FileUpload({ sourceText, setSourceText }) {
  const [myFiles, setMyFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setMyFiles([...myFiles, ...acceptedFiles]);
    var file = acceptedFiles[0];
    if (!file) {
      return;
    }
    if (file.size > MAX_SIZE_SUPPORT * 1024) {
      toast("File size is too big.");
      return;
    }

    if (file.name.endsWith(".txt")) {
      readTextFile(file, setSourceText);
    } else if (file.name.endsWith(".docx")) {
      readDocxFile(file, setSourceText);
    } else {
      console.log("Unsupported file type.");
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
  const reset = (file) => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
    if (sourceText !== "") setSourceText("");
  };
  const removeAll = () => {
    setMyFiles([]);
    if (sourceText !== "") setSourceText("");
  };
  useEffect(() => {
    if (sourceText === "") removeAll();
  }, [sourceText]);

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
        <Button size="sm" className="" pill onClick={removeAll}>
          X
        </Button>
      </div>
    );

  return (
    <div className="min-h-full flex-1 flex cursor-pointer" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <>
          <p className="flex-1 flex flex-col justify-center items-center border-blue-400 border-2 rounded text-slate-300 p-3">
            <img
              className="w-1/2 "
              src="//ssl.gstatic.com/translate/drag_and_drop.png"
            />
            Drag 'n' drop some files here, or click to select files
          </p>
        </>
      )}
    </div>
  );
}

export default FileUpload;
