import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { ICON_SIZE } from "~/helper/const";
import { ReactionButton } from "./ReactionButtons";
import { MdContentCopy } from "react-icons/md";
let timer: any;

type CopyToClipboardProps = {
  textToCopy: string;
  onClick?: () => void;
};

const CopyToClipboard = ({ textToCopy, onClick }: CopyToClipboardProps) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setIsCopied(false);
    return () => {
      if (timer) clearTimeout(timer); //cleanup timer on unmount
    };
  }, [textToCopy]);

  const handleCopy = () => {
    if (onClick) {
      onClick();
    } else {
      navigator.clipboard.writeText(textToCopy);
    }

    setIsCopied(true);
    timer = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <>
      {!isCopied ? (
        <ReactionButton
          icon={<MdContentCopy size={ICON_SIZE} />}
          onClick={handleCopy}
        />
      ) : (
        <ReactionButton
          icon={<MdContentCopy size={ICON_SIZE} />}
          onClick={handleCopy}
          className="text-green-500"
        />
      )}
    </>
  );
};

export default CopyToClipboard;
