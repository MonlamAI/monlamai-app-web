import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { Button, Card, Spinner, Textarea } from "flowbite-react";
import { useState, useRef } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import CopyToClipboard from "~/component/CopyToClipboard";
import { auth } from "~/services/auth.server";
import ReactionButtons from "~/component/ReactionButtons";
import EachParagraph from "~/component/EachParagraph";
import useDebounce from "~/component/hooks/useDebounceState";
import { motion } from "framer-motion";
import useLocalStorage from "~/component/hooks/useLocaleStorage";
import ErrorMessage from "~/component/ErrorMessage";
import ToolWraper from "~/component/ToolWraper";
const langLabels = {
  bo: "བོད་སྐད།",
  en: "English",
};

const charLimit = 2000;

const boTexts = [
  "བདག་ནི་སྐྱེ་བ་ཐམས་ཅད་དུ།",
  "བསྟན་པ་གསལ་བར་བྱེད་གྱུར་ཅིག",
  "བསྟན་པ་གསལ་བར་མ་ནུས་ནའང་",
];

export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  parentMeta.shift(1);
  return [{ title: "Monlam | ཡིག་སྒྱུར་རིག་ནུས།" }, ...parentMeta];
};
export async function loader({ request }: LoaderFunctionArgs) {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return { user: userdata };
}

export default function Index() {
  const [sourceLang, setSourceLang] = useLocalStorage("inputLang", "en");
  const [targetLang, setTargetLang] = useLocalStorage("outputLang", "bo");
  const [sourceText, setSourceText] = useState("");
  const [isRotated, setIsRotated] = useState(false);
  const debouncedSearchTerm = useDebounce(sourceText, 1000);
  const likefetcher = useFetcher();

  const targetRef = useRef<HTMLDivElement>(null);

  const handleLangSwitch = () => {
    likefetcher.submit(
      {},
      {
        action: "/api/reset_actiondata",
      }
    );
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    setSourceText("");
    setIsRotated(!isRotated);
  };

  let charCount = sourceText?.length;

  let liked = likefetcher.data?.liked;
  let message = likefetcher.data?.message;
  let text_array = debouncedSearchTerm
    ?.split(/\r\n|\r|\n/)
    .filter((item) => item !== "");
  function handleCopy() {
    let nodes = targetRef.current?.childNodes;
    const textContentArray = Array.from(nodes).map((p) => p.textContent);
    let textToCopy = textContentArray.join("\n ");
    navigator.clipboard.writeText(textToCopy);
  }
  return (
    <ToolWraper title="ཡིག་སྒྱུར་རིག་ནུས།">
      <div className="flex justify-between items-center">
        <motion.div
          className={`inline-block w-32 text-lg text-gray-500 ${
            sourceLang == "en" && "font-Inter text-xl"
          } ${sourceLang == "bo" && "text-lg leading-loose"}`}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {langLabels[sourceLang]}
        </motion.div>

        <motion.button
          className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-full focus:ring-2 py-1 px-3"
          onClick={handleLangSwitch}
          initial={{ rotate: 0 }}
          animate={{ rotate: isRotated ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaArrowRightArrowLeft size="20px" />
        </motion.button>

        <motion.div
          className={`inline-block w-32 text-lg text-right text-gray-500
          ${sourceLang != "en" && "font-Inter text-xl"} ${
            sourceLang != "bo" && "text-lg leading-loose"
          }`}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {langLabels[targetLang]}
        </motion.div>
      </div>

      <div className="mt-3 flex flex-col md:flex-row md:h-[55vh] gap-5">
        <Card className="md:w-1/2">
          <div className="w-full flex min-h-[20vh] md:min-h-[40vh] flex-1 overflow-hidden">
            <Textarea
              name="sourceText"
              placeholder="ཡི་གེ་གཏག་རོགས།..."
              className={`w-full bg-slate-50 min-h-full flex-1 p-2 border-0 focus:outline-none focus:ring-transparent  caret-slate-500 placeholder:text-slate-300 placeholder:font-monlam placeholder:text-lg ${
                sourceLang == "en" && "font-Inter text-xl"
              } ${sourceLang == "bo" && "text-lg leading-loose"}`}
              required
              value={sourceText}
              onInput={(e) => {
                setSourceText((prev) => {
                  let value = e.target?.value;
                  if (value?.length <= charLimit) return value;
                  return prev;
                });
              }}
              autoFocus
            />
          </div>
          <Button
            color="gray"
            className="text-slate-500 md:hidden"
            onClick={() => setSourceText("")}
          >
            བསྐྱར་སྒྲིག
          </Button>
          <div className="md:mt-5 flex justify-between items-end">
            {sourceLang && (
              <div className="text-gray-400 text-xs">
                {charCount} / {charLimit}
              </div>
            )}
          </div>
        </Card>

        <Card className="md:w-1/2">
          <div className="w-full min-h-[20vh] md:min-h-[40vh] p-2 text-black bg-slate-50 rounded-lg overflow-auto">
            <div
              ref={targetRef}
              className={`text-lg ${
                targetLang === "bo"
                  ? "tracking-wide leading-loose"
                  : "font-Inter"
              }`}
            >
              {text_array.map((text, index) => {
                if (text === "" || text === "\n") return null;
                return (
                  <EachParagraph
                    key={"returndata_" + index}
                    lang={sourceLang}
                    source={text}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex justify-between">
            <div className={!liked ? "text-red-400" : "text-green-400"}>
              {message}
            </div>
            <div className="flex justify-end">
              <ReactionButtons
                fetcher={likefetcher}
                output={"textToCopy"}
                sourceText={sourceText}
                model="mt"
              />
              <CopyToClipboard
                textToCopy={"textToCopy"}
                disabled={false}
                onClick={handleCopy}
              />
            </div>
          </div>
        </Card>
      </div>
      <div className="w-full text-center md:w-fit md:float-right text-xs mt-3 text-slate-400 text-[0.7rem]">
        Monlam-MITRA ཡིག་སྒྱུར་རིག་ནུས་དཔེ་གཞི་ཐོན་རིམ་ <small>v</small>10-16
      </div>
    </ToolWraper>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <>
      <ErrorMessage error={error} />
    </>
  );
}
