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
  likefetcher,
  sourceText,
  inferenceId,
  setEdit,
  setEditText,
  text,
  handleCopy,
}: NonEditModeActionsProps) {
  let isSelected =
    selectedTool === "text" ||
    selectedTool === "Recording" ||
    selectedTool === "File";
  let isOutputNull = !text || text === "";
  if (isOutputNull || !isSelected) return null;
  return (
    <div className="flex justify-between">
      {selectedTool !== "File" && <Speak text={text} />}
      <div className="flex relative  gap-3 md:gap-5 justify-end items-center">
        <Dropdown
          label="likeDislikeEdit"
          placement="left"
          dismissOnClick={true}
          renderTrigger={() => (
            <div hidden={!text}>
              <LikeDislike />
            </div>
          )}
          size="lg"
        >
          <Dropdown.Header>Satisfied?</Dropdown.Header>
          <div className="flex justify-center py-2  gap-5 ">
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
        <ShareLink inferenceId={inferenceId} />
      </div>
    </div>
  );
}
