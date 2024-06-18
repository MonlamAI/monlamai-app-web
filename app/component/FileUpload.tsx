import axios from "axios";
import { Progress } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaFile } from "react-icons/fa6";
import { toast } from "react-toastify";
import { formatBytes } from "~/component/utils/formatSize";
import { MAX_SIZE_SUPPORT_DOC } from "~/helper/const";

function FileUpload({ setFile, setInputUrl, supported, model }) {
  const [myFiles, setMyFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  let supported_list = supported?.join(",");
  const maxSize = MAX_SIZE_SUPPORT_DOC.replace("KB", "");
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setMyFiles([...myFiles, ...acceptedFiles]);
    var file = acceptedFiles[0];
    if (!file) {
      toast.error("Wrong file format. Please upload a .txt or .docx file.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    if (file.size > parseInt(maxSize) * 1024) {
      toast.info("File size is too big.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    if (!file.name.endsWith(".txt") && !file.name.endsWith(".docx")) {
      toast.info("Unsupported file type.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        "text/html": supported,
      },
      multiple: false,
    });
  const removeAll = () => {
    setMyFiles([]);
  };
  useEffect(() => {
    if (myFiles?.length === 0) setFile([]);

    if (myFiles?.length) {
      const uploadFiles = async () => {
        if (myFiles?.length) setFile(myFiles[0]);
        await uploadFile(myFiles[0]);
      };
      uploadFiles();
    }
  }, [myFiles.length]);

  const uploadFile = async (file: File) => {
    try {
      let formData = new FormData();
      let uniqueFilename = Date.now() + "-" + file.name;
      formData.append("filename", uniqueFilename);
      formData.append("filetype", file.type);
      let bucket =
        model === "mt" ? "/MT/input" : model === "tts" ? "/TTS/input" : "";
      formData.append("bucket", bucket);

      const response = await axios.post("/api/get_presigned_url", formData);
      const { url } = response.data;
      // Use Axios to upload the file to S3
      const uploadStatus = await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      if (uploadStatus.status === 200) {
        const uploadedFilePath = uploadStatus.config.url;
        const baseUrl = uploadedFilePath?.split("?")[0]!;
        setInputUrl(baseUrl);
      }
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
    }
  };

  if (myFiles.length > 0)
    return (
      <>
        <div className="bg-gray-200 rounded-lg shadow-md flex justify-between items-center">
          <div className="flex gap-4">
            <FaFile size="20px" />
            {myFiles?.map((item) => (
              <div key={item?.name}>
                {item?.name}
                <p>{formatBytes(item?.size)}</p>
              </div>
            ))}
          </div>
          <button
            className="bg-transparent text-black p-3 rounded-full hover:bg-gray-400"
            onClick={removeAll}
          >
            X
          </button>
        </div>
        <Progress progress={uploadProgress} />
      </>
    );

  return (
    <div className="flex-1 flex cursor-pointer " {...getRootProps()}>
      <input {...getInputProps()} />
      <div
        style={{
          backgroundColor: isDragActive ? "#f5f5f5" : "transparent",
          color: "#666",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          textAlign: "center",
          height: "100%",
          width: "100%",
        }}
        className="flex-1 flex flex-col justify-center items-center rounded text-neutral-300 p-3"
      >
        <img
          className="w-[30%] "
          src="//ssl.gstatic.com/translate/drag_and_drop.png"
        />
        <p className="dark:text-neutral mt-2">
          Drag and drop your file here, Supported {supported_list}
        </p>
      </div>
    </div>
  );
}

export default FileUpload;
