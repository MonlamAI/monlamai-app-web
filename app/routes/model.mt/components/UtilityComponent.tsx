import { Button, Textarea } from "flowbite-react";
import TextComponent from "../../../component/TextComponent";
import { motion } from "framer-motion";
import FileUpload from "~/component/FileUpload";
import { useEffect, useMemo, useState } from "react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { useFetcher, useLoaderData, useRevalidator } from "@remix-run/react";
import { MdDeleteForever } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import timeSince from "~/component/utils/timeSince";
import { IoSend } from "react-icons/io5";
import useSocket from "~/component/hooks/useSocket";

type TextOrDocumentComponentProps = {
  selectedTool: string;
  sourceText: string;
  setSourceText: (text: string) => void;
  sourceLang: string;
  setFile: (file: any) => void;
  setInputUrl: (data: string) => void;
};

type CharacterOrFileSizeComponentProps = {
  selectedTool: string;
  charCount: number | string;
  CHAR_LIMIT: number | undefined;
  MAX_SIZE_SUPPORT: string;
};

type EditActionButtonsProps = {
  handleCancelEdit: () => void;
  handleEditSubmit: () => void;
  editfetcher: any;
  editText: string;
  outputText: any;
};

type OutputDisplayProps = {
  edit: boolean;
  editData: string;
  output: string;
  editText: string;
  setEditText: (p: string) => void;
};

export function TextOrDocumentComponent({
  selectedTool,
  sourceText,
  setSourceText,
  sourceLang,
  setFile,
  setInputUrl,
}: TextOrDocumentComponentProps) {
  if (selectedTool === "text") {
    return (
      <TextComponent
        sourceText={sourceText}
        setSourceText={setSourceText}
        sourceLang={sourceLang}
      />
    );
  } else if (selectedTool === "document") {
    return (
      <FileUpload
        setFile={setFile}
        setInputUrl={setInputUrl}
        supported={[".txt", ".docx"]}
        model="mt"
      />
    );
  }
  return null;
}

export function CharacterOrFileSizeComponent({
  selectedTool,
  charCount,
  CHAR_LIMIT,
  MAX_SIZE_SUPPORT,
}: CharacterOrFileSizeComponentProps) {
  return (
    <div className="text-gray-400 text-xs p-2">
      {(selectedTool === "recording" || selectedTool === "file") &&
        "Duration : " + charCount}
      {selectedTool === "text" && (
        <>
          <span style={{ color: charCount > CHAR_LIMIT! ? "red" : "inherit" }}>
            {charCount}
          </span>{" "}
          / {CHAR_LIMIT}
        </>
      )}
      {selectedTool !== "recording" &&
        selectedTool !== "text" &&
        selectedTool !== "file" && (
          <div className="text-gray-400 text-xs p-2">
            max size: {MAX_SIZE_SUPPORT}
          </div>
        )}
    </div>
  );
}

export function LoadingAnimation() {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function OutputDisplay({ edit, editData, output, animate, targetLang }) {
  if (edit) return null;
  let isNotEng = targetLang !== "en";
  let isNotTib = targetLang !== "bo";
  return (
    <div
      className={`p-2 text-[1.2rem] leading-[1.8] max-h-[40vh] overflow-y-auto first-letter 
      ${!isNotEng && "font-poppins text-xl"} ${
        !isNotTib && "text-lg leading-loose font-monlam"
      } ${isNotEng && isNotTib && "font-notosans"}`}
    >
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {editData ? editData : output}
      </motion.p>
    </div>
  );
}

export function EditActionButtons({
  handleCancelEdit,
  handleEditSubmit,
  editfetcher,
  editText,
  outputText,
}: EditActionButtonsProps) {
  return (
    <>
      <p className="px-2 py-1 bg-[#F5F6B0] dark:bg-yellow-500 rounded-md text-sm my-2 text-black dark:text-white">
        Your contribution will be used to improve translation quality.
      </p>
      <div className="flex justify-between">
        <Button color="gray" onClick={handleCancelEdit}>
          cancel
        </Button>
        <Button
          color="blue"
          onClick={handleEditSubmit}
          isProcessing={editfetcher.state !== "idle"}
          disabled={editText === outputText}
        >
          submit
        </Button>
      </div>
    </>
  );
}

export function SubmitButton({
  selectedTool,
  trigger,
  submitFile,
  charCount,
  CHAR_LIMIT,
  disabled,
}: any) {
  const { locale } = uselitteraTranlation();
  const isFile = selectedTool === "document";
  const exceedsLimit = charCount > CHAR_LIMIT;
  const empty_error = charCount === 0;
  return (
    <Button
      disabled={!isFile ? exceedsLimit || empty_error : disabled}
      size="xs"
      title={exceedsLimit ? "Character limit exceeded" : ""}
      onClick={isFile ? submitFile : trigger}
      className={` ${locale !== "bo_TI" ? "font-poppins" : "font-monlam"}`}
    >
      <IoSend size={18} />
    </Button>
  );
}
