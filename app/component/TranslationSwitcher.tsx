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
  const [isOpen, setIsOpen] = React.useState(false);
  const [current, setCurrent] = useLocalStorage("language", "bo_TI");

  const LANGUAGE_SELECTOR_ID = React.useId();

  const methods = useLitteraMethods();

  const selectedLanguage: LanguageType = translationCodes.find(
    (l) => l.code === current
  ) as LanguageType;

  useEffect(() => {
    if (current === "bo_TI") methods.setLocale("bo_TI");
    if (current === "en_US") methods.setLocale("en_US");
  }, []);

  const handleLanguageChange = (code: string) => {
    setCurrent(code);
    methods.setLocale(code);
    setIsOpen(false);
  };

  return (
    <div className="relative z-20 m-auto">
      <IoMdGlobe
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer text-2xl hover:text-blue-300 transition-all duration-150 "
        id={LANGUAGE_SELECTOR_ID}
      />
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white dark:bg-slate-700 ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={LANGUAGE_SELECTOR_ID}
        >
          <div className="py-1 flex flex-col" role="none">
            {translationCodes.map((language, index) => {
              return (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`${
                    selectedLanguage.code === language.code
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-gray-100"
                      : "text-gray-700 dark:text-gray-300"
                  }   px-4 py-2 text-sm text-start items-center inline-flex hover:bg-gray-100 ${
                    index % 2 === 0 ? "rounded-r" : "rounded-l"
                  }`}
                  role="menuitem"
                >
                  <span
                    className="truncate leading-[normal]"
                    style={{
                      fontSize: language.code === "en_US" ? "16px" : "18px",
                    }}
                  >
                    {language.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default TranslationSwitcher;
