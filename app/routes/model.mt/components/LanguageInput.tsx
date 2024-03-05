import { useSearchParams } from "@remix-run/react";
import { Select } from "flowbite-react";
import React from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { resetFetcher } from "~/component/utils/resetFetcher";

function LanguageInput({ likefetcher, setSourceText, data, setTranslated }) {
  const [params, setParams] = useSearchParams();
  const sourceLang = params.get("source") || "en";
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
  return (
    <div className="flex items-center justify-center md:flex-row gap-3 mt-2 ">
      <Select
        placeholder="eg. fr"
        onChange={handleChangefrom}
        value={sourceLang}
        className="w-full"
      >
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
      <Select
        placeholder="eg. fr"
        onChange={handleChangeTo}
        value={targetLang}
        className="w-full"
      >
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
