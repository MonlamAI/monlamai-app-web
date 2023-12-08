import { useLitteraMethods } from "@assembless/react-littera";
import React, { useEffect } from "react";

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
    <div className="relative z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        id={LANGUAGE_SELECTOR_ID}
        aria-expanded={isOpen}
      >
        {selectedLanguage.name}
        <svg
          className="-me-1 ms-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
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
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700"
                  }   px-4 py-2 text-sm text-start items-center inline-flex hover:bg-gray-100 ${
                    index % 2 === 0 ? "rounded-r" : "rounded-l"
                  }`}
                  role="menuitem"
                >
                  <span className="truncate leading-[normal]">
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
