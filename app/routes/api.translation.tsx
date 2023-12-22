import { LoaderFunctionArgs, defer } from "@remix-run/node";
import {
  bo_en_english_replaces,
  bo_en_tibetan_replaces,
  en_bo_english_replaces,
  en_bo_tibetan_replaces,
} from "~/component/utils/replace.server";
import { fetchGPTData } from "~/services/fetchGPTData.server";
type Lang = "bo" | "en";
function parseWhenEnglishResponse(responseText: string) {
  let result = responseText.split("\n");

  result = result.map((item) => {
    let result = item.replaceAll("event: message", "");
    result = result.replaceAll("data: ", "");
    result = result.replaceAll(/(^\'|\'$)/g, "");
    result = result.replaceAll("<unk>", "");
    return result;
  });
  // let finalResult = result.filter((item) => item !== "");

  return result.join("");
}
function parseWhenTibetanResponse(responseText: string) {
  let result = responseText.split("\n");

  result = result.map((item) => {
    let result = item.replaceAll("event: message", "");
    result = result.replaceAll("data: ", "");
    result = result.replaceAll(/(^\'|\'$)/g, "");
    return result;
  });
  // let finalResult = result.filter((item) => item !== "");

  return result.join("");
}

function parseApiResponse(apiResponse: String) {
  const translationStartIndex = apiResponse.indexOf("data: ") + 7;
  const translationEndIndex = apiResponse.indexOf(
    "<br /><br />",
    translationStartIndex
  );

  if (translationStartIndex !== -1 && translationEndIndex !== -1) {
    const translationOutput = apiResponse.substring(
      translationStartIndex,
      translationEndIndex
    );
    const disclaimerStartIndex = translationEndIndex + 12; // Skip "<br /><br /><small><i>"
    const disclaimerEndIndex = apiResponse.indexOf(
      "</i></small>",
      disclaimerStartIndex
    );

    if (disclaimerStartIndex !== -1 && disclaimerEndIndex !== -1) {
      const disclaimer = apiResponse.substring(
        disclaimerStartIndex,
        disclaimerEndIndex
      );
      return {
        translation: translationOutput.trim(),
        disclaimer: disclaimer.trim(),
      };
    }
  }

  // Handle invalid response format
  return null;
}

async function translate(text: String, sourceLang: Lang, targetLang: Lang) {
  const url = "https://dharmamitra.org/api/translation/";
  const data = {
    input_sentence: text,
    level_of_explanation: 0,
    language: `${sourceLang}-${targetLang}`,
    model: "NO",
  };
  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return { error: `API Error Try after sometime` };
    }
  } catch (e) {
    return { error: `API Error Try after sometime` };
  }

  const responseData = await response?.text();
  const parsedResponse = parseApiResponse(responseData!);

  if (!parsedResponse) {
    return { error: "api responce couldnot be parsed" };
  }
  const { translation, disclaimer } = parsedResponse;

  let parseEnglishRes = parseWhenEnglishResponse(translation);
  let parseTibetanRes = parseWhenTibetanResponse(translation);
  if (parseEnglishRes.includes("Your request is a little bit too short.")) {
    return { error: "ནང་འཇུག་ཡི་གེ་ཉུང་དྲག་འདུག" };
  }
  return {
    translation:
      sourceLang === "en"
        ? en_bo_tibetan_replaces(parseTibetanRes)
        : bo_en_english_replaces(parseEnglishRes),
    disclaimer,
  };
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") as "bo" | "en";
  let source = url.searchParams.get("q");
  let targetLang: Lang = lang === "en" ? "bo" : "en";

  if (lang === "en") {
    source = en_bo_english_replaces(source!);
    let prompt = `replace all the abbreviations with full form and preserve newlines, "${source}"  `;
    try {
      source = await fetchGPTData(prompt);
    } catch (e) {
      console.log("chatGPT Error", e);
    }
  }
  if (lang === "bo") {
    source = bo_en_tibetan_replaces(source!);
  }

  if (source) {
    try {
      let result = translate(source, lang, targetLang);
      return defer({
        translation: result,
      });
    } catch (e) {
      console.log(e);
      return { error: "API is under maintenance right now " };
    }
  }
};
