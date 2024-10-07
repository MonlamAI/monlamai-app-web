import React from "react";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";

function HeaderComponent({ model }: { model: string }) {
  const { translation, locale } = uselitteraTranlation();
  let isEnglish = locale === "en_US";
  let inputHeader =
    model === "TTS" ? "text" : model === "STT" ? "recording" : "image";
  let outputHeader = model === "TTS" ? "audio" : "transcript";
  return (
    <div
      className={`bg-white text-light_text-secondary dark:text-dark_text-secondary border-b lig dark:border-[--card-border] border-dark_text-secondary dark:bg-[--card-bg] flex items-center md:flex-row gap-14 py-3 px-5 text-base font-normal ${
        !isEnglish ? "font-monlam" : "font-poppins"
      }`}
    >
      <div className="flex-1"> {translation[inputHeader]}</div>
      <div className="flex-1">{translation[outputHeader]}</div>
    </div>
  );
}

export default HeaderComponent;
