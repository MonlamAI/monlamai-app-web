import { useFetcher, useSearchParams } from "@remix-run/react";
import { Select, Tooltip } from "flowbite-react";
import { useEffect, useState, type ChangeEvent } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { resetFetcher } from "~/component/utils/resetFetcher";
import LanguageDetect from "languagedetect";
import { eng_languagesOptions, tib_languageOptions } from "~/helper/const";
import { GoArrowSwitch } from "react-icons/go";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";

const lngDetector = new LanguageDetect();

// Utility function to check if the input is Tibetan
function isTibetan(input: string) {
  const tibetanRegex = /[\u0F00-\u0FFF]+/;
  return tibetanRegex.test(input);
}

// Map language-detect names to our supported codes
const DETECT_TO_CODE: Record<string, string> = {
  english: "en",
  tibetan: "bo",
  chinese: "zh-new", // default to simplified if unsure
  "traditional chinese": "zh-old",
  "simplified chinese": "zh-new",
  hindi: "hi",
  japanese: "ja",
  french: "fr-new",
  german: "de",
  czech: "cs",
  vietnamese: "vi",
};

// Finds the first common element between two arrays
function findFirstCommonElement(array1: string[], array2: string[]) {
  for (let element of array1) {
    if (array2.includes(element)) {
      return element;
    }
  }
  return undefined;
}

function getLanguageFromOption(text: string, array2: string[]) {
  let language = text?.includes("zh") ? "zh" : text;
  if (array2.includes(language)) {
    return language;
  }
  return "en";
}

