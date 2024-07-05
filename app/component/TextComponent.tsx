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
      let text = textRef.current?.childNodes[0];
      if (
        textRef.current.childNodes[0] === undefined ||
        textRef.current.childNodes[0] === null
      ) {
        text = document.createTextNode(""); // Create an empty text node
        textRef.current.appendChild(text);
      }
      newRange?.setStart(text, offset);
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

  const onContentBlur = useCallback((evt) => {
    const sanitizeConf = {
      allowedTags: ["b", "i", "a", "p"],
      allowedAttributes: { a: ["href"] },
    };
    let html = sanitizeHtml(evt.target.innerText, sanitizeConf);

    const range = document.getSelection().getRangeAt(0);
    setOffset(range.startOffset);
    setSourceText(html);
  }, []);

  return (
    <div
      id="textAreaInput"
      className={`p-2 pr-6 ${
        isEnglish ? "placeholder:font-poppins" : "placeholder:font-monlam"
      } w-full rounded-none resize-none flex-1 bg-transparent border-0 dark:border:0 focus:outline-none dark:focus:outline-none focus:ring-transparent dark:focus:ring-transparent caret-slate-500 placeholder:text-slate-300 placeholder:font-monlam placeholder:text-lg
       ${fontSize} ${isEng && "font-poppins  "} ${
        isTib && "leading-loose font-monlam "
      } ${!isEng && !isTib && "font-notosans "}`}
      placeholder={translation.inputPlaceholder}
      contentEditable
      required
      onInput={onContentBlur}
      autoFocus
      ref={textRef}
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{ __html: sourceText }}
    />
  );
}

export default TextComponent;
