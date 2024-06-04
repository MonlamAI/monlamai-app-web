import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { useState } from "react";
import {
  en_bo_english_replaces,
  en_bo_tibetan_replaces,
} from "~/component/utils/replace";

type useTranslateType = {
  target: string;
  text: string;
  data: string;
  setData: (data: string) => void;
};

const useTranslate = ({ target, text, data, setData }: useTranslateType) => {
  const { enable_replacement_mt } = useRouteLoaderData("root");

  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { fileUploadUrl } = useLoaderData();
  const controller = new AbortController();
  function trigger() {
    if (!text) {
      // Avoid fetching if text is empty or not provided
      setData("");
      setError("Text is required for translation.");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setDone(false);
      setError(null);
      let replaced = en_bo_english_replaces(text);
      let formData = new FormData();
      let input = enable_replacement_mt ? replaced : text;
      formData.append("input", input);
      formData.append("direction", target);
      try {
        let url = fileUploadUrl + "/mt/playground/stream";
        const response = await fetch(url, {
          method: "POST",
          body: formData,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Network response was not ok, status: ${response.status}`
          );
        }

        await handleResponse(response);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
        setDone(true);
      }
    };

    fetchData();
    // Effect dependencies
  }

  async function handleResponse(response) {
    setData("");
    const contentType = response.headers.get("Content-Type");
    let chunk = "";
    if (contentType && contentType.includes("application/json")) {
      // Handle JSON response
      const jsonResponse = await response.json();
      setData(jsonResponse[0].generated_text);
    } else if (contentType && contentType.includes("text/event-stream")) {
      const reader = await response.body
        .pipeThrough(new TextDecoderStream("utf-8"))
        .getReader();
      let streamData = "";
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;
        try {
          let { streamData, generated_text } = parseCustomData(value);

          setData((p) => {
            let newChunk = !!generated_text
              ? generated_text
              : p + streamData.replace("</s>", "");
            return enable_replacement_mt
              ? en_bo_tibetan_replaces(newChunk)
              : newChunk;
          });
        } catch (e) {
          console.log(chunk);
        }
      }
    }
  }

  return { data, isLoading, error, done, trigger };
};

export default useTranslate;

function parseCustomData(input) {
  // Split the input by "data:" to separate each JSON object string
  const entries = input.split("data:").filter((entry) => entry.trim() !== "");
  // Map each entry to a parsed JSON object
  const parsedData = entries
    .map((entry) => {
      try {
        // Parse the JSON string to an object
        return JSON.parse(entry);
      } catch (error) {
        console.error("Error parsing entry:", entry, error);
        return null; // Return null if parsing fails
      }
    })
    .filter((entry) => entry !== null); // Remove any null entries resulting from parsing errors
  let streamData = parsedData.map((item) => item.token.text).join("");
  let generated_text = parsedData.find((item) => item.generated_text);
  return { streamData, generated_text: generated_text?.generated_text };
}
