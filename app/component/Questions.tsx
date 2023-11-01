import { Label, Select, TextInput } from "flowbite-react";
import { useState, useId, useEffect } from "react";
import { feedback_options } from "./utils/feedbackOptions";

type optionProps = {
  option: "q1" | "q2" | "q3" | "q4";
  value: string;
  setValue: (value: string) => void;
};

function Questions({ option, value, setValue }: optionProps) {
  let select_options = feedback_options[option];
  let [Q, setQ] = useState(select_options?.option[0]);
  let [textAreaValue, setTextAreaValue] = useState("");
  let id = useId();

  useEffect(() => {
    if (Q === "other") {
      setValue(textAreaValue);
    } else {
      setValue(Q);
    }
  }, [Q, textAreaValue]);
  return (
    <>
      <Label htmlFor={id}>
        {select_options.label}
        <span className="text-red-500 text-[20px] ml-1">*</span>
      </Label>
      <Select id={id} value={Q} required onChange={(e) => setQ(e.target.value)}>
        {select_options.option.map((option) => (
          <option key={option + "index"} value={option}>
            {option}
          </option>
        ))}
      </Select>
      {Q === "other" && (
        <TextInput
          value={textAreaValue}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
          }}
          autoFocus
          type="text"
          required
        />
      )}
    </>
  );
}

export default Questions;
