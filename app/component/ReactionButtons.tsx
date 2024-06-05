import { Button, Spinner } from "flowbite-react";
import { FaPencilAlt, FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { ICON_SIZE } from "~/helper/const";
import { FaPencil } from "react-icons/fa6";
interface ReactionButtonsProps {
  fetcher: any;
  output: string | null;
  sourceText: string | null;
  inferenceId: string;
  clickEdit: () => void;
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
    if (liked || disliked) return;
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
        enabled={!!output}
        disabled={disliked}
        icon={<FaRegThumbsUp size={ICON_SIZE} />}
        onClick={() => handleReaction("liked")}
        className={`hover:text-green-400 ${liked && "text-green-400"}`}
      />
      <ReactionButton
        enabled={!!output}
        disabled={liked}
        icon={<FaRegThumbsDown size={ICON_SIZE} />}
        className={`hover:text-red-400 ${disliked && "text-red-400"}`}
        onClick={() => handleReaction("disliked")}
      />
    </>
  );
}

type ReactionButtonProps = {
  enabled: boolean;
  disabled: boolean;
  icon: React.ReactElement;
  onClick: () => void;
  className?: string;
};

export function ReactionButton({
  disabled,
  icon,
  onClick,
  className,
}: ReactionButtonProps) {
  return (
    <button
      color="white"
      onClick={onClick}
      className={
        "focus:outline-none cursor-pointer text-gray-500 disabled:opacity-20 " +
        className
      }
      disabled={disabled}
    >
      {React.cloneElement(icon, {
        size: "16px",
      })}
    </button>
  );
}

export default ReactionButtons;
