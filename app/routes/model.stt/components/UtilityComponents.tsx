import { useFetcher, useLoaderData, useRevalidator } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import useSocket from "~/component/hooks/useSocket";
import timeSince from "~/component/utils/timeSince";

export function InferenceListSTT() {
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
  let filename = inference.input?.split("/STT/input/")[1]?.split("-")[1];
  let updatedAt = new Date(inference.updatedAt);
  let outputURL = inference.output;
  let isComplete = !!outputURL;

  function deleteHandler() {
    deleteFetcher.submit(
      { id: inference.id },
      {
        method: "DELETE",
        action: "/mtFileUpload",
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
        {isComplete ? (
          <a
            href={outputURL}
            className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
          >
            <FaDownload />
          </a>
        ) : (
          <Progress inference={inference} />
        )}
        <button onClick={deleteHandler} className=" hover:text-red-400">
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
