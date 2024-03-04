import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";

type useTranslateType = {

  target: string;
  text: string;
};

const useTranslate = ({ target, text }: useTranslateType) => {
  const [data, setData] = useState("");
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {url,token}=useLoaderData();

   const triger=()=>{

     
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
          body: JSON.stringify({ inputs: "<2" + target + ">" + text,
          parameters: {
            max_new_tokens: 256
        } }),
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
  
}
  

  return { data,setData, isLoading, error, done,triger };
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
        setData((p) => {
        if(chunkData?.token.text!=='</s>')
        return  p + chunkData?.token.text

        return p
        });
    }
  } catch (error) {
    throw new Error("Error reading stream");
  }
}
