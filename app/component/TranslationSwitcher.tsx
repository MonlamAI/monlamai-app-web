import { useLitteraMethods } from "@assembless/react-littera";
import React, { useEffect } from "react";
import { IoMdGlobe } from "react-icons/io";
import { translationCodes } from "./hooks/useLitteraTranslation";
import useLocalStorage from "./hooks/useLocaleStorage";

type LanguageType = {
  code: string;
  name: string;
};

function TranslationSwitcher() {
  const [current, setCurrent] = useLocalStorage("language", "bo_TI");

  const methods = useLitteraMethods();

  useEffect(() => {
    if (current === "bo_TI") methods.setLocale("bo_TI");
    if (current === "en_US") methods.setLocale("en_US");
  }, []);

  const SwitchLanguage = () => {
    const code = current === "bo_TI" ? "en_US" : "bo_TI";
    setCurrent(code);
    setCurrent(code);
    methods.setLocale(code);
  };

  return (
    <div onClick={SwitchLanguage}>
      {current === "en_US" && (
        <span className="font-monlam rounded-full ">བོདཡིག</span>
      )}
      {current === "bo_TI" && (
        <span className="font-inter rounded-full ">English</span>
      )}
    </div>
  );
}

export default TranslationSwitcher;
