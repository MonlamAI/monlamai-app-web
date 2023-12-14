import { Await, useFetcher } from "@remix-run/react";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdDownload } from "react-icons/io";
import { Button } from "flowbite-react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph } from "docx";

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

  const downloadTxtFile = (translation: string) => {
    console.log("translation", translation);
    // Create a Blob from the content
    const blob = new Blob([translation], { type: "text/plain" });
    saveAs(blob, "download.txt");
  };

  const downloadDocxFile = async (translation: string) => {
    console.log("translation", translation);
    const doc = new Document({
      creator: "User name",
      description: "My document",
      title: "My Document",
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: translation,
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "download.docx");
    });
  };

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
                <Button
                  className="p-5 rounded-lg shadow-md"
                  onClick={() =>
                    fileType === "txt"
                      ? downloadTxtFile(res?.translation)
                      : downloadDocxFile(res?.translation)
                  }
                >
                  <div className="flex gap-4">
                    <IoMdDownload size="20px" />
                    Download translation
                  </div>
                </Button>
              </motion.div>
            );
          }
        }}
      </Await>
    </Suspense>
  );
}

export default DownloadDocument;
