import { Button, Dropdown } from "flowbite-react";
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
      {!isOutputNull && isSelected ? <Speak text={text} /> : <div />}
      <div className="flex relative justify-end items-center">
        {isSelected && (
          <>
            <Dropdown
              label="likeDislikeEdit"
              dismissOnClick={true}
              renderTrigger={() => (
                <Button className="border-none" color="gray" disabled={!text}>
                  <LikeDislike />
                </Button>
              )}
              size="lg"
            >
              <Dropdown.Header>Satisfied?</Dropdown.Header>
              <div className="flex flex-col gap-2 ">
                <ReactionButtons
                  fetcher={likefetcher}
                  output={text}
                  sourceText={sourceText}
                  inferenceId={inferenceId}
                />
              </div>
              <hr />
              <Dropdown.Item
                onClick={() => {
                  setEditText(text);
                  setEdit(true);
                }}
                icon={GoPencil}
              >
                Suggest an edit
              </Dropdown.Item>
            </Dropdown>
            <CopyToClipboard textToCopy={text} onClick={handleCopy} />
          </>
        )}
        {!isOutputNull && isSelected && <ShareLink inferenceId={inferenceId} />}
      </div>
    </div>
  );
}
