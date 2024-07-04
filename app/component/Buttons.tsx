import type { ButtonProps, CustomFlowbiteTheme } from "flowbite-react";
import { Button } from "flowbite-react";
import uselitteraTranlation from "./hooks/useLitteraTranslation";

const customTheme: CustomFlowbiteTheme["button"] = {
  color: {
    primary:
      "bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 hover:text-white focus:text-white",
  },
};

export function SubmitButton(props: ButtonProps<"button">) {
  let { isEnglish } = uselitteraTranlation();
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
      className="absolute z-20 top-1 right-2 text-light_text-secondary hover:text-neutral-800 hover:bg-neutral-100 transition-colors duration-200 rounded-md p-1 cursor-pointer"
      {...props}
      title="reset"
      id="clearInputBtn"
    >
      {props.children}
    </div>
  );
}
