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
      onChange={(e) => setEditText(e.target.value)}
      className="w-full h-full resize-none bg-transparent text-2xl font-monlam ring-0 flex-1"
    />
  );
}

export default EditDisplay;
