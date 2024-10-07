import { Spinner } from "flowbite-react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import React,{useState} from "react";
import { ICON_SIZE } from "~/helper/const";
import { FaPencil } from "react-icons/fa6";
interface ReactionButtonsProps {
  fetcher: any;
  output: string | null;
  sourceText: string | null;
  inferenceId: string;
  clickEdit: () => void | undefined;
 inferenceType:"translation"|"ocr"|"tts"|"stt"
}


function ReactionButtons({
  fetcher,
  output,
  sourceText,
  inferenceId,
  clickEdit,
  inferenceType
}: ReactionButtonsProps) {
  if (!inferenceId) return null;
  const { data } = fetcher;
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const isLoading =
    fetcher.state !== 'idle' && fetcher.formData?.get("action");
  const handleReaction = async (action: "like" | "dislike") => {
    if(action==='like'){
    setLiked(!liked)
    setDisliked(false)
    }
    if(action==='dislike'){
      setDisliked(!disliked)
      setLiked(false)
    }
    if (!output || !sourceText) return;
    fetcher.submit(
      { inferenceId, action, inferenceType },
      { method: "POST", action: "/api/feedback" }
    );
  };
  

  return (
    <>
      {clickEdit !== undefined && (
        <ReactionButton
          icon={<FaPencil size={ICON_SIZE} />}
          onClick={clickEdit}
          className=""
        />
      )}
      <ReactionButton
        icon={<FaRegThumbsUp size={ICON_SIZE} />}
        onClick={() => handleReaction("like")}
        className={`hover:text-green-400 ${liked && "text-green-400"}`}
      />
      <ReactionButton
        icon={<FaRegThumbsDown size={ICON_SIZE} />}
        onClick={() => handleReaction("dislike")}
        className={`hover:text-red-400 ${disliked && "text-red-400"}`}
      />
    </>
  );
}

type ReactionButtonProps = {
  icon: React.ReactElement;
  onClick: () => void;
  className?: string;
};

export function ReactionButton({
  icon,
  onClick,
  className,
}: ReactionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
        "focus:outline-none cursor-pointer text-gray-500  disabled:opacity-20 " +
        className
      }
    >
      {React.cloneElement(icon, {
        size: "16px",
        className: className === "copy-success" ? " dark:fill-green-500" : " ",
      })}
    </button>
  );
}

export default ReactionButtons;
