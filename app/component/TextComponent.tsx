import { Textarea } from "flowbite-react";
import { useRef } from "react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
function TextComponent({ sourceText, setSourceText, sourceLang }) {
  let { translation } = uselitteraTranlation();
  let textRef = useRef<HTMLTextAreaElement>(null);
  let isNotEng = sourceLang !== "en";
  let isNotTib = sourceLang !== "bo";
  return (
    <Textarea
      name="sourceText"
      placeholder={translation.inputPlaceholder}
      className={`w-full p-2 overflow-auto resize-none flex-1 min-h-[5em] bg-transparent border-0 focus:outline-none focus:ring-transparent caret-slate-500 placeholder:text-slate-300 placeholder:font-monlam placeholder:text-lg
        ${!isNotEng && "font-poppins text-xl"} ${
        !isNotTib && "text-lg leading-loose font-monlam"
      } ${isNotEng && isNotTib && "font-notosans"}`}
      required
      value={sourceText}
      onInput={(e) => {
        setSourceText((prev) => {
          let value = e.target?.value;
          return value;
        });
      }}
      rows={3}
      autoFocus
      ref={textRef}
    />
  );
}

export default TextComponent;
