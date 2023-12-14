import { Button } from "flowbite-react";
import { FaCloudDownloadAlt } from "react-icons/fa";

type DownloadTxtProps = {
  content: string;
};

export function DownloadTxt({ content }: DownloadTxtProps) {
  const downloadTxtFile = () => {
    // Join the array of strings into a single string with new lines
    // Create a Blob from the content
    const blob = new Blob([content], { type: "text/plain" });
    // Create a URL for the Blob
    const fileUrl = URL.createObjectURL(blob);
    // Create a temporary anchor element and trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = "download.txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Free up the Blob URL memory
    URL.revokeObjectURL(fileUrl);
  };
  let disabled = !content || content === "";
  return (
    <Button
      color="white"
      onClick={downloadTxtFile}
      disabled={disabled}
      title="download"
      className="hover:text-sky-300"
    >
      <FaCloudDownloadAlt color="gray" size="20px" />
    </Button>
  );
}
