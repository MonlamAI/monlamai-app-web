import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { resetFetcher } from "~/component/utils/resetFetcher";
import { useSearchParams } from "@remix-run/react";

const langLabels = {
  bo: "བོད་སྐད།",
  en: "English",
};

function LanguageSwitcher({ likefetcher, setSourceText, data }) {
  const [isRotated, setIsRotated] = useState(false);
  const [params, setParams] = useSearchParams();
  const sourceLang = params.get("source") || "en";
  const targetLang = params.get("target") || "bo";
  const handleLangSwitch = () => {
    resetFetcher(likefetcher);
    setSourceText(data);
    setIsRotated(!isRotated);
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
          sourceLang == "en" && "font-poppins text-xl"
        } ${sourceLang == "bo" && "text-lg leading-loose font-monlam"}`}
      >
        {langLabels[sourceLang]}
      </div>

      <motion.button
        className="group flex items-center justify-center text-center font-medium relative focus:z-10 focus:outline-none text-white bg-primary border border-transparent enabled:hover:bg-primary-hover focus:ring-primary dark:bg-primary dark:enabled:hover:bg-primary-hover dark:focus:ring-primary rounded-full focus:ring-2 px-2"
        onClick={handleLangSwitch}
        initial={{ rotate: 0 }}
        animate={{ rotate: isRotated ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <FaArrowRightArrowLeft size="20px" />
      </motion.button>

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
