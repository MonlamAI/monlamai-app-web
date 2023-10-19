import ClipboardJS from "clipboard";
import { Button } from "flowbite-react";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa6/index.js";

const CopyToClipboard = ({ textToCopy, disabled }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const clipboard = new ClipboardJS("#copyBtn", {
      text: () => textToCopy,
    });

    clipboard.on("success", (e) => {
      setIsCopied(true);
      e.clearSelection();
    });

    clipboard.on("error", () => {
      setIsCopied(false);
      console.error("Copy to clipboard failed.");
    });
  };

  return (
    <Button color="white" id="copyBtn" onClick={handleCopy} disabled={disabled}>
      {isCopied ? (
        <span className="text-gray-500">Copied!</span>
      ) : (
        <FaRegCopy color="gray" size="20px" />
      )}
    </Button>
  );
};

export default CopyToClipboard;
