import { MdDeleteForever } from "react-icons/md";
import { Progress } from "./Progress";
import { FaDownload } from "react-icons/fa";
import timeSince from "./utils/timeSince";
import { useFetcher } from "@remix-run/react";
import AudioToggle from "./AudioToggle";

export function EachInference({
  inference,
  progress,
}: {
  inference: any;
  progress: any;
}) {
  const deleteFetcher = useFetcher();
  let model = inference.model as "mt" | "ocr" | "stt" | "tts";
  let filename = inference.input
    ?.split(`/${model.toUpperCase()}/input/`)[1]
    ?.split("-")
    ?.slice(1)
    ?.join("-");
  let updatedAt = new Date(inference.updatedAt);
  let outputURL = inference.output;
  let isComplete = !!outputURL;
  let isError = outputURL?.startsWith("error: ");
  function deleteHandler() {
    deleteFetcher.submit(
      {},
      {
        method: "DELETE",
        action: "/api/inference/" + inference?.id,
      }
    );
  }
  return (
    <div className="text-black dark:text-white border-b border-b-neutral-200 py-1 px-2  flex  justify-between items-center">
      <div className="flex gap-2">
        {model === "tts" && <AudioToggle output={outputURL} />}
        <div>
          <span className="truncate">{decodeURIComponent(filename)}</span>
          <span className="text-gray-500 text-xs block">
            {updatedAt ? timeSince(updatedAt) : ""}
          </span>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        {isError ? (
          <span className="text-red-500">Error</span>
        ) : isComplete ? (
          <a
            href={outputURL}
            className="text-secondary-500  hover:text-secondary-700 dark:text-primary-500  dark:hover:text-primary-700 transition duration-150 ease-in-out"
          >
            <FaDownload />
          </a>
        ) : (
          <Progress progress={progress} inferenceId={inference?.id} />
        )}
        <button onClick={deleteHandler} className=" hover:text-red-400">
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
}
