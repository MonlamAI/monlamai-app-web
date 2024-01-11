import { Button, Spinner } from "flowbite-react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { modelType } from "~/modal/feedback";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
interface ReactionButtonsProps {
  fetcher: any;
  output: string | null;
  sourceText: string | null;
  inferenceId: string;
}

const API_ENDPOINT = "/api/feedback";
const IDLE_STATE = "idle";

function ReactionButtons({
  fetcher,
  output,
  sourceText,
  inferenceId,
}: ReactionButtonsProps) {
  if (!inferenceId) return null;
  const { liked, disliked } = fetcher.data || {};
  const isLoading =
    fetcher.state !== IDLE_STATE && fetcher.formData?.get("action");

  const handleReaction = async (action: "liked" | "disliked") => {
    if (!output || !sourceText) return;

    fetcher.submit(
      { inferenceId, action },
      { method: "POST", action: API_ENDPOINT }
    );
  };

  if (isLoading) return <Spinner />;
  let message = fetcher.data?.message;

  useEffect(() => {
    if (message && message !== "") {
      toast.success(message);
    }
  }, [message]);

  return (
    <div className="flex justify-center gap-6 my-2">
      <ReactionButton
        enabled={!!output}
        active={liked}
        icon={<FaRegThumbsUp />}
        onClick={() => handleReaction("liked")}
      />
      <ReactionButton
        enabled={!!output}
        active={disliked}
        icon={<FaRegThumbsDown />}
        onClick={() => handleReaction("disliked")}
      />
    </div>
  );
}

type ReactionButtonProps = {
  enabled: boolean;
  active: boolean;
  icon: React.ReactElement;
  onClick: () => void;
};

function ReactionButton({ active, icon, onClick }: ReactionButtonProps) {
  return (
    <div
      color="white"
      onClick={onClick}
      className="focus:outline-none cursor-pointer text-gray-500 hover:text-green-400"
    >
      {React.cloneElement(icon, {
        size: "20px",
      })}
    </div>
  );
}

export default ReactionButtons;
