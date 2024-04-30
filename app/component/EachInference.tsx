import { MdDeleteForever } from "react-icons/md";
import { Progress } from "./Progress";
import { FaDownload } from "react-icons/fa";
import timeSince from "./utils/timeSince";
import { useFetcher } from "@remix-run/react";

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
    ?.split("-")[1];
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
    <div className="bg-white rounded-lg  flex  justify-between items-center">
      <div>
        <span className="text-gray-800 truncate">
          {decodeURIComponent(filename)}
        </span>
        <span className="text-gray-500 text-xs block">
          {updatedAt ? timeSince(updatedAt) : ""}
        </span>
      </div>
      <div className="flex gap-5 items-center">
        {isError ? (
          <span className="text-red-500">Error</span>
        ) : isComplete ? (
          <a
            href={outputURL}
            className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
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
