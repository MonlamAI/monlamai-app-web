import { useFetcher, useSearchParams } from "@remix-run/react";
import { Select } from "flowbite-react";
import { useEffect, useState } from "react";
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

  let beta = ["French", "Chinese", "Hindi"];
  return (
    <div className="bg-white dark:bg-secondary-700 flex items-center  md:flex-row gap-3 mt-2 font-poppins">
      <Select
        onChange={(e) => handleChange(e, "source")}
        value={sourceLang}
        className="flex-1 focus:outline-none selector"
        theme={selectedTheme}
      >
        <option value="detect language">Detect</option>
        {languagesOptions.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.value} {beta.includes(lang.value) ? "(BETA)" : ""}
          </option>
        ))}
      </Select>

      <button
        onClick={toggleDirection}
        className="group flex items-center py-1 justify-center text-center font-medium relative focus:z-10 focus:outline-none text-[#838585] border border-transparent enabled:hover:bg-primary-hover  dark:enabled:hover:bg-primary-hover  rounded-full  px-2"
      >
        <FaArrowRightArrowLeft size="20px" />
      </button>

      <Select
        onChange={(e) => handleChange(e, "target")}
        value={targetLang}
        className="flex-1 focus:outline-none selector"
      >
        {languagesOptions.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.value} {beta.includes(lang.value) ? "(BETA)" : ""}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default LanguageInput;

const selectedTheme = {
  root: {
    base: "flex",
  },
  field: {
    base: "relative w-full",
    input: {
      base: "block w-full overflow-hidden rounded-lg border disabled:cursor-not-allowed disabled:opacity-50",
    },
  },
};
