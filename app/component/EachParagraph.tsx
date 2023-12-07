import { Await, useFetcher } from "@remix-run/react";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
function EachParagraph({
  source,
  lang,
}: {
  source: string;
  lang: "en" | "bo";
}) {
  let fetcher = useFetcher();
  const [isloading, setIsLoading] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (source) {
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
      <div role="status" className="max-w-sm animate-pulse">
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
          if (res?.error)
            return (
              <div
                className="text-red-400 text-sm"
                onClick={() => setRetry(retry + 1)}
              >
                ཡང་བསྐྱར་མཚོལ་
              </div>
            );
          return (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {res?.translation}
            </motion.p>
          );
        }}
      </Await>
    </Suspense>
  );
}

export default EachParagraph;
