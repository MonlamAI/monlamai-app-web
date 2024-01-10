import { Button } from "flowbite-react";
import { useEffect } from "react";
import { GoPencil } from "react-icons/go";
import { toast } from "react-toastify";
import CopyToClipboard from "~/component/CopyToClipboard";
import ReactionButtons from "~/component/ReactionButtons";
import ShareLink from "~/component/ShareLink";
import Speak from "~/component/Speak";
import LikeDislike from "~/styles/LikeDislike";

type NonEditModeActionsProps = {
  selectedTool: string;
  setShowLike: (p: boolean) => void;
  showLike: boolean;
  likefetcher: any;
  sourceText: string;
  inferenceId: string;
  setEdit: (p: boolean) => void;
  setEditText: (p: string) => void;
  text: any;
  handleCopy: () => void;
};

export function NonEditModeActions({
  selectedTool,
  setShowLike,
  showLike,
  likefetcher,
  sourceText,
  inferenceId,
  setEdit,
  setEditText,
  text,
  handleCopy,
}: NonEditModeActionsProps) {
  let isSelected = selectedTool === "text" || selectedTool === "recording";
  let isOutputNull = !text || text === "";
  return (
    <div className="flex justify-between">
      {isOutputNull && isSelected ? (
        <Speak getText={text} text={null} />
      ) : (
        <div />
      )}
      <div className="flex relative justify-end items-center">
        {isSelected && (
          <>
            <Button
              className="border-none"
              color="gray"
              onClick={() => setShowLike((p) => !p)}
              disabled={!text}
            >
              <LikeDislike />
            </Button>
            {showLike && (
              <div className="rounded shadow-md bg-white flex flex-col items-center gap-1 absolute top-[100%] left-0 p-4 z-10">
                <div className="flex flex-col gap-2">
                  <p>Rate this translation</p>
                  <ReactionButtons
                    fetcher={likefetcher}
                    output={text}
                    sourceText={sourceText}
                    inferenceId={inferenceId}
                  />
                </div>
                <Button
                  onClick={() => {
                    setEdit((p) => !p);
                    setEditText(text);
                  }}
                >
                  <GoPencil className="mr-2" />
                  Suggest an edit
                </Button>
              </div>
            )}
            <CopyToClipboard textToCopy={text} onClick={handleCopy} />
          </>
        )}
        {!isOutputNull && isSelected && <ShareLink inferenceId={inferenceId} />}
      </div>
    </div>
  );
}
