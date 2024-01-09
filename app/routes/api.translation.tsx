import { LoaderFunctionArgs, defer } from "@remix-run/node";
import {
  bo_en_english_replaces,
  bo_en_tibetan_replaces,
  en_bo_english_replaces,
  en_bo_tibetan_replaces,
} from "~/component/utils/replace.server";
import { saveInference } from "~/modal/inference";
import { getUser } from "~/modal/user";
import { auth } from "~/services/auth.server";
import { fetchGPTData } from "~/services/fetchGPTData.server";
type Lang = "bo" | "en";

export async function translate(
  text: String,
  sourceLang: Lang,
  targetLang: Lang
) {
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
  const startTime = Date.now(); // Start time for measuring response time

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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",
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

  const responseTime = Date.now() - startTime; // Calculate response time

  const disclaimer = "";

  return {
    translation:
      sourceLang === "en"
        ? en_bo_tibetan_replaces(translation)
        : bo_en_english_replaces(translation),
    disclaimer,
    responseTime: responseTime, // Include response time in milliseconds
  };
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  let user = await getUser(userdata?._json.email);

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
      let result = await translate(source, lang, targetLang);
      let responseTime = result.responseTime;
      console.log(
        "inference data",
        user?.id,
        source,
        result.translation,
        responseTime
      );
      // if (result.translation) console.log(result.translation);
      // save the data to the database
      const inferenceData = await saveInference({
        userId: user?.id,
        model: "mt",
        input: source,
        output: result.translation,
        responseTime: responseTime,
      });
      return defer({
        translation: result,
        inferenceData: inferenceData,
      });
    } catch (e) {
      console.log(e);
      return { error: "API is under maintenance right now " };
    }
  }
};
