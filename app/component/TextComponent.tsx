import {
  useEffect,
  useRef,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import sanitizeHtml from "sanitize-html";

function TextComponent({ sourceText, setSourceText, sourceLang }) {
  let { translation, isEnglish } = uselitteraTranlation();
  const [offset, setOffset] = useState();
  const textRef = useRef(null);
  let isEng = sourceLang === "en";
  let isTib = sourceLang === "bo";

  useEffect(() => {
    textRef.current?.addEventListener("paste", function (e) {
      e.preventDefault();
      var text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
    });
  }, []);

  useEffect(() => {
    if (offset !== undefined) {
      const newRange = document.createRange();
      if (textRef.current.childNodes[0] === undefined) return;
      newRange?.setStart(textRef.current.childNodes[0], offset);
      const selection = document.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(newRange);
    }
  }, [offset]);

  let fontSize =
    sourceText.length < 600
      ? "text-lg"
      : sourceText.length < 1000
      ? "text-base"
      : "text-sm";

  const onInput = useCallback((evt) => {
    const selection = window.getSelection();
    console.log("selection", evt.target.innerHTML);
    const sanitizeConf = {
      allowedTags: ["b", "i", "a", "p"],
      allowedAttributes: { a: ["href"] },
    };
    const html = sanitizeHtml(evt.target.innerHTML, sanitizeConf);
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      setOffset(range.startOffset);
      setSourceText(html);
    }
  }, []);
  return (
    <>
      <div
        id="textAreaInput"
        name="sourceText"
        className={`p-2 pr-6 w-full rounded-none resize-none flex-1 bg-transparent border-0 dark:border:0 focus:outline-none dark:focus:outline-none focus:ring-transparent dark:focus:ring-transparent caret-slate-500 placeholder:text-slate-300 placeholder:font-monlam placeholder:text-lg
       ${fontSize} ${isEng && "font-poppins  "} ${
          isTib && "leading-loose font-monlam "
        } ${!isEng && !isTib && "font-notosans "}`}
        contentEditable
        required
        onInput={onInput}
        autoFocus
        ref={textRef}
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: sourceText }}
      />
      {sourceText.length === 0 && (
        <span
          className={`absolute p-3 inset-0 text-gray-500 pointer-events-none ${
            isEnglish ? "font-poppins" : "font-monlam"
          }`}
        >
          {translation.inputPlaceholder}
        </span>
      )}
    </>
  );
}

export default TextComponent;
