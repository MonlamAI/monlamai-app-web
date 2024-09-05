import axios from "axios";
import { FileInput, Label, Progress } from "flowbite-react";
import { useEffect, useState } from "react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { fileSupported } from "~/component/utils/fileSizeFormat";
import { formatBytes } from "~/component/utils/formatSize";

function FileUpload({
  file,
  setFile,
  setInputUrl,
  inputUrl,
  supported,
  setFilename,
}: any) {
  const handleFileChange = (event) => {
    let file = event.target.files[0];
    if (!fileSupported(file, supported)) return alert("Unsupported file type");
    setFile(file);
  };
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  let { translation } = uselitteraTranlation();

  useEffect(() => {
    if (file) {
      const uploadFiles = async () => {
        await uploadFile(file);
      };
      uploadFiles();
    }
  }, [file]);

  const uploadFile = async (file: File) => {
    try {
      let formData = new FormData();
      let uniqueFilename = Date.now() + "-" + file.name;
      formData.append("filename", uniqueFilename);
      formData.append("filetype", file.type);
      formData.append("bucket", "/OCR/input");

      setFilename(uniqueFilename);
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
  let uploaded = uploadProgress === 100;
  return (
    <>
      {!file ? (
        <div className=" mb-5 block">
          <Label
            htmlFor="file"
            value={translation.uploadImage}
            className="text-lg text-slate-700 "
          />
          <FileInput
            helperText={`${translation.acceptedImage?.replace(
              "Image",
              "file"
            )} ${supported?.join(",")?.replaceAll(".", "")?.toUpperCase()}`}
            id="file"
            name="files"
            accept={supported?.join(",")}
            onChange={handleFileChange}
            key={inputUrl}
          />
        </div>
      ) : (
        <div className="w-full mb-5 block">
          <div className="p-2 flex flex-col justify-between">
            <div className="w-full flex justify-between">
              <div>{file.name}</div>
              <div>{uploaded && formatBytes(file.size)}</div>
            </div>
            <Progress progress={uploadProgress} />
          </div>
        </div>
      )}
    </>
  );
}

export default FileUpload;
