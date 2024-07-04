import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { Button } from "flowbite-react";
import { IoSend } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";

export function TtsSubmitButton({
  selectedTool,
  trigger,
  submitFile,
  charCount,
  CHAR_LIMIT,
  disabled,
}: any) {
  const { translation, locale } = uselitteraTranlation();
  const isFile = selectedTool === "document";
  const exceedsLimit = charCount > CHAR_LIMIT;

  return (
    <Button
      id="synthesisBtn"
      disabled={!isFile ? exceedsLimit : disabled}
      size="xs"
      title={exceedsLimit ? "Character limit exceeded" : ""}
      onClick={isFile ? submitFile : trigger}
      className={` bg-secondary-500 dark:bg-primary-500 hover:bg-secondary-400 dark:hover:bg-primary-400 
      enabled:hover:bg-secondary-400 enabled:dark:hover:bg-primary-400
      text-white dark:text-black 
   ${locale !== "bo_TI" ? "font-poppins" : "font-monlam"}`}
    >
      <span className="pr-2">{translation["synthesis"]}</span>
      <BsArrowRight size={18} />
    </Button>
  );
}
