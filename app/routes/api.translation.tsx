import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { englishReplaces } from "~/component/utils/replace";
import { fetchGPTData } from "~/services/fetchGPTData.server";

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
    return {
      translation,
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
  if (lang === "en") {
    source = englishReplaces(source!);
    let prompt = `replace all the abbreviations with full form and preserve newlines, "${source}"  `;
    source = await fetchGPTData(prompt);
  }
  if (source) {
    let targetLang = lang === "en" ? "bo" : "en";
    let result = translate(source, lang, targetLang);

    return defer({
      translation: result,
    });
  }
};
