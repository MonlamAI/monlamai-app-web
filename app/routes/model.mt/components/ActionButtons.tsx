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
  liked: boolean;
  message: string;
  selectedTool: string;
  setShowLike: (p: boolean) => void;
  showLike: boolean;
  likefetcher: any;
  getTextToCopy: () => string;
  sourceText: string;
  inferenceId: string;
  setEdit: (p: boolean) => void;
  setEditText: (p: string) => void;
  translated: any;
  handleCopy: () => void;
};

export function NonEditModeActions({
  liked,
  message,
  selectedTool,
  setShowLike,
  showLike,
  likefetcher,
  getTextToCopy,
  sourceText,
  inferenceId,
  setEdit,
  setEditText,
  translated,
  handleCopy,
}: NonEditModeActionsProps) {
  useEffect(() => {
    if (message && message !== "") {
      toast(message);
    }
  }, [message]);

  return (
    <div className="flex justify-end">
      <div className="flex relative justify-end items-center">
        {selectedTool === "text" && (
          <>
            <Button
              className="border-none"
              color="gray"
              onClick={() => setShowLike((p) => !p)}
              disabled={!getTextToCopy()}
            >
              <LikeDislike />
            </Button>
            {showLike && (
              <div className="rounded shadow-md bg-white flex flex-col items-center gap-1 absolute top-[100%] left-0 p-4 z-10">
                <div className="flex flex-col gap-2">
                  <p>Rate this translation</p>
                  <ReactionButtons
                    fetcher={likefetcher}
                    output={getTextToCopy()}
                    sourceText={sourceText}
                    model="mt"
                    inferenceId={inferenceId}
                  />
                </div>
                <Button
                  onClick={() => {
                    setEdit((p) => !p);
                    setEditText(translated?.translation);
                  }}
                >
                  <GoPencil className="mr-2" />
                  Suggest an edit
                </Button>
              </div>
            )}
            <CopyToClipboard
              textToCopy={getTextToCopy()}
              onClick={handleCopy}
            />
          </>
        )}
        {getTextToCopy() !== "" && selectedTool === "text" && (
          <>
            <Speak getText={getTextToCopy} text={null} />
            <ShareLink
              link={window.location.origin + `/share/${inferenceId}`}
            />
          </>
        )}
      </div>
    </div>
  );
}
