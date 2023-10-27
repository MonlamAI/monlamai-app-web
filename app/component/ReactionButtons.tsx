import { Button, Spinner } from "flowbite-react";
import React from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa/index.js";
import { modelType } from "~/modal/feedback";

type reactProps = {
  fetcher: any;
  output: string | null;
  sourceText: string | null;
  model: modelType;
};

function ReactionButtons({ fetcher, output, sourceText, model }: reactProps) {
  let liked = fetcher.data?.liked;
  let disliked = fetcher.data?.disliked;
  let isLoading = fetcher.state !== "idle";
  function handleLike() {
    if (!output || !sourceText) return;
    fetcher.submit(
      {
        source: sourceText,
        output,
        _action: "liked",
        model,
      },
      {
        method: "POST",
        action: "/feedback",
      }
    );
  }
  function handleDislike() {
    if (!output || !sourceText) return;
    fetcher.submit(
      {
        source: sourceText,
        output,
        _action: "disliked",
        model,
      },
      {
        method: "POST",
        action: "/feedback",
      }
    );
  }
  if (isLoading) return <Spinner />;
  return (
    <div className="flex justify-end">
      <Button color="white" disabled={!output} onClick={handleLike}>
        <FaRegThumbsUp color={liked ? "green" : "gray"} size="20px" />
      </Button>
      <Button color="white" disabled={!output} onClick={handleDislike}>
        <FaRegThumbsDown color={disliked ? "red" : "gray"} size="20px" />
      </Button>
    </div>
  );
}

export default ReactionButtons;
