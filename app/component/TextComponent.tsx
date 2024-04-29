import { Textarea } from "flowbite-react";
import { useEffect, useRef } from "react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";

let MAX_HEIGHT_MOBILE_VIEW = 200;

function TextComponent({ sourceText, setSourceText, sourceLang }) {
  let { translation } = uselitteraTranlation();
  let textAreaRef = useRef<HTMLTextAreaElement>(null);
  let isNotEng = sourceLang !== "en";
  let isNotTib = sourceLang !== "bo";

  useEffect(() => {
    const textRf = document.getElementById("textAreaInput");

    function autoResize() {
      // This condition ensures that we do not resize past a maximum height
      if (this.scrollHeight < MAX_HEIGHT_MOBILE_VIEW) {
        this.style.minHeight = "auto"; // Reset minHeight
        this.style.minHeight = this.scrollHeight + "px"; // Set minHeight to scrollHeight
      }
    }

    textRf?.addEventListener("input", autoResize, false);

    // Initial call to ensure proper sizing from the start
    autoResize.call(textRf);

    return () => {
      textRf?.removeEventListener("input", autoResize);
    };
  }, []);

  return (
    <Textarea
      id="textAreaInput"
      name="sourceText"
      placeholder={translation.inputPlaceholder}
      className={`w-full md:min-h-[25vh] lg:min-h-[40vh] overflow-auto border bg-neutral-50 border-neutral-300 dark:bg-secondary-700 dark:border-secondary-600  resize-none flex-1  focus:outline-none focus:ring-transparent caret-slate-500 placeholder:text-slate-300 placeholder:font-monlam placeholder:text-lg
      ${!isNotEng && "font-poppins text-xl"} ${
        !isNotTib && "text-lg leading-loose font-monlam"
      } ${isNotEng && isNotTib && "font-notosans"}`}
      required
      value={sourceText}
      onInput={(e) => {
        let value = e.target?.value;
        setSourceText(value);
      }}
      autoFocus
      ref={textAreaRef}
    />
  );
}

export default TextComponent;
