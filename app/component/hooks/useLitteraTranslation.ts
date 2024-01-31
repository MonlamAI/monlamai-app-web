import { useLittera, useLitteraMethods } from "@assembless/react-littera";
import en from "~/helper/translation/en.json";
import bo from "~/helper/translation/bo.json";
import { useEffect } from "react";
import useLocalStorage from "./useLocaleStorage";

type translationType = {
  [key: string]: {
    en: string;
    bo: string;
  };
};

export const translationCodes = [
  { code: "en_US", name: "English" },
  { code: "bo_TI", name: "བོད་ཡིག" },
];

export function translationList() {
  let translations: translationType = en;
  for (const key in en) {
    translations = {
      ...translations,
      [key]: {
        en_US: en[key],
        bo_TI: bo.hasOwnProperty(key) ? bo[key] : en[key],
      },
    };
  }
  return translations;
}
export default function uselitteraTranlation() {
  const [current, setCurrent] = useLocalStorage("language", "bo_TI");
  let translations = translationList();
  const { locale } = useLitteraMethods();
  const methods = useLitteraMethods();
  const translation = useLittera(translations);

  useEffect(() => {
    if (current === "bo_TI") methods.setLocale("bo_TI");
    if (current === "en_US") methods.setLocale("en_US");
  }, []);

  const isEnglish = locale === "en_US";
  const isTibetan = locale === "bo_TI";
  return { translation, locale, isEnglish, isTibetan };
}
