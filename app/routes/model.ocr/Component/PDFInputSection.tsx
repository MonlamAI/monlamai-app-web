import { Button, Card, FileInput, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { resetFetcher } from "~/component/utils/resetFetcher";
import TooltipComponent from "./Tooltip";
import { useLoaderData } from "@remix-run/react";
import EachInference from "./EachInference";
import axios from "axios";

type props = {
  fetcher: any;
};

export default function PDFInputSection({ fetcher }: props) {
  let { translation } = uselitteraTranlation();
  const { inferenceList } = useLoaderData();
  const [uploadStatuses, setUploadStatuses] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [folderName, setFolderName] = useState("");

  const [images, setImages] = useState([]);
  const [filePaths, setFilePaths] = useState([]);

  function handleFormClear() {
    resetFetcher(fetcher);
  }

  const handleFileChange = (event) => {
    const files = event.target.files;
    const chosenFiles = Array.prototype.slice.call(files);
    setImages(chosenFiles);
    setFolderName(Date.now() + "-" + files[0]?.name?.replace(".pdf", ""));
  };
  useEffect(() => {
    if (images.length > 0) {
      const uploadFiles = async () => {
        for (const file of images) {
          await uploadFile(file, folderName);
        }
      };

      uploadFiles();
    }
  }, [images.length]);
  const uploadFile = async (file, folderName) => {
    try {
      let formData = new FormData();
      let filename = Date.now() + "-" + file.name;
      formData.append("filename", filename);
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
        const uploadedFilePath = uploadStatus.config.url;
        const baseUrl = uploadedFilePath?.split("?")[0];
        setFilePaths((prev) => {
          prev.push(baseUrl);
          return prev;
        });
        console.log(`File ${file.name} uploaded successfully.`, uploadStatus);
      }
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
    }
  };
  function handleStartJob() {
    let formData = new FormData();
    formData.append("files", JSON.stringify(filePaths));
    formData.append("filesLocation", folderName);
    fetcher.submit(formData, {
      method: "POST",
      action: "/api/ocr",
    });
  }
  const checkAllUploadsComplete = () => {
    const allDone = Object.values(uploadStatuses).every((status) => status);
    if (allDone) {
      console.log("All files have been uploaded.");
      // Perform any action after all files have been uploaded
    }
    return allDone;
  };
  let alldone = checkAllUploadsComplete() && images.length > 0;
  return (
    <div className="flex w-full gap-3">
      <Card className="md:w-1/2 relative">
        <TooltipComponent />
        <div>
          <div className="w-full min-h-[45vh] flex flex-col items-center justify-center gap-5">
            <div className="mb-5 block w-full">
              <Label
                htmlFor="file"
                value={translation.uploadImage}
                className="text-lg text-slate-700"
              />
              {images.length === 0 ? (
                <FileInput
                  helperText={`${translation.acceptedImage} PDF`}
                  id="file"
                  name="files"
                  accept=".pdf"
                  onChange={handleFileChange}
                  multiple
                />
              ) : (
                <ul>
                  {images.map((file, index) => (
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
          </div>
          <div className="flex justify-between">
            <Button
              type="reset"
              color="gray"
              onClick={handleFormClear}
              className="text-gray-500"
            >
              <div className="pt-1">{translation.reset}</div>
            </Button>
            <Button
              type="button"
              isProcessing={fetcher.state !== "idle"}
              onClick={handleStartJob}
              disabled={!alldone}
            >
              <div className="pt-1">{translation.submit}</div>
            </Button>
          </div>
        </div>
      </Card>
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

function MultipleFiles({ image }) {
  return (
    <div
      key={image.size}
      className="flex gap-2 max-w-sm rounded overflow-hidden shadow-lg"
    >
      <div className="px-6 py-4 flex-1">
        <div className=" mb-2">{image.name}</div>
      </div>
    </div>
  );
}
