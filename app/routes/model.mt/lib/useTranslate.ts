import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { useCallback, useState } from "react";
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
  const [responseTime, setResponseTime] = useState(0);
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { fileUploadUrl } = useLoaderData();
  const controller = new AbortController();
  let trigger = useCallback(triggerfunction, [text]);
  async function triggerfunction() {
    setResponseTime(0);
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
      setData("");

      let replaced = en_bo_english_replaces(text);
      let formData = new FormData();
      let input = enable_replacement_mt ? replaced : text;
      formData.append("input", input);
      formData.append("direction", target);
      const startTime = performance.now();
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
        const endTime = performance.now();
        const duration = endTime - startTime;
        setResponseTime(duration);
        await handleResponse(response);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
        setDone(true);
      }
    };

    await fetchData();
    // Effect dependencies
  }

  async function handleResponse(response) {
    setData("");
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      // Handle JSON response
      const jsonResponse = await response.json();
      setData(jsonResponse[0].generated_text);
    } else if (contentType && contentType.includes("text/event-stream")) {
      const reader = await response.body
        .pipeThrough(new TextDecoderStream("utf-8"))
        .getReader();
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
          throw new Error(e);
        }
      }
    }
  }

  return { data, isLoading, error, done, trigger, responseTime };
};

export default useTranslate;

function parseCustomData(input) {
  let buffer = "";
  // Add the new input to the buffer
  buffer += input;

  // Split the buffer by "data:" to separate each JSON object string
  const entries = buffer.split("data:").filter((entry) => entry.trim() !== "");

  const parsedData = [];
  let newBuffer = "";

  // Process each entry
  for (const entry of entries) {
    try {
      // Attempt to parse the JSON string to an object
      const parsedEntry = JSON.parse(entry);
      parsedData.push(parsedEntry);
    } catch (error) {
      // If parsing fails, keep the unparsed data in the new buffer
      newBuffer += "data:" + entry;
    }
  }

  // Update the buffer with any leftover data that couldn't be parsed
  buffer = newBuffer;

  // Extract stream data and generated text from the parsed entries
  const streamData = parsedData.map((item) => item.token.text).join("");
  const generatedTextEntry = parsedData.find((item) => item.generated_text);

  return {
    streamData,
    generated_text: generatedTextEntry
      ? generatedTextEntry.generated_text
      : null,
  };
}
