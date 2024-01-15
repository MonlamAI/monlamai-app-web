import { useLitteraMethods } from "@assembless/react-littera";
import useLocalStorage from "./useLocaleStorage";
import { useEffect } from "react";
import uselitteraTranlation from "./useLitteraTranslation";

export const useLocale = () => {
  const [current, setCurrent] = useLocalStorage("language", "bo_TI");
  const locale = current === "bo_TI" ? "en_US" : "bo_TI";
  const isEnglish = current === "en_US";
  const methods = useLitteraMethods();
  const { translation } = uselitteraTranlation();
  useEffect(() => {
    if (isEnglish) {
      methods.setLocale("en_US");
    } else {
      methods.setLocale("bo_TI");
    }
    console.log(current);
    var root = document.querySelector(":root");
    let fontsize = isEnglish ? "16px" : "15px";
    root.style.setProperty("--fontsize", fontsize);
  }, [current]);

  return { locale, isEnglish, translation };
};
