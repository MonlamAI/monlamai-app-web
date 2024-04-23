const uploadFile = async (file: File) => {
  try {
    let formData = new FormData();
    let uniqueFilename = Date.now() + "-" + "audio.mp3";
    formData.append("filename", uniqueFilename);
    formData.append("filetype", file.type);
    formData.append("bucket", "/STT/input");

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
      const uploadedFilePath = uploadStatus.request.responseURL;
      const baseUrl = uploadedFilePath?.split("?")[0]!;
      setAudioURL(baseUrl!);
      console.log(`File ${file.name} uploaded successfully.`, uploadStatus);
    }
  } catch (error) {
    console.error(`Error uploading file ${file.name}:`, error);
  }
};
