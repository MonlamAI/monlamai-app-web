import { Button, Textarea } from "flowbite-react";
import DocumentComponent from "./DocumentComponent";
import TextComponent from "./TextComponent";
import { motion } from "framer-motion";
import EditDisplay from "~/component/EditDisplay";
type TextOrDocumentComponentProps = {
  selectedTool: string;
  sourceText: string;
  setSourceText: (text: string) => void;
  setFileType: (type: "txt" | "docx" | null) => void;
  sourceLang: string;
};

type CharacterOrFileSizeComponentProps = {
  selectedTool: string;
  charCount: number;
  CHAR_LIMIT: number;
  MAX_SIZE_SUPPORT: number;
};

type EditActionButtonsProps = {
  handleCancelEdit: () => void;
  handleEditSubmit: () => void;
  editfetcher: any;
  editText: string;
  translated: any;
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
  setFileType,
  sourceLang,
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
      <DocumentComponent
        sourceText={sourceText}
        setSourceText={setSourceText}
        setFileType={setFileType}
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
  if (selectedTool === "text") {
    return (
      <div className="text-gray-400 text-xs">
        {charCount} / {CHAR_LIMIT}
      </div>
    );
  } else {
    return (
      <div className="text-gray-400 text-xs">
        max size: {MAX_SIZE_SUPPORT}KB
      </div>
    );
  }
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

export function OutputDisplay({ edit, editData, output }: OutputDisplayProps) {
  if (edit) return null;

  return (
    <div className="font-monlam text-[1.2rem]" style={{ lineHeight: "1.8" }}>
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
  translated,
}: EditActionButtonsProps) {
  return (
    <>
      <p className="px-2 py-1 bg-[#F5F6B0] rounded-md text-sm">
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
          disabled={editText === translated?.translation}
        >
          submit
        </Button>
      </div>
    </>
  );
}
