import useLocalStorage from "./useLocaleStorage";

export const useLocale = () => {
  const [current, setCurrent] = useLocalStorage("language", "bo_TI");
  const locale = current === "bo_TI" ? "en_US" : "bo_TI";
  const isEnglish = current === "en_US";
  return { locale, isEnglish };
};
