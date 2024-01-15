import type { ButtonProps, CustomFlowbiteTheme } from "flowbite-react";
import { Button } from "flowbite-react";
import { useLocale } from "./hooks/useLocale";

const customTheme: CustomFlowbiteTheme["button"] = {
  color: {
    primary: "bg-blue-500 hover:bg-blue-600",
  },
};

export function SubmitButton(props: ButtonProps<"button">) {
  let { isEnglish } = useLocale();
  return (
    <Button
      theme={customTheme}
      color="primary"
      outline
      size="xs"
      className={isEnglish ? "font-poppins" : "font-monlam leading-[normal]"}
      {...props}
    >
      {props.children}
    </Button>
  );
}

export function CancelButton(props: any) {
  return (
    <div
      className="absolute -top-2 -right-2 hover:bg-slate-300 transition-colors duration-200 rounded-full p-1 cursor-pointer"
      {...props}
    >
      {props.children}
    </div>
  );
}
