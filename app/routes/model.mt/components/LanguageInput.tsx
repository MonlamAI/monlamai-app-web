import { useFetcher, useSearchParams } from "@remix-run/react";
import { Select, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { resetFetcher } from "~/component/utils/resetFetcher";
import LanguageDetect from "languagedetect";
import { eng_languagesOptions, tib_languageOptions } from "~/helper/const";
import { GoArrowSwitch } from "react-icons/go";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";

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

function getLanguageFromOption(text, array2) {
  let language = text.includes("zh") ? "zh" : text;
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
}) {
  const [params, setParams] = useSearchParams();
  const sourceLang = params.get("source") || "detect language";
  const targetLang = params.get("target") || "bo";
  const [isRotated, setIsRotated] = useState(false);
  const { submit, data: fetcherData } = useFetcher();
  const { isTibetan: isTib } = uselitteraTranlation();
  const languagesOptions = isTib ? tib_languageOptions : eng_languagesOptions;
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

  // Debounced function to handle input changes
  const detectLanguage = (text: string) => {
    submit(
      {
        inputText: text,
      },
      {
        method: "POST",
        action: "/api/detectLanguage",
      }
    );
  };

  useEffect(() => {
    if (fetcherData?.info) {
      detectAndSetLanguage(sourceText);
    } else if (fetcherData) {
      setLanguage(fetcherData.language);
    }
  }, [fetcherData]);

  useEffect(() => {
    if (sourceLang === "detect language" && sourceText !== "") {
      detectLanguage(sourceText);
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
    } else {
      setParams((prevParams) => {
        prevParams.set("source", "en");
        return prevParams;
      });
    }
  };

  const setLanguage = (detectedLanguage) => {
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
  let optionClass = "bg-white dark:bg-secondary-700 text-black dark:text-white";
  let beta = [
    "French",
    "Chinese",
    "Hindi",
    "ཕ་རཱན་སིའི་",
    "རྒྱ་ཡིག",
    "ཧིན་དི།",
  ];
  return (
    <div
      className={`${
        isTib ? "font-monlam text-base" : "font-poppins"
      } bg-white border-b py-1 px-2 font-normal  dark:border-light_text-secondary border-dark_text-secondary  dark:bg-secondary-700 flex  items-center  md:flex-row gap-3  `}
    >
      <div className="flex-1 ">
        <Select
          onChange={(e) => handleChange(e, "source")}
          value={sourceLang}
          className="selectHeader w-fit "
        >
          <option
            value="detect language"
            className={optionClass + "font-poppins"}
          >
            Detect
          </option>
          {languagesOptions.map((lang) => (
            <option key={lang.code} value={lang.code} className={optionClass}>
              {lang.value} {beta.includes(lang.value) ? "(BETA)" : ""}
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
        >
          {languagesOptions.map((lang) => (
            <option key={lang.code} value={lang.code} className={optionClass}>
              {lang.value} {beta.includes(lang.value) ? "(BETA)" : ""}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default LanguageInput;
