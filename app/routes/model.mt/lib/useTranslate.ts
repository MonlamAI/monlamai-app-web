import { useFetcher } from "@remix-run/react";
import { useState, useEffect } from "react";

type useTranslateType = {
  url: string;
  token: string;
  target: string;
  text: string;
};

const useTranslate = ({ url, token, target, text }: useTranslateType) => {
  const [data, setData] = useState("");
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);




  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      if (text === "" || !text) return null;
      setIsLoading(true);
      setDone(false);
      setError(null);
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ inputs: "<2" + target + ">" + text }),
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        await handleResponse(response, setData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
        setDone(true);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url, token, text]); // Include all dependencies
  


  return { data, isLoading, error, done };
};

export default useTranslate;

async function handleResponse(response, setData) {
  const contentType = response.headers.get("Content-Type");

  if (contentType && contentType.includes("application/json")) {
    // Handle JSON response
    let data = await response.json();
    setData(data[0].generated_text);
    return null;
  }
  const reader = response.body.getReader();

  try {
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
        if (chunkData?.token.text === "</s>") return null;
        setData((p) => p + chunkData?.token.text);
      }
    }
  } catch (error) {
    throw new Error("Error reading stream");
  }
}
