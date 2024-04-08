import { useSearchParams } from "@remix-run/react";
import { Button, Select } from "flowbite-react";
import React, { useEffect } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { resetFetcher } from "~/component/utils/resetFetcher";
import LanguageDetect from "languagedetect";
import { languagesOptions } from "~/helper/const";

const lngDetector = new LanguageDetect();

// Utility function to check if the input is Tibetan
function isTibetan(input) {
  const tibetanRegex = /[\u0F00-\u0FFF]+/;
  return tibetanRegex.test(input);
}

// Finds the first common element between two arrays
function findFirstCommonElement(array1, array2) {
  for (let element of array1) {
    if (array2.includes(element)) {
      return element;
    }
  }
  return undefined;
}

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

  function handleChange(event, type) {
    const lang = event.target.value;
    setParams((prevParams) => {
      prevParams.set(type, lang);
      return prevParams;
    });
  }

  function toggleDirection() {
    resetFetcher(likefetcher);
    setSourceText(data);
    setTranslated("");
    setParams((prevParams) => {
      prevParams.set("source", targetLang);
      prevParams.set("target", sourceLang);
      return prevParams;
    });
  }

  useEffect(() => {
    if (sourceLang === "detect language") {
      detectAndSetLanguage(sourceText);
    }
  }, [sourceText, sourceLang]);
  const detectAndSetLanguage = (text: string) => {
    if (sourceLang !== "detect language") return;

    if (isTibetan(text)) {
      setParams((prevParams) => {
        prevParams.set("source", "bo");
        return prevParams;
      });
      return;
    }

    let detectedLanguages = lngDetector.detect(text);
    let ranked = detectedLanguages.map((l) => l[0]);
    let option = languagesOptions.map((l) => l.value.toLowerCase());
    let common = findFirstCommonElement(ranked, option);

    if (common) {
      let detectedLang = languagesOptions.find(
        (lang) => lang.value.toLowerCase() === common
      );
      setParams((prevParams) => {
        prevParams.set("source", detectedLang?.code || "en");
        return prevParams;
      });
    }
  };

  return (
    <div className="flex items-center justify-center md:flex-row gap-3 mt-2 font-poppins">
      <Select onChange={(e) => handleChange(e, "source")} value={sourceLang}>
        <option value="detect language">Detect</option>
        {languagesOptions.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.value}
          </option>
        ))}
      </Select>

      <Button
        size="sm"
        onClick={toggleDirection}
        className="text-xl font-bold cursor-pointer text-white transition-colors duration-300 ease-in-out px-5"
      >
        <FaArrowRightArrowLeft size="20px" />
      </Button>

      <Select onChange={(e) => handleChange(e, "target")} value={targetLang}>
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
