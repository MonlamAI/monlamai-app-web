import { useSearchParams } from "@remix-run/react";
import React from "react";

function LanguageInput() {
  const [param, setParam] = useSearchParams();
  let target_lang = param.get("target") || "bo";
  let source_lang = param.get("source") || "en";
  return (
    <div className="flex flex-col md:flex-row gap-2 mt-2 ">
      <span className="mt-2">Translate into </span>
      <input
        value={target_lang}
        onChange={(e) =>
          setParam((p) => {
            p.set("direction", e.target.value);
            return p;
          })
        }
        placeholder="eg. fr"
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
}

export default LanguageInput;
