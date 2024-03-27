import { Button, Card, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import TooltipComponent from "./Tooltip";
import { useFetcher, useLoaderData } from "@remix-run/react";
import axios from "axios";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import EachInference from "./EachInference";
function FolderInputSection() {
  let fetcher = useFetcher();
  const { inferenceList } = useLoaderData();

  const [files, setFiles] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [uploadStatuses, setUploadStatuses] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  let isActionSubmission = fetcher.state !== "idle";
  let errorMessage = fetcher.data?.error;
  let { translation } = uselitteraTranlation();

  const handleFolderChange = (event) => {
    const allFiles = Array.from(event.target.files);
    const imageFiles = allFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    const initialStatuses = imageFiles.reduce((acc, file) => {
      acc[file.name] = false; // false indicates not uploaded
      return acc;
    }, {});
    setUploadStatuses(initialStatuses);
    // Filter out non-image files based on their MIME type

    if (imageFiles.length > 0) {
      const relativePath = imageFiles[0].webkitRelativePath;
      const folder = relativePath.substring(0, relativePath.indexOf("/"));
      let unique = Date.now();
      setFolderName(unique + "-" + folder);
    }
    setFiles(imageFiles);
  };
  useEffect(() => {
    if (files.length > 0) {
      const uploadFiles = async () => {
        for (const file of files) {
          await uploadFile(file);
        }
      };
      uploadFiles();
    }
  }, [files.length]);
  const checkAllUploadsComplete = () => {
    const allDone = Object.values(uploadStatuses).every((status) => status);
    if (allDone) {
      console.log("All files have been uploaded.");
      // Perform any action after all files have been uploaded
    }
    return allDone;
  };
  const uploadFile = async (file) => {
    try {
      let formData = new FormData();
      formData.append("filename", file.name);
      formData.append("filetype", file.type);
      formData.append("folder", folderName);
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
          setUploadProgress((prevProgress) => ({
            ...prevProgress,
            [file.name]: percentCompleted,
          }));
          setUploadStatuses((prevStatuses) => ({
            ...prevStatuses,
            [file.name]: true,
          }));
        },
      });

      if (uploadStatus.status === 200) {
        console.log(`File ${file.name} uploaded successfully.`, uploadStatus);
      }
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
    }
  };
  let alldone = checkAllUploadsComplete() && files.length > 0;

  React.useEffect(() => {
    checkAllUploadsComplete();
  }, [uploadStatuses]);
  function handleStartJob() {
    fetcher.submit(
      { foldername: folderName },
      {
        method: "POST",
        action: "/api/ocr",
      }
    );
  }
  return (
    <div className="flex w-full gap-3">
      <div className="md:w-1/2 relative flex flex-col justify-stretch">
        <TooltipComponent />
        <div className="flex-1">
          {files.length === 0 ? (
            <input
              type="file"
              directory=""
              webkitdirectory=""
              onChange={handleFolderChange}
            />
          ) : (
            <ul>
              {folderName && <h2>Folder: {folderName}</h2>}
              {files.map((file, index) => (
                <li key={index} className="p-2 flex justify-between">
                  <span>{file.name}</span>
                  <span>
                    {uploadProgress[file.name]
                      ? uploadProgress[file.name] + "%"
                      : ""}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button
          type="submit"
          isProcessing={fetcher.state !== "idle"}
          disabled={!alldone}
          onClick={handleStartJob}
        >
          <div className="pt-1">{translation.submit}</div>
        </Button>
      </div>
      <Card className="md:w-1/2">
        <div className="w-full h-[50vh] p-3 text-black bg-slate-50 rounded-lg overflow-auto">
          {inferenceList.map((inference) => {
            return <EachInference inference={inference} key={inference.id} />;
          })}
        </div>
      </Card>
    </div>
  );
}

export default FolderInputSection;
