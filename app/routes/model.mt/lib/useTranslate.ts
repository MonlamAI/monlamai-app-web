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
  csrfToken: string;
};

function handleEventStream(
  text: string,
  direction: string,
  onData: (data: string) => void,
  enable_replacement_mt: boolean,
  csrfToken: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const eventSource = new EventSource(
      `/api/translation/stream?text=${encodeURIComponent(
        text
      )}&target=${encodeURIComponent(direction)}&token=${csrfToken}`
    );

    eventSource.onmessage = (event) => {
      let data = JSON.parse(event.data);

      if (data?.generated_text) {
        let text = data.generated_text;
        onData(text);
        eventSource.close();
        resolve(); // Resolve the promise when data is received
      } else {
        let content = data?.token?.text;
        if (content) {
          onData((p) => {
            let newChunk = p + content.replace("</s>", "");
            return enable_replacement_mt
              ? en_bo_tibetan_replaces(newChunk)
              : newChunk;
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

const useTranslate = ({
  target,
  text,
  data,
  setData,
  csrfToken,
}: useTranslateType) => {
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
        await handleEventStream(
          input,
          target,
          setData,
          enable_replacement_mt,
          csrfToken
        );
      } catch (error) {
        setError(error.message);
      } finally {
        const endTime = performance.now(); // Record end time
        setResponseTime(endTime - startTime); // Calculate response time
        setIsLoading(false);
        setDone(true);
      }
    };

    await fetchData();
  };

  return { data, isLoading, error, done, trigger, responseTime };
};

export default useTranslate;