function LanguageInput({
  likefetcher,
  sourceText,
  setSourceText,
  data,
  setTranslated,
  detectFetcher,
}: {
  likefetcher: any;
  sourceText: string;
  setSourceText: (text: string) => void;
  data: string;
  setTranslated: (text: string) => void;
  detectFetcher: any;
}) {
  const [params, setParams] = useSearchParams();
  const sourceLang = params.get("source") || "detect language";
  const targetLang = params.get("target") || "bo";
  const [isRotated, setIsRotated] = useState(false);
  const { submit, data: fetcherData, status } = detectFetcher;
  const { isTibetan: isTib, translation } = uselitteraTranlation();
  const languagesOptions = isTib ? tib_languageOptions : eng_languagesOptions;
  function setTarget(lang: string) {
    setParams((prevParams) => {
      prevParams.set("target", lang);
      /*
      // Previously, changing target auto-adjusted source.
      // Keeping for reference, but disabled to avoid unexpected source changes.
      if (lang === "bo") {
        prevParams.set("source", "en");
      }
      if (lang !== "bo") {
        prevParams.set("source", "bo");
      }
      */
      return prevParams;
    });
  }
  function setSource(lang: string) {
    setParams((prevParams) => {
      prevParams.set("source", lang);
      /*
      // Previously, changing source auto-adjusted target.
      // Keeping for reference, but disabled to avoid unexpected target changes.
      if (lang !== "bo") {
        prevParams.set("target", "bo");
      }
      if (lang === "bo") {
        prevParams.set("target", "en");
      }
      */
      return prevParams;
    });
  }

  function handleChange(e: ChangeEvent<HTMLSelectElement>, type: "target" | "source") {
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
      if (sourceLang && sourceLang !== "detect language") {
        prevParams.set("target", sourceLang);
      } else {
        prevParams.set("target", "en");
      }
      return prevParams;
    });
  }

  // Detect language reactively while typing
  useEffect(() => {
    detectAndSetLanguage(sourceText);
  }, [sourceText, sourceLang]);
  // Reset to 'detect language' when input cleared
  useEffect(() => {
    if (sourceText?.trim() === "" && sourceLang !== "detect language") {
      setSource("detect language");
    }
  }, [sourceText, sourceLang]);

  const detectAndSetLanguage = (text: string) => {
    if (sourceLang !== "detect language") return;

    // guard for very short inputs
    if (!text || text.trim().length < 2) return;

    if (isTibetan(text)) {
      setParams((prevParams) => {
        prevParams.set("source", "bo");
        prevParams.set("target", "en");
        return prevParams;
      });
      return;
    }

    // Use detector results -> map to our supported codes
    const supported = new Set(languagesOptions.map((l) => l.code));
    const results = (lngDetector.detect(text, 5) as [string, number][]) || [];
    let picked: string | undefined;
    for (const [name] of results) {
      const code = DETECT_TO_CODE[name.toLowerCase()];
      if (code && supported.has(code)) {
        picked = code;
        break;
      }
    }
    // Heuristics if detector uncertain
    if (!picked) {
      if (/[\u4E00-\u9FFF]/.test(text)) {
        picked = supported.has("zh-new") ? "zh-new" : supported.has("zh-old") ? "zh-old" : "en";
      } else if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) {
        picked = supported.has("ja") ? "ja" : "en";
      } else if (/[\u0900-\u097F]/.test(text)) {
        picked = supported.has("hi") ? "hi" : "en";
      } else if (/[\u010D\u010C]/i.test(text) && supported.has("cs")) {
        picked = "cs";
      } else if (/[\u00C0-\u017F]/.test(text) && supported.has("fr-new")) {
        picked = "fr-new";
      } else {
        picked = "en";
      }
    }
    setParams((prevParams) => {
      prevParams.set("source", picked!);
      return prevParams;
    });
  };

  const setLanguage = (detectedLanguage: string) => {
    if (sourceLang !== "detect language") return;

    if (detectedLanguage == "bo") {
      setParams((prevParams) => {
        prevParams.set("source", "bo");
        prevParams.set("target", "en");
        return prevParams;
      });
      return;
    }

    let option = languagesOptions.map((l) => l.code.toLowerCase());
    let common = getLanguageFromOption(detectedLanguage, option);
    if (common) {
      setParams((prevParams) => {
        prevParams.set("source", common);
        return prevParams;
      });
    }
  };
  let optionClass =
    "language-options bg-white dark:bg-[--card-bg] text-black dark:text-white  ";
  // let beta = ["French", "Chinese", "Hindi","Germen","Japanese","Vietnamese","Germen","Czech", "ཧྥ་རན་སི།", "རྒྱ་ཡིག", "ཧིན་དྷི།"];
  let beta = [""];
  return (
    <div
      className={`${
        isTib ? "font-monlam text-base" : "font-poppins"
      } w-full bg-white border-b py-2 px-3 font-normal  dark:border-[--card-border]  border-dark_text-secondary  dark:bg-[--card-bg] flex  items-center  md:flex-row gap-3  `}
    >
      <div className="flex-1">
        <Select
          onChange={(e) => handleChange(e, "source")}
          value={sourceLang}
          className="selectHeader  w-[160px]"
          style={{ cursor: "pointer" }}
        >
          <option value="detect language" className={optionClass}>
            {translation?.detect}
          </option>
          {languagesOptions.map((lang) => (
            <option key={lang.code} value={lang.code} className={optionClass}>
              {lang.value}{" "}
              {beta.includes(lang.value) ? `(${translation?.beta})` : ""}
            </option>
          ))}
        </Select>
      </div>
      <Tooltip
        content="Swap source with target language"
        placement="top"
        style="light"
        animation="duration-500"
      >
        <button
          onClick={toggleDirection}
          className="group p-1 flex focus:bg-neutral-100 items-center hover:text-neutral-800   justify-center text-center font-medium relative focus:z-10 focus:outline-none text-[#838585] border border-transparent enabled:hover:bg-primary-hover  dark:enabled:hover:bg-primary-hover rounded-md  "
        >
          <div className=" text-neutral-500">
            <GoArrowSwitch size={20} />
          </div>
        </button>
      </Tooltip>
      <div className="flex-1">
        <Select
          onChange={(e) => handleChange(e, "target")}
          value={targetLang}
          className="selectHeader w-fit "
          style={{ cursor: "pointer" }}
        >
          {languagesOptions.map((lang) => (
            <option key={lang.code} value={lang.code} className={optionClass}>
              {lang.value}{" "}
              {beta.includes(lang.value) ? `(${translation?.beta})` : ""}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default LanguageInput;
