import { useLittera, useLitteraMethods } from "@assembless/react-littera";
import en from "~/helper/translation/en.json";
import bo from "~/helper/translation/bo.json";

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
  let translations = translationList();
  const { locale } = useLitteraMethods();
  const translation = useLittera(translations);
  return { translation, locale };
}
