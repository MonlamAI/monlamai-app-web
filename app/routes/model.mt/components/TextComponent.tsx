import { Textarea } from "flowbite-react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { CHAR_LIMIT } from "~/helper/const";

function TextComponent({ sourceText, setSourceText, sourceLang }) {
  let { translation, locale } = uselitteraTranlation();
  let isEnglish = locale === "en_US";
  return (
    <Textarea
      name="sourceText"
      placeholder={!isEnglish ? "ཡི་གེ་གཏག་རོགས།..." : "Enter text here..."}
      className={`w-full resize-none bg-slate-50 min-h-full flex-1 p-2 border-0 focus:outline-none focus:ring-transparent  caret-slate-500 placeholder:text-slate-300 placeholder:font-monlam placeholder:text-lg ${
        sourceLang == "en" && "font-poppins text-xl"
      } ${sourceLang == "bo" && "text-lg leading-loose font-monlam"}`}
      required
      value={sourceText}
      onInput={(e) => {
        setSourceText((prev) => {
          let value = e.target?.value;
          if (value?.length <= CHAR_LIMIT) return value;
          return prev;
        });
      }}
      autoFocus
    />
  );
}

export default TextComponent;
