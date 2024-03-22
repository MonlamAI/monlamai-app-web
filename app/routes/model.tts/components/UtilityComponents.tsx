import { useEffect, useRef, useState } from "react";
import { useFetcher, useLoaderData, useRevalidator } from "@remix-run/react";
import { MdDeleteForever } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import timeSince from "~/component/utils/timeSince";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { Button } from "flowbite-react";

export function InferenceListTts() {
  let { inferences } = useLoaderData();
  if (!inferences) return null;
  return (
    <div className="space-y-2 max-h-[50vh] overflow-auto font-poppins">
      {inferences.map((inference: any) => {
        return <EachInference inference={inference} key={inference.id} />;
      })}
    </div>
  );
}

function EachInference({ inference }: any) {
  const [progress, setProgress] = useState(0);
  const { fileUploadUrl } = useLoaderData();
  const deleteFetcher = useFetcher();
  let filename = inference.input.split("/TTS/input/")[1].split("-%40-")[1];
  let filenameOnly = filename?.split(".")[0] + ".wav";
  let updatedAt = new Date(inference.updatedAt);
  const revalidator = useRevalidator();
  let outputURL = inference.output;
  let isComplete = !!outputURL;
  async function fetchJobProgress() {
    try {
      let res = await fetch(fileUploadUrl + `/tts/status/${inference.jobId}`);
      let data = await res.json();
      let progress = data?.progress;
      console.log(data);

      if (progress) {
        setProgress(progress);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        revalidator.revalidate();
      }, 2000);
    }
    const interval = setInterval(() => {
      if (progress < 80) {
        fetchJobProgress();
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [progress]);

  function deleteHandler() {
    deleteFetcher.submit(
      { id: inference.id },
      {
        method: "DELETE",
        action: "/ttsFileUpload",
      }
    );
  }

  return (
    <div className="bg-white rounded-lg  flex  justify-between items-center">
      <div>
        <span className="text-gray-800 truncate">
          {decodeURIComponent(filenameOnly)}
        </span>
        <span className="text-gray-500 text-xs block">
          {updatedAt ? timeSince(updatedAt) : ""}
        </span>
      </div>
      <div className="flex gap-5 items-center">
        {isComplete ? (
          <a
            href={outputURL}
            className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
          >
            <FaDownload />
          </a>
        ) : (
          <div className="text-yellow-500">
            <div>{progress}%</div>
            <div role="status"></div>
          </div>
        )}
        <button onClick={deleteHandler} className=" hover:text-red-400">
          <MdDeleteForever />
        </button>
      </div>
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
      {translation.submit}
    </Button>
  );
}
