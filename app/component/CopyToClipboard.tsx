import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { LuCopyCheck } from "react-icons/lu";
import { LuCopy } from "react-icons/lu";
import { ICON_SIZE } from "~/helper/const";
import { ReactionButton } from "./ReactionButtons";

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
          enabled={true}
          disabled={false}
          icon={<LuCopy size={ICON_SIZE} />}
          onClick={handleCopy}
          id="copyBtn"
        />
      ) : (
        <ReactionButton
          enabled={true}
          disabled={false}
          icon={<LuCopyCheck color="green" size={ICON_SIZE} />}
            onClick={handleCopy}
            id="copiedIcon"
        />
      )}
    </>
  );
};

export default CopyToClipboard;
