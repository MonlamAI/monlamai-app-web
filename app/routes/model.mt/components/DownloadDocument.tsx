import { Await, useFetcher } from "@remix-run/react";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdDownload } from "react-icons/io";
import { Button } from "flowbite-react";
import {
  downloadDocxFile,
  downloadTxtFile,
} from "../../../component/utils/download";

function DownloadDocument({
  source,
  lang,
  fileType,
}: {
  source: string;
  lang: "en" | "bo";
  fileType: "txt" | "docx" | null;
}) {
  let fetcher = useFetcher();
  const [isloading, setIsLoading] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (source) {
      console.log("source", source, fileType);
      setIsLoading(true);
      let url = "/api/translation?q=" + source + "&lang=" + lang;
      fetcher.load(url);
    }
  }, [source, lang, retry]);

  let data = fetcher?.data;
  useEffect(() => {
    if (!data) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [data]);

  if (isloading || !data)
    return (
      <div role="status" className="max-w-sm animate-pulse pt-5">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  return (
    <Suspense fallback={<p>Loading package location...</p>}>
      <Await
        resolve={data?.translation}
        errorElement={<p>Error loading package location!</p>}
      >
        {(res) => {
          if (res?.error) {
            return (
              <div
                className="text-red-400 text-sm pt-5"
                onClick={() => setRetry(retry + 1)}
              >
                ཡང་བསྐྱར་མཚོལ་
              </div>
            );
          } else {
            return (
              <motion.div
                className="pt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {res?.translation.slice(0, 100)}...
                <div className="flex flex-col gap-4 mt-4 text-center">
                  <Button
                    size="sm"
                    className="rounded-lg shadow-md"
                    onClick={() => downloadTxtFile(res?.translation)}
                  >
                    <div className="flex gap-4">
                      <IoMdDownload size="20px" />
                      Download as .txt
                    </div>
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-lg shadow-md"
                    onClick={() => downloadDocxFile(res?.translation)}
                  >
                    <div className="flex gap-4">
                      <IoMdDownload size="20px" />
                      Download as .docx
                    </div>
                  </Button>
                </div>
              </motion.div>
            );
          }
        }}
      </Await>
    </Suspense>
  );
}

export default DownloadDocument;
