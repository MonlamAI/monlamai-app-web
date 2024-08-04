import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { useCallback, useState } from "react";
import {
  en_bo_english_replaces,
  en_bo_tibetan_replaces,
} from "~/component/utils/replace";
import { eng_languagesOptions } from "~/helper/const";

type useTranslateType = {
  target: string;
  text: string;
  data: string;
  setData: (data: string) => void;
};

function handleEventStream(
  text: string,
  direction: string,
  onData: (data: string) => void,
  enable_replacement_mt: boolean
): Promise<void> {
  return new Promise((resolve, reject) => {
    const eventSource = new EventSource(
      `/api/translation/stream?text=${encodeURIComponent(
        text
      )}&target=${encodeURIComponent(direction)}`
    );

    eventSource.onmessage = (event) => {
      let data = JSON.parse(event.data);

      if (data?.generated_text) {
        let text = data?.generated_text;
        let replaced_text = enable_replacement_mt
          ? en_bo_tibetan_replaces(text)
          : text;
        onData(replaced_text);
        eventSource.close();
        resolve(); // Resolve the promise when data is received
      } else {
        let content = data?.token?.text;
        if (content) {
          onData((p) => {
            let newChunk = p + content.replace("</s>", "");
            return newChunk;
          });
        }
      }
    };

    eventSource.onerror = (event) => {
      eventSource.close();
      reject(new Error("EventSource error")); // Reject the promise on error
    };
  });
}

const useTranslate = ({ target, text, data, setData }: useTranslateType) => {
  const { enable_replacement_mt } = useRouteLoaderData("root");
  const [responseTime, setResponseTime] = useState(0);
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const trigger = async () => {
    setResponseTime(0);
    if (!text || !text.trim()) {
      // Avoid fetching if text is empty or not provided
      setData("");
      setError("Please enter some text for translation.");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setDone(false);
      setError(null);
      setData("");
      let replaced = en_bo_english_replaces(text);
      let input = enable_replacement_mt ? replaced : text;

      const startTime = performance.now(); // Record start time
      try {
        await handleEventStream(input, target, setData, enable_replacement_mt);
      } catch (error) {
        setError(error.message);
      } finally {
        const endTime = performance.now(); // Record end time
        setResponseTime(endTime - startTime); // Calculate response time
        setIsLoading(false);
        setDone(true);
      }
    };
    const dharmaapi = async () => {
      setIsLoading(true);
      setDone(false);
      setError(null);
      setData("");
      let replaced = en_bo_english_replaces(text);
      let input = enable_replacement_mt ? replaced : text;

      const startTime = performance.now(); // Record start time
      const dharmaurl = "https://dharmamitra.org/api/translation-no-stream/";
      let target_lang =
        eng_languagesOptions.find((l) => l.code === target)?.name ?? "tibetan";
      const request_data = {
        input_sentence: input,
        input_encoding: "auto",
        target_lang,
      };
      try {
        let data = await fetch(dharmaurl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request_data),
        }).then((res) => res.json());
        if (typeof data === "string") {
          setData(en_bo_tibetan_replaces(data));
        } else {
          alert("translation is not supported for this language");
        }
      } catch (error) {
        alert("language not supported");
        setError(error.message);
      } finally {
        const endTime = performance.now(); // Record end time
        setResponseTime(endTime - startTime); // Calculate response time
        setIsLoading(false);
        setDone(true);
      }
    };

    await dharmaapi();
  };

  return { data, isLoading, error, done, trigger, responseTime };
};

export default useTranslate;
