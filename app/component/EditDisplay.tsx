import { Textarea } from "flowbite-react";
import React from "react";
import uselitteraTranlation from "./hooks/useLitteraTranslation";

type EditDisplayProps = {
  editText: string;
  setEditText: (p: string) => void;
  targetLang: string;
};

function EditDisplay({ editText, setEditText, targetLang }: EditDisplayProps) {
  let isEng = targetLang === "en";
  let isTib = targetLang === "bo";
  let fontSize =
    editText.length < 600
      ? "text-lg"
      : editText.length < 1000
      ? "text-base"
      : "text-sm";
  return (
    <Textarea
      id="editOutputText"
      value={editText}
      rows={5}
      onChange={(e) => {
        setEditText(e.target.value);
      }}
      className={`${fontSize} ${isEng && "font-poppins "} ${
        isTib && "leading-loose font-monlam"
      } ${
        !isEng && !isTib && "font-notosans"
      } w-full h-full rounded-none overflow-auto  resize-none flex-1 md:min-h-[5em] bg-transparent border-0 dark:border:0 focus:outline-none dark:focus:outline-none focus:ring-transparent dark:focus:ring-transparent caret-slate-500 placeholder:text-slate-300 placeholder:font-monlam placeholder:text-lg`}
    />
  );
}

export default EditDisplay;
