import { useEffect, useRef, useCallback, useState } from "react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

function TextComponent({ sourceText, setSourceText, sourceLang }) {
  let { translation, isEnglish } = uselitteraTranlation();
  let [html, setHTML] = useState("");
  const textRef = useRef(null);
  let isEng = sourceLang === "en";
  let isTib = sourceLang === "bo";

  let fontSize =
    sourceText.length < 600
      ? "text-lg"
      : sourceText.length < 1000
      ? "text-base"
      : "text-sm";

  const handleChange = (evt) => {
    let html = evt.target.value;
    const sanitizedHtml = sanitizeHtml(html, {
      allowedTags: ["div"],
      allowedIframeHostnames: ["www.youtube.com"],
    });
    const cleanText = sanitizedHtml
      .replace(/<div>/g, "\n")
      .replace(/<\/div>/g, "");
    setHTML(cleanText);
    setSourceText(cleanText);
  };

  useEffect(() => {
    if (sourceText === "") {
      setHTML("");
    }
  }, [sourceText]);

  return (
    <>
      <ContentEditable
        innerRef={textRef}
        html={html} // innerHTML of the editable div
        disabled={false} // use true to disable editing
        onChange={handleChange} // handle innerHTML change
        tagName="article" // Use a custom HTML tag (uses a div by default)
        className={`p-2 pr-6 w-full rounded-none resize-none flex-1 bg-transparent border-0 dark:border:0 focus:outline-none dark:focus:outline-none focus:ring-transparent dark:focus:ring-transparent caret-slate-500 placeholder:text-slate-300 placeholder:font-monlam placeholder:text-lg
          ${fontSize} ${isEng && "font-poppins  "} ${
          isTib && "leading-loose font-monlam "
        } ${!isEng && !isTib && "font-notosans "}`}
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
