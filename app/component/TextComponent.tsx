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
  const textRef = useRef(null);
  const caretPos = useRef(0);
  let isEng = sourceLang === "en";
  let isTib = sourceLang === "bo";

  function getCaret(el) {
    let caretAt = 0;
    const sel = window.getSelection();

    if (sel.rangeCount === 0) {
      return caretAt;
    }

    const range = sel.getRangeAt(0);
    const preRange = range.cloneRange();
    preRange.selectNodeContents(el);
    preRange.setEnd(range.endContainer, range.endOffset);
    caretAt = preRange.toString().length;

    return caretAt;
  }

  function setCaret(el, offset) {
    const sel = window.getSelection();
    const range = document.createRange();

    range.setStart(el?.childNodes[0], offset);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  useEffect(() => {
    if (sourceText && textRef.current && caretPos.current !== 0) {
      setCaret(textRef.current, caretPos.current);
      textRef.current.focus();
    }
  }, [sourceText]);

  useEffect(() => {
    textRef.current?.addEventListener("paste", function (e) {
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

  const onInput = useCallback(
    (evt) => {
      caretPos.current = getCaret(textRef.current);
      const sanitizeConf = {
        allowedTags: ["b", "i", "a", "p"],
        allowedAttributes: { a: ["href"] },
      };
      const html = sanitizeHtml(evt.target.innerHTML, sanitizeConf);
      setSourceText(html);

      // After setting the source text, ensure the cursor is at the correct position
      const newCaretPos = getCaret(textRef.current);
      if (caretPos.current !== newCaretPos) {
        setCaret(textRef.current, caretPos.current);
      }
    },
    [setSourceText]
  );
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
