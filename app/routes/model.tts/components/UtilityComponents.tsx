import { useEffect, useRef, useState } from "react";
import { useFetcher, useLoaderData, useRevalidator } from "@remix-run/react";
import { MdDeleteForever } from "react-icons/md";
import { FaDownload, FaPause, FaPlay } from "react-icons/fa";
import timeSince from "~/component/utils/timeSince";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { Button } from "flowbite-react";
import { IoSend } from "react-icons/io5";
import useSocket from "~/component/hooks/useSocket";
import axios from "axios";

export function InferenceListTts() {
  let { inferences } = useLoaderData();

  if (!inferences) return null;
  return (
    <div className="space-y-2 h-full overflow-auto font-poppins">
      {inferences.map((inference: any) => {
        return <EachInference inference={inference} key={inference.id} />;
      })}
    </div>
  );
}

function EachInference({ inference }: any) {
  const deleteFetcher = useFetcher();
  const [isPlaying, setIsPlaying] = useState(false);
  let filename = inference.input?.split("/TTS/input/")[1]?.split("-")[1];
  let filenameOnly = filename?.split(".")[0] + ".wav";
  let updatedAt = new Date(inference.updatedAt);
  let outputURL = inference.output;
  let isComplete = !!outputURL;
  const audioRef = useRef(null);
  function deleteHandler() {
    deleteFetcher.submit(
      { id: inference.id },
      {
        method: "DELETE",
        action: "/ttsFileUpload",
      }
    );
  }
  function download(filename, url, e) {
    e.preventDefault();
    axios({
      url,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    });
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  let disabled = outputURL === "";
  let isError = outputURL.startsWith("error");
  return (
    <div className="bg-white rounded-lg flex justify-between items-center">
      <div className="flex gap-2 px-1">
        <button
          disabled={disabled}
          onClick={togglePlay}
          className="mr-3 hover:text-blue-700 transition duration-150 ease-in-out disabled:text-gray-400"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <audio
          ref={audioRef}
          src={outputURL}
          onEnded={() => setIsPlaying(false)}
        />
        <div>
          <span className="text-gray-800 truncate">
            {decodeURIComponent(filenameOnly)}
          </span>
          <span className="text-gray-500 text-xs block">
            {updatedAt ? timeSince(updatedAt) : ""}
          </span>
        </div>
      </div>

      <div className="flex gap-5 items-center px-2">
        {isComplete ? (
          <button
            onClick={(e) => download(filenameOnly, outputURL, e)}
            className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
          >
            <FaDownload />
          </button>
        ) : !isError ? (
          <Progress inference={inference} />
        ) : (
          <div className="text-failure-600">error</div>
        )}

        <button onClick={deleteHandler} className=" hover:text-failure-400">
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
}

function Progress({ inference }) {
  const { isConnected, socket, progress } = useSocket(
    inference?.jobId,
    inference?.output
  );
  const revalidator = useRevalidator();
  useEffect(() => {
    if (progress?.progress === "complete" || isConnected) {
      revalidator.revalidate();
    }
  }, [progress]);
  return (
    <div className="text-yellow-500">
      <div>{isConnected ? progress?.progress : "waiting"}</div>
      <div role="status"></div>
    </div>
  );
}

export function TtsSubmitButton({
  selectedTool,
  trigger,
  submitFile,
  charCount,
  CHAR_LIMIT,
  disabled,
}) {
  const { translation, locale } = uselitteraTranlation();
  const isFile = selectedTool === "document";
  const exceedsLimit = charCount > CHAR_LIMIT;

  return (
    <Button
      disabled={!isFile ? exceedsLimit : disabled}
      size="xs"
      title={exceedsLimit ? "Character limit exceeded" : ""}
      onClick={isFile ? submitFile : trigger}
      className={locale !== "bo_TI" ? "font-poppins" : "font-monlam"}
    >
      <IoSend size={18} />
    </Button>
  );
}
