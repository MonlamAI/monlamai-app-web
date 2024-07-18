import { Spinner } from "flowbite-react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import React from "react";
import { ICON_SIZE } from "~/helper/const";
import { FaPencil } from "react-icons/fa6";
interface ReactionButtonsProps {
  fetcher: any;
  output: string | null;
  sourceText: string | null;
  inferenceId: string;
  clickEdit: () => void | undefined;
}

const API_ENDPOINT = "/api/feedback";
const IDLE_STATE = "idle";

function ReactionButtons({
  fetcher,
  output,
  sourceText,
  inferenceId,
  clickEdit,
}: ReactionButtonsProps) {
  if (!inferenceId) return null;
  const { liked, disliked } = fetcher.data?.vote || {};

  const isLoading =
    fetcher.state !== IDLE_STATE && fetcher.formData?.get("action");

  const handleReaction = async (action: "liked" | "disliked") => {
    if (!output || !sourceText) return;
    fetcher.submit(
      { inferenceId, action },
      { method: "POST", action: API_ENDPOINT }
    );
  };

  if (isLoading)
    return (
      <Spinner
        size="lg"
        className={"fill-secondary-300 dark:fill-primary-500"}
      />
    );

  return (
    <>
      {clickEdit !== undefined && (
        <ReactionButton
          disabled={!output}
          enabled={!!output}
          icon={<FaPencil size={ICON_SIZE} />}
          onClick={clickEdit}
          className=""
        />
      )}
      <ReactionButton
        icon={<FaRegThumbsUp size={ICON_SIZE} />}
        onClick={() => handleReaction("liked")}
        className={`hover:text-green-400 ${liked && "text-green-400"}`}
      />
      <ReactionButton
        icon={<FaRegThumbsDown size={ICON_SIZE} />}
        onClick={() => handleReaction("disliked")}
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
