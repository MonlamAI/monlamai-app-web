import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { resetFetcher } from "~/component/utils/resetFetcher";
import { useSearchParams } from "@remix-run/react";
import { Tooltip } from "flowbite-react";
const langLabels = {
  bo: "བོད་སྐད།",
  en: "English",
};

function LanguageSwitcher({ likefetcher, setSourceText, data, setTranslated }) {
  const [isRotated, setIsRotated] = useState(false);
  const [params, setParams] = useSearchParams();
  const sourceLang = params.get("source") || "en";
  const targetLang = params.get("target") || "bo";
  const handleLangSwitch = () => {
    resetFetcher(likefetcher);
    setSourceText(data);
    setIsRotated(!isRotated);
    setTranslated("");
    setParams((p) => {
      p.set("source", targetLang);
      p.set("target", sourceLang);
      return p;
    });
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <div
        className={`inline-block text-lg text-gray-500 dark:text-gray-300 ${
          sourceLang !== "bo" && "font-poppins text-xl"
        } ${sourceLang == "bo" && "text-lg leading-loose font-monlam"}`}
      >
        {langLabels[sourceLang]}
      </div>
      <Tooltip content="Swap source with target language" placement="top">
        <motion.button
          className="group flex items-center justify-center text-center font-medium relative focus:z-10 focus:outline-none text-white bg-primary border border-transparent enabled:hover:bg-primary-hover focus:ring-primary dark:bg-primary dark:enabled:hover:bg-primary-hover dark:focus:ring-primary rounded-full focus:ring-2 px-2"
          onClick={handleLangSwitch}
          initial={{ rotate: 0 }}
          animate={{ rotate: isRotated ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg aria-hidden="true" className="text-neutral-100">
            <path
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7L20 7M20 7L16 3M20 7L16 11M16 17L4 17M4 17L8 21M4 17L8 13"
            ></path>
          </svg>
        </motion.button>
      </Tooltip>

      <div
        className={`inline-block text-lg text-right text-gray-500 dark:text-gray-300
          ${sourceLang != "en" && "font-poppins text-xl"} ${
          sourceLang != "bo" && "text-lg leading-loose font-monlam"
        }`}
      >
        {langLabels[targetLang]}
      </div>
    </div>
  );
}

export default LanguageSwitcher;
