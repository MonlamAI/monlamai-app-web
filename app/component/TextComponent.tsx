import { useEffect, useRef, useCallback } from "react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import sanitizeHtml from "sanitize-html";

function TextComponent({ sourceText, setSourceText, sourceLang }) {
  let { translation, isEnglish } = uselitteraTranlation();
  let textAreaRef = useRef(null);
  let isEng = sourceLang === "en";
  let isTib = sourceLang === "bo";

  useEffect(() => {
    textAreaRef.current?.addEventListener("paste", function (e) {
      e.preventDefault();
      var text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
    });
  }, []);

  let fontSize =
    sourceText.length < 600
      ? "text-lg"
      : sourceText.length < 1000
      ? "text-base"
      : "text-sm";

  const onContentBlur = useCallback((evt) => {
    const sanitizeConf = {
      allowedTags: ["b", "i", "a", "p"],
      allowedAttributes: { a: ["href"] },
    };
    let html = sanitizeHtml(evt.target.innerText, sanitizeConf);
    setSourceText(html);
  }, []);

  return (
    <div
      id="textAreaInput"
      name="sourceText"
      className={`p-2 ${
        isEnglish ? "placeholder:font-poppins" : "placeholder:font-monlam"
      } w-full rounded-none resize-none flex-1 bg-transparent border-0 dark:border:0 focus:outline-none dark:focus:outline-none focus:ring-transparent dark:focus:ring-transparent caret-slate-500 placeholder:text-slate-300 placeholder:font-monlam placeholder:text-lg
       ${fontSize} ${isEng && "font-poppins  "} ${
        isTib && "leading-loose font-monlam "
      } ${!isEng && !isTib && "font-notosans "}`}
      placeholder={translation.inputPlaceholder}
      contentEditable
      required
      onInput={onContentBlur}
      onBlur={onContentBlur}
      autoFocus
      ref={textAreaRef}
    />
  );
}

export default TextComponent;
