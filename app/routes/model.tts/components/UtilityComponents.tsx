import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { Button } from "flowbite-react";
import { IoSend } from "react-icons/io5";

export function TtsSubmitButton({
  selectedTool,
  trigger,
  submitFile,
  charCount,
  CHAR_LIMIT,
  disabled,
}) {
  const { translation, locale } = uselitteraTranlation();
  const isFile = selectedTool === "document";
  const exceedsLimit = charCount > CHAR_LIMIT;

  return (
    <Button
      disabled={!isFile ? exceedsLimit : disabled}
      size="xs"
      title={exceedsLimit ? "Character limit exceeded" : ""}
      onClick={isFile ? submitFile : trigger}
      className={locale !== "bo_TI" ? "font-poppins" : "font-monlam"}
    >
      <IoSend size={18} />
    </Button>
  );
}
