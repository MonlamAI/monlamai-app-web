import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { Button } from "flowbite-react";
import { IoSend } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";

export function TtsSubmitButton({ trigger, charCount, CHAR_LIMIT }: any) {
  const { translation, locale } = uselitteraTranlation();
  const exceedsLimit = charCount > CHAR_LIMIT;

  return (
    <Button
      disabled={exceedsLimit}
      size="xs"
      title={exceedsLimit ? "Character limit exceeded" : ""}
      onClick={trigger}
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
