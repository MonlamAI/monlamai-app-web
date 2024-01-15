import { useLitteraMethods } from "@assembless/react-littera";
import React, { useEffect } from "react";
import useLocalStorage from "./hooks/useLocaleStorage";

function TranslationSwitcher() {
  const [current, setCurrent] = useLocalStorage("language", "bo_TI");

  const methods = useLitteraMethods();

  useEffect(() => {
    if (current === "bo_TI") methods.setLocale("bo_TI");
    if (current === "en_US") methods.setLocale("en_US");
  }, []);

  const SwitchLanguage = () => {
    const isTibetan = current === "bo_TI";
    const code = isTibetan ? "en_US" : "bo_TI";
    setCurrent(code);
    setCurrent(code);
    methods.setLocale(code);
    var root = document.querySelector(":root");
    let fontsize = isTibetan ? "16px" : "15px";
    root.style.setProperty("--fontsize", fontsize);
  };

  return (
    <div onClick={SwitchLanguage} className="cursor-pointer">
      {current === "en_US" && (
        <span className="font-monlam rounded-full ">བོདཡིག</span>
      )}
      {current === "bo_TI" && (
        <span className="font-poppins rounded-full ">English</span>
      )}
    </div>
  );
}

export default TranslationSwitcher;
