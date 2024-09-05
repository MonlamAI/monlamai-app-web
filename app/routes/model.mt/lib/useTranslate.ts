import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { useCallback, useState } from "react";
import {
  en_bo_english_replaces,
  en_bo_tibetan_replaces,
} from "~/component/utils/replace";
import { eng_languagesOptions } from "~/helper/const";
import { resetFetcher } from "~/component/utils/resetFetcher";
import { toast } from "react-toastify";

type useTranslateType = {
  target_lang: string;
  source_lang: string;
  text: string;
  data: string;
  setData: (data: string) => void;
  editfetcher: any;
};

function handleEventStream(
  text: string,
  direction: string,
  onData: (data: string) => void
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
        let replaced_text = en_bo_tibetan_replaces(text);
        onData(replaced_text);
        eventSource.close();
        resolve(); // Resolve the promise when data is received
      } else {
        let content = cleanData(data.text);
        if (content) {
          onData((p) => {
            let newChunk = p + content?.replace("</s>", "");
            let replaced_text = en_bo_tibetan_replaces(newChunk);
            return replaced_text;
          });
        }
      }
    };

    eventSource.onerror = (event) => {
      eventSource.close();
      toast("please report us the issue !", {
        position: toast.POSITION.BOTTOM_CENTER,
        closeOnClick: true,
      });
      resolve("done");
    };
  });
}

function cleanData(content) {
  if (!content) return content;

  // Check and remove quotes from the first, second, last, or second-last positions
  if (
    (content[0] === '"' || content[0] === "'") &&
    (content[1] === '"' || content[1] === "'")
  ) {
    content = content.slice(2);
  } else if (content[0] === '"' || content[0] === "'") {
    content = content.slice(1);
  }

  if (
    (content[content.length - 1] === '"' ||
      content[content.length - 1] === "'") &&
    (content[content.length - 2] === '"' || content[content.length - 2] === "'")
  ) {
    content = content.slice(0, -2);
  } else if (
    content[content.length - 1] === '"' ||
    content[content.length - 1] === "'"
  ) {
    content = content.slice(0, -1);
  }

  return content;
}

const useTranslate = ({
  source_lang,
  target_lang,
  text,
  data,
  setData,
  savefetcher,
  editfetcher,
}: useTranslateType) => {
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
      let input = en_bo_english_replaces(text);

      const startTime = performance.now(); // Record start time
      try {
        await handleEventStream(input, target_lang, setData);
      } catch (error) {
        setError(error.message);
      } finally {
        const endTime = performance.now(); // Record end time
        setResponseTime(endTime - startTime); // Calculate response time
        setIsLoading(false);
        savefetcher.submit(
          {
            source: text,
            translation: data,
            responseTime,
            inputLang: source_lang,
            target_lang,
          },
          {
            method: "POST",
          }
        );
        resetFetcher(editfetcher);
        setDone(true);
      }
    };

    await fetchData();
  };

  return { data, isLoading, error, done, trigger, responseTime };
};

export default useTranslate;
