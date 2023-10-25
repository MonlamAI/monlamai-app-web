import { Label, Select, TextInput } from "flowbite-react";
import { useState, useId, useEffect } from "react";
import { feedback_options } from "./utils/feedbackOptions";

type optionProps = {
  option: "q1" | "q2" | "q3" | "q4";
  value: string;
  setValue: (value: string) => void;
};

function SelectOptions({ option, value, setValue }: optionProps) {
  let [Q, setQ] = useState("");
  let [textAreaValue, setTextAreaValue] = useState("");
  let id = useId();
  let select_options = feedback_options[option];
  useEffect(() => {
    setValue(select_options.option[0]);
  }, []);
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
        <span style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}>
          *
        </span>
      </Label>
      <Select id={id} required onChange={(e) => setQ(e.target.value)}>
        {select_options.option.map((option) => (
          <option key={option} value={option}>
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

export default SelectOptions;
