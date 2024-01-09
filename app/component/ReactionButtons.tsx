import { Button, Spinner } from "flowbite-react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { modelType } from "~/modal/feedback";
import React from "react";
interface ReactionButtonsProps {
  fetcher: any;
  output: string | null;
  sourceText: string | null;
  model: modelType;
  inferenceId: number;
}

const API_ENDPOINT = "/api/feedback";
const IDLE_STATE = "idle";

function ReactionButtons({
  fetcher,
  output,
  sourceText,
  model,
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

  return (
    <div className="flex justify-end">
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
    <Button color="white" disabled={!enabled} onClick={onClick}>
      {React.cloneElement(icon, {
        color: active ? (icon === FaRegThumbsUp ? "green" : "red") : "gray",
        size: "20px",
      })}
    </Button>
  );
}

export default ReactionButtons;
