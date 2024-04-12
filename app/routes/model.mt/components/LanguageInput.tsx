import { useSearchParams } from "@remix-run/react";
import { Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { resetFetcher } from "~/component/utils/resetFetcher";
import LanguageDetect from "languagedetect";
import { languagesOptions } from "~/helper/const";
import { motion } from "framer-motion";

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
  const [isRotated, setIsRotated] = useState(false);

  function setTarget(lang: string) {
    setParams((prevParams) => {
      prevParams.set("target", lang);
      if (lang === "bo") {
        prevParams.set("source", "en");
      }
      if (lang !== "bo") {
        prevParams.set("source", "bo");
      }
      return prevParams;
    });
  }
  function setSource(lang: string) {
    setParams((prevParams) => {
      prevParams.set("source", lang);
      if (lang !== "bo") {
        prevParams.set("target", "bo");
      }
      if (lang === "bo") {
        prevParams.set("target", "en");
      }
      return prevParams;
    });
  }

  function handleChange(e, type) {
    const lang = e.target.value;
    if (type === "target") {
      setTarget(lang);
    } else if (type === "source") {
      setSource(lang);
    }
  }

  function toggleDirection() {
    resetFetcher(likefetcher);
    setSourceText(data);
    setTranslated("");
    setIsRotated(!isRotated);

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
        prevParams.set("target", "en");
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

      <motion.button
        onClick={toggleDirection}
        className="group flex items-center py-1 justify-center text-center font-medium relative focus:z-10 focus:outline-none text-white bg-neutral-800 border border-transparent enabled:hover:bg-primary-hover focus:ring-primary dark:bg-primary-300 dark:enabled:hover:bg-primary-hover dark:focus:ring-primary-700 rounded-full focus:ring-2 px-2"
        transition={{ duration: 0.3 }}
        initial={{ rotate: 0 }}
        animate={{ rotate: isRotated ? 180 : 0 }}
      >
        <FaArrowRightArrowLeft size="20px" />
      </motion.button>

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
