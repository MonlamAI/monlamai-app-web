// Purpose: Const used in MT

export const CHAR_LIMIT = 2000;
export const MAX_SIZE_SUPPORT = 20; //KB

// Const used in TTS

export const CHAR_LIMIT_TTS = 5000;

//error messages

export const API_ERROR_MESSAGE = "API ERROR";

//predefined Fonts size and family

const englishFontSize = {
  title: "2.4rem",
  h2: "1.125rem",
  text: "1.25rem", //input output text
  body: "1rem",
  button: "1rem",
};

const tibetanFontSize = {
  title: "2rem",
  h2: "1.125rem",
  text: "1.25rem", //input output text
  body: "1rem",
  button: "1rem",
};

export function getFontSize(language: string) {
  if (language === "en") {
    return englishFontSize;
  } else {
    return tibetanFontSize;
  }
}
