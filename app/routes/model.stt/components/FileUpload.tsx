import { Button } from "flowbite-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaFile } from "react-icons/fa";
import { toast } from "react-toastify";
import { formatBytes } from "~/component/utils/formatSize";
import { MAX_SIZE_SUPPORT_AUDIO } from "~/helper/const";

export function HandleAudioFile({ handleFileChange, reset }) {
  const [myFiles, setMyFiles] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    var file = acceptedFiles[0];
    if (!file) {
      toast.error("Wrong file format. Please select .mp3 or .wav file.");
      return;
    }

    if (file.size > MAX_SIZE_SUPPORT_AUDIO * 1024 * 1024) {
      toast.info("File size is too big.");
      return;
    }

    handleFileChange(file);
    setMyFiles(file);
  }, []);
  const removeFile = () => {
    setMyFiles(null);
    reset();
  };

  let { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp3", ".wav"],
    },
    multiple: false,
    noClick: true,
  });
  if (myFiles)
    return (
      <div className="flex flex-1 w-full items-center">
        <div className="bg-gray-200 py-2 w-full h-16 p-5 rounded-lg shadow-md inline-flex justify-between items-center">
          <div className="flex items-center gap-4">
            <FaFile size="20px" />
            <div className="flex flex-col">
              {myFiles?.name.slice(0, 20) + "..."}
              <p>{formatBytes(myFiles?.size)}</p>
            </div>
          </div>
          <Button size="sm" className="" pill onClick={removeFile}>
            X
          </Button>
        </div>
      </div>
    );
  return (
    <>
      <form className=" flex-1 flex cursor-pointer" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <p>Drop the files here ...</p>
          </>
        ) : (
          <div className="flex flex-1 flex-col gap-2 hover:border-dotted hover:border-2 hover:border-gray-300">
            <p className=" flex flex-col justify-center items-center  rounded text-slate-300 p-3">
              <img
                className="h-32 "
                src="//ssl.gstatic.com/translate/drag_and_drop.png"
              />
              click to select .mp3 or .wav files
            </p>
            <Button
              onClick={open}
              color="gray"
              className="block max-w-xs text-center m-auto"
            >
              open file browser
            </Button>
          </div>
        )}
      </form>
    </>
  );
}
