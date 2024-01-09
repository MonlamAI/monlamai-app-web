import { LoaderFunctionArgs, defer } from "@remix-run/node";
import {
  bo_en_english_replaces,
  bo_en_tibetan_replaces,
  en_bo_english_replaces,
  en_bo_tibetan_replaces,
} from "~/component/utils/replace.server";
import { fetchGPTData } from "~/services/fetchGPTData.server";
type Lang = "bo" | "en";

async function translate(text: String, sourceLang: Lang, targetLang: Lang) {
  const url =
    "https://rvx0i2sheyjtydoh.us-east-1.aws.endpoints.huggingface.cloud/";

  if (sourceLang === "bo") {
    text = "<2en>" + text;
  }
  if (sourceLang === "en") {
    text = "<2bo>" + text;
  }
  const data = { inputs: text };
  let response;
  let modelToken = process.env?.MT_MODEL_TOKEN;
  if (!modelToken) return { error: "MT API TOKEN MISSING" };
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: modelToken,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return { error: `API Error Try after sometime` };
    }
  } catch (e) {
    return { error: `API Error Try after sometime` };
  }

  const responseData = await response?.json();
  const translation = responseData[0]?.generated_text;
  const disclaimer = "";

  return {
    translation:
      sourceLang === "en"
        ? en_bo_tibetan_replaces(translation)
        : bo_en_english_replaces(translation),
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
