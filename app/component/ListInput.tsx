import { Button } from "flowbite-react";

type ListInputProps = {
  selectedTool: string;
  setSelectedTool: (tool: any) => void;
  options: string[];
};

export default function ListInput({
  selectedTool,
  setSelectedTool,
  options,
}: ListInputProps) {
  return (
    <div className="flex gap-2 mt-2">
      {options.map((option) => (
        <Button
          color={option === selectedTool ? "blue" : "gray"}
          size={"xs"}
          onClick={() => setSelectedTool(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
