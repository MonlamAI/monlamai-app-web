import { Button, Dropdown, Tooltip } from "flowbite-react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
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
  sourceLang: string;
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
  sourceLang,
}: NonEditModeActionsProps) {
  let isSelected =
    selectedTool === "text" ||
    selectedTool === "recording" ||
    selectedTool === "file";
  let isOutputNull = !text || text === "";
  if (isOutputNull || !isSelected) return null;
  const { liked, disliked } = likefetcher.data?.vote || {};

  return (
    <div
      className={`flex ${
        sourceLang == "en" ? "justify-between" : "justify-end"
      } p-2`}
    >
      {selectedTool !== "File" && sourceLang == "en" && <Speak text={text} />}
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
  selectedTool: string;
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
  selectedTool,
  likefetcher,
  sourceText,
  inferenceId,
  setEdit,
  setEditText,
  text,
  handleCopy,
  sourceLang,
}: NonEditButtonProps) {
  let isSelected =
    selectedTool === "text" ||
    selectedTool === "recording" ||
    selectedTool === "file";
  let isOutputNull = !text || text === "";
  if (isOutputNull || !isSelected) return null;
  const { liked, disliked } = likefetcher.data?.vote || {};

  return (
    <div
      className={`flex ${
        sourceLang == "en" ? "justify-between" : "justify-end"
      } p-2`}
    >
      {selectedTool !== "File" && sourceLang == "en" && <Speak text={text} />}
      <div className="flex gap-3 justify-end items-center">
        <button
          onClick={() => {
            setEditText(text);
            setEdit(true);
          }}
          className="flex justify-center items-center"
        >
          {/* <GoPencil size={20} /> */}
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
            />
          </svg>
        </button>
        <div className="flex justify-center py-2 gap-3">
          <ReactionButtons
            fetcher={likefetcher}
            output={text}
            sourceText={sourceText}
            inferenceId={inferenceId}
          />
        </div>
        <CopyToClipboard textToCopy={text} onClick={handleCopy} />
        <ShareLink inferenceId={inferenceId} />
      </div>
    </div>
  );
}
