import { useFetcher, useLoaderData, useRevalidator } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import useSocket from "~/component/hooks/useSocket";
import timeSince from "~/component/utils/timeSince";

function EachInference({ inference }: any) {
  const deleteFetcher = useFetcher();
  let filename = inference.input;
  function removeExtension(filename: string) {
    return filename.replace(/\.[^/.]+$/, "");
  }
  let displayname = removeExtension(
    filename?.split("/OCR/input/")[1]?.split("-")[1]
  );

  let updatedAt = new Date(inference.updatedAt);
  let outputURL = inference.output;
  let isComplete = !!outputURL;
  let { fileUploadUrl } = useLoaderData();
  async function handleCancelJob() {
    try {
      let res = await fetch(fileUploadUrl + `/ocr/cancel/${inference.jobId}`);
      let data = await res.json();
      let message = data?.message;
      return message;
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteHandler() {
    await handleCancelJob();
    deleteFetcher.submit(
      { id: inference.id },
      {
        method: "DELETE",
        action: "/mtFileUpload",
      }
    );
  }
  const truncateString = (str, maxLength, ending = "...") =>
    str.length > maxLength
      ? str.substring(0, maxLength - ending.length) + ending
      : str;

  return (
    <div className="rounded-lg font-poppins  flex  justify-between items-center px-1 mx-2 mb-2 pb-1 border-b-2 border-gray-400">
      <div>
        <span className="text-gray-800 truncate">
          {truncateString(decodeURIComponent(displayname), 40)}{" "}
          <span className="text-xs text-gray-500">ebook</span>
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

export default EachInference;

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
