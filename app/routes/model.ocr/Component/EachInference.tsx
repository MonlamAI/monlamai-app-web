import { useFetcher, useLoaderData } from "@remix-run/react";
import { FaDownload } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import timeSince from "~/component/utils/timeSince";

function EachInference({ inference }: any) {
  const { fileUploadUrl } = useLoaderData();
  const deleteFetcher = useFetcher();
  let filename = inference.input;
  let updatedAt = new Date(inference.updatedAt);
  let outputURL = inference.output;
  let isComplete = !!outputURL;

  function deleteHandler() {
    deleteFetcher.submit(
      { id: inference.id },
      {
        method: "DELETE",
        action: "/testupload",
      }
    );
  }

  return (
    <div className="rounded-lg font-poppins  flex  justify-between items-center px-1 mx-2 mb-2 pb-1 border-b-2 border-gray-400">
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
          <span>processing</span>
        )}
        <button onClick={deleteHandler} className=" hover:text-red-400">
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
}

export default EachInference;
