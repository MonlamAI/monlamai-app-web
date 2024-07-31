import { useRouteLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import {
  en_bo_english_replaces,
  en_bo_tibetan_replaces,
} from "~/component/utils/replace";
import { useSocket } from "~/SocketContext";

type useTranslateType = {
  target: string;
  text: string;
  data: string;
  setData: (data: string) => void;
};

const useTranslate = ({ target, text, data, setData }: useTranslateType) => {
  const { enable_replacement_mt } = useRouteLoaderData("root");
  const [responseTime, setResponseTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("translated", (data) => {
      let text = data;
      let replaced_text = enable_replacement_mt
        ? en_bo_tibetan_replaces(text)
        : text;
      setData(replaced_text);
      setIsLoading(false);
      setDone(true);
      const endTime = performance.now();
      setResponseTime(endTime - startTime);
    });
  }, [socket]);

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
      setStartTime(startTime);
      socket?.emit("translate", {
        text: input,
        target,
      });
    };

    await fetchData();
  };

  return { data, isLoading, error, done, trigger, responseTime };
};

export default useTranslate;
