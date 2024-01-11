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
      toast(message);
    }
  }, [message]);

  return (
    <div className="flex justify-center">
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

function ReactionButton({
  enabled,
  active,
  icon,
  onClick,
}: ReactionButtonProps) {
  return (
    <Button
      color="white"
      disabled={!enabled}
      onClick={onClick}
      className="focus:outline-none"
    >
      {React.cloneElement(icon, {
        color: active ? (icon === FaRegThumbsUp ? "green" : "red") : "gray",
        size: "20px",
      })}
    </Button>
  );
}

export default ReactionButtons;
