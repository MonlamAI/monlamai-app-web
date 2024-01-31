import { useRouteLoaderData } from "@remix-run/react";
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
  let { isFileUploadEnabled } = useRouteLoaderData("root");
  return (
    <div className="flex gap-2 mt-2">
      {options.map((option, index) => {
        if (!isFileUploadEnabled) return null;
        return (
          <Button
            color={option === selectedTool ? "blue" : "gray"}
            size={"xs"}
            key={option + index}
            onClick={() => setSelectedTool(option)}
            className="capitalize"
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
}
