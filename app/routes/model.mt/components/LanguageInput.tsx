import { useSearchParams } from "@remix-run/react";
import { Select } from "flowbite-react";
import React, { useEffect } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { resetFetcher } from "~/component/utils/resetFetcher";
import LanguageDetect from "languagedetect";

const lngDetector = new LanguageDetect();

function LanguageInput({
  likefetcher,
  sourceText,
  setSourceText,
  data,
  setTranslated,
}) {
  const [params, setParams] = useSearchParams();
  const sourceLang = params.get("source") || "detect language";
  const targetLang = params.get("target") || "bo";
  function handleChangeTo(event: React.ChangeEvent<HTMLSelectElement>) {
    const lang = event.target.value;
    setParams((p) => {
      p.set("target", lang);
      return p;
    });
  }
  function handleChangefrom(event: React.ChangeEvent<HTMLSelectElement>) {
    const lang = event.target.value;
    setParams((p) => {
      p.set("source", lang);
      return p;
    });
  }
  function toggleDirection() {
    resetFetcher(likefetcher);
    setSourceText(data);
    setTranslated("");
    setParams((p) => {
      const source = sourceLang;
      const target = targetLang;
      p.set("source", target);
      p.set("target", source);
      return p;
    });
  }
  useEffect(() => {
    if (sourceLang !== "detect language") return;
    let lang = lngDetector.detect(sourceText);
    let ranked = lang.map((l) => l[0]);
    let option = languagesOptions.map((l) => l.value.toLowerCase());
    let common = findFirstCommonElement(ranked, option);
    if (common) {
      let newLang = languagesOptions.find(
        (l) => l.value.toLowerCase() === common
      );
      setParams((p) => {
        p.set("source", newLang?.code);
        return p;
      });
    }
  }, [sourceText]);
  return (
    <div className="flex items-center justify-center md:flex-row gap-3 mt-2 ">
      <Select onChange={handleChangefrom} value={sourceLang}>
        <option>detect language</option>
        {languagesOptions.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.value}
          </option>
        ))}
      </Select>
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={toggleDirection}
      >
        <FaArrowRightArrowLeft size="20px" />
      </div>
      <Select onChange={handleChangeTo} value={targetLang}>
        {languagesOptions.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.value}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default LanguageInput;

const languagesOptions = [
  { value: "English", code: "en" },
  { value: "Tibetan", code: "bo" },
  { value: "French", code: "fr" },
  { value: "Chinese", code: "zh" },
  { value: "Spanish", code: "es" },
  { value: "German", code: "de" },
  { value: "Italian", code: "it" },
  { value: "Japanese", code: "ja" },
  { value: "Korean", code: "ko" },
  { value: "Russian", code: "ru" },
  { value: "Portuguese", code: "pt" },
  { value: "Turkish", code: "tr" },
  { value: "Hindi", code: "hi" },
  { value: "Swedish", code: "sv" },
  { value: "Norwegian", code: "no" },
  { value: "Estonian", code: "et" },
  { value: "Latvian", code: "lv" },
  { value: "Lithuanian", code: "lt" },
  { value: "Hungarian", code: "hu" },
  { value: "Polish", code: "pl" },
  { value: "Greek", code: "el" },
];

function findFirstCommonElement(array1, array2) {
  for (let element of array1) {
    if (array2.includes(element)) {
      return element;
    }
  }
  return undefined; // Or return null, or any other value to indicate no common elements were found.
}
