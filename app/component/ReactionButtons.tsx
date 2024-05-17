import { Button, Spinner } from "flowbite-react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { modelType } from "~/modal/feedback.server";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
interface ReactionButtonsProps {
  fetcher: any;
  output: string | null;
  sourceText: string | null;
  inferenceId: string;
}

const API_ENDPOINT = "/api/feedback";
const IDLE_STATE = "idle";

let showMessage = false;

function ReactionButtons({
  fetcher,
  output,
  sourceText,
  inferenceId,
}: ReactionButtonsProps) {
  if (!inferenceId) return null;
  const { liked, disliked } = fetcher.data?.vote || {};

  const isLoading =
    fetcher.state !== IDLE_STATE && fetcher.formData?.get("action");

  const handleReaction = async (action: "liked" | "disliked") => {
    if (!output || !sourceText) return;
    showMessage = true;
    fetcher.submit(
      { inferenceId, action },
      { method: "POST", action: API_ENDPOINT }
    );
  };

  if (isLoading) return <Spinner />;
  let data = fetcher.data;

  useEffect(() => {
    let message = data?.message;
    if (message && message !== "" && showMessage) {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    showMessage = false;
  }, [data]);

  return (
    <>
      <ReactionButton
        enabled={!!output}
        disabled={liked}
        icon={<FaRegThumbsUp />}
        onClick={() => handleReaction("liked")}
        className="hover:text-green-400 "
      />
      <ReactionButton
        enabled={!!output}
        disabled={disliked}
        icon={<FaRegThumbsDown />}
        className="hover:text-red-400 "
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

function ReactionButton({
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
        size: "20px",
      })}
    </button>
  );
}

export default ReactionButtons;
