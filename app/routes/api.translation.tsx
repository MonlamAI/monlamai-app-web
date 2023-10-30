import { LoaderFunctionArgs, defer } from "@remix-run/node";
import {
  bo_en_english_replaces,
  bo_en_tibetan_replaces,
  en_bo_english_replaces,
  en_bo_tibetan_replaces,
} from "~/component/utils/replace.server";
import { fetchGPTData } from "~/services/fetchGPTData.server";

function parseWhenEnglishResponse(responseText: string) {
  let result = responseText.split("\n");

  result = result.map((item) => {
    let result = item.replace("event: message", "");
    result = result.replace("data: ", "");
    result = result.replace(/(^\'|\'$)/g, "");
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
      console.log(disclaimer, translationOutput);
      return {
        translation: translationOutput.trim(),
        disclaimer: disclaimer.trim(),
      };
    }
  }

  // Handle invalid response format
  return null;
}

async function translate(text: String, sourceLang: String, targetLang: String) {
  const url = "https://dharmamitra.org/api/translation/";
  const data = {
    input_sentence: text,
    level_of_explanation: 0,
    language: `${sourceLang}-${targetLang}`,
    model: "NO",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return { error: `HTTP error! Status: ${response.status}` };
    }

    const responseData = await response.text();
    const parsedResponse = parseApiResponse(responseData);

    if (!parsedResponse) {
      return { error: "ཡི་གེ་མང་བ་ཞིག་སྐྱོན་རོགས། [input too short]" };
    }
    const { translation, disclaimer } = parsedResponse;

    let parseEnglishRes = parseWhenEnglishResponse(translation);
    if (parseEnglishRes.includes("Your request is a little bit too short.")) {
      return { error: "ཡི་གེ་མང་བ་ཞིག་སྐྱོན་རོགས། [input too short]" };
    }
    return {
      translation:
        sourceLang === "en"
          ? en_bo_tibetan_replaces(translation)
          : bo_en_english_replaces(parseEnglishRes),
      disclaimer,
    };
  } catch (error) {
    console.error("Error:", error);
  }
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang");
  let source = url.searchParams.get("q");
  let targetLang = lang === "en" ? "bo" : "en";

  if (lang === "en") {
    source = en_bo_english_replaces(source!);
    let prompt = `replace all the abbreviations with full form and preserve newlines, "${source}"  `;
    source = await fetchGPTData(prompt);
  }
  if (lang === "bo") {
    source = bo_en_tibetan_replaces(source!);
  }

  if (source) {
    let result = translate(source, lang, targetLang);

    return defer({
      translation: result,
    });
  }
};
