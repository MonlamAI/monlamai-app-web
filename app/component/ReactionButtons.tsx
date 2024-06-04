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

  if (isLoading)
    return (
      <Spinner
        size="lg"
        className={"fill-secondary-300 dark:fill-primary-500"}
      />
    );
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
        icon={
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475"
            />
          </svg>
        }
        onClick={() => handleReaction("liked")}
        className="hover:text-green-400 "
      />
      <ReactionButton
        enabled={!!output}
        disabled={disliked}
        icon={
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475"
            />
          </svg>
        }
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
