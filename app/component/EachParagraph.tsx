import { Await, useFetcher } from "@remix-run/react";
import { Suspense, useEffect } from "react";
import { motion } from "framer-motion";
function EachParagraph({
  source,
  lang,
}: {
  source: string;
  lang: "en" | "bo";
}) {
  let fetcher = useFetcher();
  useEffect(() => {
    if (source) {
      let url = "/api/translation?q=" + source + "&lang=" + lang;
      fetcher.load(url);
    }
  }, [source, lang]);
  let data = fetcher.data;
  if (!data)
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
          if (res.error) return <p className="text-red-400">{res.error}</p>;
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
