import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";

type useTranslateType = {
  target: string;
  text: string;
  data:string;
  setData: (data: string) => void;
};

const useTranslate = ({ target, text,data,setData }: useTranslateType) => {
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { url, token } = useLoaderData();
  const controller = new AbortController();
   function trigger(){
    
    if (!text) {
      // Avoid fetching if text is empty or not provided
      setData('');
      setError('Text is required for translation.');
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setDone(false);
      setError(null);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            inputs: `<2${target}>${text}`,
            parameters: {
              max_new_tokens: 256,
            },
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        await handleResponse(response);
      } catch (error) {
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
  const contentType = response.headers.get("Content-Type");
  let chunk="";
  if (contentType && contentType.includes("application/json")) {
    // Handle JSON response
    const jsonResponse = await response.json();
    setData(jsonResponse[0].generated_text);
  } else if (contentType && contentType.includes("text/event-stream")) {
    // Handle streaming response using asynchronous iterator
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    let streamData = "";
    while(true){

      const { done, value } = await reader.read();
      if(done) break;
      chunk='';
      chunk = value.replace(/^data:/, "").replace(/\s+/g, '')
      
      try{
        streamData= JSON.parse(chunk).token.text;
      }catch(e){
        console.log(e);
      }
        
        setData(p=>
          {

           return p+streamData.replace('</s>','')
          });
    }

   
  }
}


  return { data, isLoading, error, done,trigger };
};

export default useTranslate;
