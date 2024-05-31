import { Textarea } from "flowbite-react";
import React from "react";

type EditDisplayProps = {
  editText: string;
  setEditText: (p: string) => void;
};

function EditDisplay({ editText, setEditText }: EditDisplayProps) {
  return (
    <Textarea
      value={editText}
      rows={5}
      onChange={(e) => {
        setEditText(e.target.value);
      }}
      className="w-full rounded-none overflow-auto  resize-none flex-1 md:min-h-[5em] bg-transparent border-0 dark:border:0 focus:outline-none dark:focus:outline-none focus:ring-transparent dark:focus:ring-transparent caret-slate-500 placeholder:text-slate-300 placeholder:font-monlam placeholder:text-lg"
    />
  );
}

export default EditDisplay;
