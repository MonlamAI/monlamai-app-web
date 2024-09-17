import { Button, Dropdown, Tooltip } from "flowbite-react";
import {
  FaPenAlt,
  FaPencilAlt,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import CopyToClipboard from "~/component/CopyToClipboard";
import ReactionButtons from "~/component/ReactionButtons";
import ShareLink from "~/component/ShareLink";
import Speak from "~/component/Speak";
import { ICON_SIZE } from "~/helper/const";
import LikeDislike from "~/styles/LikeDislike";

type NonEditModeActionsProps = {
  likefetcher: any;
  sourceText: string;
  inferenceId: string;
  setEdit: (p: boolean) => void;
  setEditText: (p: string) => void;
  text: any;
  handleCopy: () => void;
  sourceLang: string;
  inferenceType:"translation"|"ocr"|"tts"|"stt"
};

export function NonEditModeActions({
  likefetcher,
  sourceText,
  inferenceId,
  setEdit,
  setEditText,
  text,
  handleCopy,
  sourceLang,
  inferenceType
}: NonEditModeActionsProps) {
  let isOutputNull = !text || text === "";
  if (isOutputNull || !isSelected) return null;
  // const { liked, disliked } = likefetcher.data?.vote || {};
  let liked=false;
  let disliked=false;
  return (
    <div
      className={`flex ${
        sourceLang == "en" ? "justify-between" : "justify-end"
      } p-2`}
    >
      {sourceLang == "en" && <Speak text={text} />}
      <div className="flex gap-3 md:gap-5 justify-end items-center">
        <Dropdown
          className="mt-2 w-52 text-center"
          label="likeDislikeEdit"
          placement="bottom-end"
          dismissOnClick={true}
          renderTrigger={() => (
            <div
              hidden={!text}
              title="Rate this translation"
              className="text-black dark:text-white"
            >
              {liked ? (
                <FaRegThumbsUp />
              ) : disliked ? (
                <FaRegThumbsDown />
              ) : (
                <LikeDislike />
              )}
            </div>
          )}
          size="lg"
        >
          <Dropdown.Header>Rate this translation</Dropdown.Header>
          <div className="flex justify-center py-2 gap-5">
            <ReactionButtons
              fetcher={likefetcher}
              output={text}
              sourceText={sourceText}
              inferenceId={inferenceId}
              inferenceType={inferenceType}
            />
          </div>
          <hr />
          <Dropdown.Item
            onClick={() => {
              setEditText(text);
              setEdit(true);
            }}
            icon={GoPencil}
            className="flex justify-center items-center"
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

type NonEditButtonProps = {
  likefetcher: any;
  sourceText: string;
  inferenceId: string;
  setEdit: (p: boolean) => void;
  setEditText: (p: string) => void;
  text: any;
  handleCopy: () => void;
  sourceLang: string;
};

export function NonEditButtons({
  likefetcher,
  sourceText,
  inferenceId,
  inferenceType,
  setEdit,
  setEditText,
  text,
  handleCopy,
  sourceLang,
}: NonEditButtonProps) {
  let isOutputNull = !text || text === "";
  if (isOutputNull) return null;
  // const { liked, disliked } = likefetcher.data?.vote || {};
  let liked=false;
  let disliked=false;
  const ClickEdit = () => {
    setEditText(text);
    setEdit(true);
  };
  return (
    <div
      className={`flex  ${
        sourceLang == "en" ? "justify-between" : "justify-end"
      } py-[8px] px-5 border-t dark:border-t-[--card-border] border-t-dark_text-secondary`}
    >
      {sourceLang == "en" && <Speak text={text} />}
      <div className="flex gap-3 justify-end items-center p-[4px]">
        <ReactionButtons
          fetcher={likefetcher}
          output={text}
          sourceText={sourceText}
          inferenceId={inferenceId}
          inferenceType={inferenceType}
          clickEdit={ClickEdit}
        />
        <CopyToClipboard textToCopy={text} onClick={handleCopy} />
        <ShareLink inferenceId={inferenceId} />
      </div>
    </div>
  );
}
