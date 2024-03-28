import { useFetcher, useLoaderData, useRevalidator } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import timeSince from "~/component/utils/timeSince";

let interval;

function EachInference({ inference }: any) {
  const { fileUploadUrl } = useLoaderData();
  const [isProgressEmpty, setIsProgressEmpty] = useState(false);
  const [progress, setProgress] = useState(0);
  const revalidator = useRevalidator();

  const deleteFetcher = useFetcher();
  let filename = inference.input;
  let displayname = filename.includes("/OCR/input/")
    ? filename.split("/OCR/input/")[1]
    : filename;
  let updatedAt = new Date(inference.updatedAt);
  let outputURL = inference.output;
  let isComplete = !!outputURL;

  async function fetchJobProgress() {
    try {
      let res = await fetch(fileUploadUrl + `/ocr/status/${inference.jobId}`);
      let data = await res.json();
      let progress = data?.job?.progress;
      if (Object.keys(data).length === 0) {
        setIsProgressEmpty(true);
      } else {
        if (progress) {
          setProgress(progress);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

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

  useEffect(() => {
    if (!isComplete && progress < 100) {
      interval = setInterval(() => {
        fetchJobProgress(); // Assuming this function updates the 'progress' state
      }, 500);
    }
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isProgressEmpty) {
      setTimeout(() => {
        revalidator.revalidate();
      }, 2000);
    }
    if (isProgressEmpty && interval) {
      clearInterval(interval);
    }
  }, [isProgressEmpty]);

  async function deleteHandler() {
    await handleCancelJob();
    deleteFetcher.submit(
      { id: inference.id },
      {
        method: "DELETE",
        action: "/testupload",
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
          {truncateString(decodeURIComponent(displayname), 40)}
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
          <span>{progress !== 0 && progress}</span>
        )}
        <button onClick={deleteHandler} className=" hover:text-red-400">
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
}

export default EachInference;
