import { Textarea } from "flowbite-react";
import { useEffect, useRef } from "react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";

function TextComponent({ sourceText, setSourceText, sourceLang }) {
  let { translation } = uselitteraTranlation();
  let textAreaRef = useRef<HTMLTextAreaElement>(null);
  let isNotEng = sourceLang !== "en";
  let isNotTib = sourceLang !== "bo";
  let prevTextRef = useRef(sourceText);
  useEffect(() => {
    const textRf = document.getElementById("textAreaInput");

    function autoResize() {
      // This condition ensures that we do not resize past a maximum height
      if (this.scrollHeight) {
        this.style.minHeight = "auto"; // Reset minHeight
        this.style.minHeight = this.scrollHeight + "px"; // Set minHeight to scrollHeight
      }
      window?.scrollTo(0, document.body.scrollHeight);
    }

    textRf?.addEventListener("input", autoResize, false);

    // Initial call to ensure proper sizing from the start
    autoResize.call(textRf);

    return () => {
      textRf?.removeEventListener("input", autoResize);
    };
  }, []);

  useEffect(() => {
    const textRf = document.getElementById("textAreaInput");

    if (
      sourceText.length > prevTextRef.current.length &&
      sourceText.startsWith(prevTextRef.current)
    ) {
      window.scrollTo(0, document.body.scrollHeight);
    }
    if (textRf && (sourceText === "" || sourceText === null)) {
      textRf.style.minHeight = "auto"; // Reset height
    }
    prevTextRef.current = sourceText;
  }, [sourceText]);

  let fontSize =
    sourceText.length < 600
      ? "text-lg"
      : sourceText.length < 1000
      ? "text-base"
      : "text-sm";

  return (
    <Textarea
      id="textAreaInput"
      name="sourceText"
      placeholder={translation.inputPlaceholder}
      className={`w-full rounded-none resize-none flex-1 md:min-h-[5em] bg-transparent border-0 dark:border:0 focus:outline-none dark:focus:outline-none focus:ring-transparent dark:focus:ring-transparent caret-slate-500 placeholder:text-slate-300 placeholder:font-monlam placeholder:text-lg
       ${fontSize} ${!isNotEng && "font-poppins "} ${
        !isNotTib && "leading-loose font-monlam"
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
