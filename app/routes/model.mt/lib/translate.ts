import { API_ERROR_MESSAGE } from "~/helper/const";

type Lang = "bo" | "en";
type argType = {
  text: string;
  sourceLang: Lang;
  direction: string;
  url: string;
  token: string;
  setData: (t: string) => void;
  signal: any;
  setIsLoading: (t: boolean) => void;
};
export async function translate({
  text,
  sourceLang,
  direction,
  url,
  token,
  setData,
  signal,
  setIsLoading,
}: argType) {
  if (direction !== "" && direction) {
    let newdirection = "<2" + direction.toLowerCase() + ">";
    text = newdirection + text;
  } else if (sourceLang === "bo") {
    text = "<2en>" + text;
  } else if (sourceLang === "en") {
    text = "<2bo>" + text;
  }
  const data = { inputs: text };
  let response;
  const startTime = Date.now(); // Start time for measuring response time
  let receivedData = "";

  let modelToken = token;
  if (!modelToken) throw new Error(API_ERROR_MESSAGE);

  try {
    setIsLoading(true);
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: modelToken,
      },
      body: JSON.stringify(data),
      signal,
    });
    if (!response.ok) {
      throw new Error(API_ERROR_MESSAGE);
    }

    let response_data = await postRequestAndHandleResponse(response, setData);
    receivedData = response_data;
  } catch (e) {
    // setError(API_ERROR_MESSAGE);
  } finally {
    setIsLoading(false);
  }

  const translation = receivedData;
  const responseTime = Date.now() - startTime; // Calculate response time

  const disclaimer = "";
  return {
    translation: sourceLang === "en" ? translation : translation,
    disclaimer,
    responseTime: responseTime, // Include response time in milliseconds
  };
}

async function postRequestAndHandleResponse(response, contentSetter) {
  try {
    // Make a POST request to the API

    // Check the content type of the response
    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      // Handle JSON response
      let data = await response.json();
      return data[0].generated_text;
    } else if (contentType && contentType.includes("text")) {
      // Handle text stream
      const reader = response.body.getReader();
      let translation = "";

      // Read the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunkText = new TextDecoder("utf-8")
          .decode(value)
          .replace(/^data:/, "");
        const chunkData = JSON.parse(chunkText);
        if (chunkData?.token.text) {
          contentSetter((p) => p + chunkData?.token.text);
        }
      }

      return translation;
    } else {
      throw new Error("Unsupported content type");
    }
  } catch (error) {
    console.error("Error in postRequestAndHandleResponse:", error);
    throw error;
  }
}
