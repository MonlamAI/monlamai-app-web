import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Await, useFetcher } from "@remix-run/react";
import { Button, Card, Textarea } from "flowbite-react";
import { useState, useRef, useCallback, useEffect, Suspense } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import CopyToClipboard from "~/component/CopyToClipboard";
import { auth } from "~/services/auth.server";
import ReactionButtons from "~/component/ReactionButtons";
import LikeDislike from "~/styles/LikeDislike";
import useDebounce from "~/component/hooks/useDebounceState";
import { motion } from "framer-motion";
import useLocalStorage from "~/component/hooks/useLocaleStorage";
import ErrorMessage from "~/component/ErrorMessage";
import ToolWraper from "~/component/ToolWraper";
import { useDropzone } from "react-dropzone";
import { readDocxFile, readTextFile } from "~/component/utils/readers";
import { FaFile } from "react-icons/fa";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import DownloadDocument from "~/routes/model.mt/components/DownloadDocument";
import Speak from "~/component/Speak";
import { toast } from "react-toastify";
import { translate } from "../api.translation";
import ShareLink from "~/component/ShareLink";
import { updateEdit } from "~/modal/inference";

const langLabels = {
  bo: "བོད་སྐད།",
  en: "English",
};

const charLimit = 2000;
const MAX_SIZE_SUPPORT = 20;

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

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  let edited = formdata.get("edited") as string;
  let inferenceId = formdata.get("inferenceId") as string;
  let updated = await updateEdit(inferenceId, edited);

  return updated;
};

export default function Index() {
  const fetcher = useFetcher();
  const [sourceLang, setSourceLang] = useLocalStorage("inputLang", "en");
  const [targetLang, setTargetLang] = useLocalStorage("outputLang", "bo");
  const [sourceText, setSourceText] = useState("");
  const [isRotated, setIsRotated] = useState(false);
  const [fileType, setFileType] = useState<"txt" | "docx" | null>(null);
  const [selectedTool, setSelectedTool] = useLocalStorage(
    "mt_selected_input",
    "text"
  );
  const [showLike, setShowLike] = useState(false);
  const [edit, setEdit] = useState(false);

  const [direction, setDirection] = useState("");

  const debouncedSearchTerm = useDebounce(sourceText, 1000);
  const debouncedDirection = useDebounce(direction, 1000);
  const likefetcher = useFetcher();
  const editfetcher = useFetcher();
  const editRef = useRef(null);

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
  let { translation } = uselitteraTranlation();
  let liked = likefetcher.data?.liked;
  let message = likefetcher.data?.message;
  function handleCopy() {
    let textToCopy = getTextToCopy();
    navigator.clipboard.writeText(textToCopy);
  }

  function getTextToCopy() {
    let nodes = targetRef.current?.childNodes;
    if (!nodes) return "";
    const textContentArray = Array.from(nodes).map((p) => p.textContent);
    let textToCopy = textContentArray.join("\n ");
    return textToCopy;
  }

  useEffect(() => {
    setSourceText("");
  }, [selectedTool]);

  useEffect(() => {
    if (debouncedSearchTerm === "" || !debouncedSearchTerm) return;

    fetcher.submit(
      {
        input: debouncedSearchTerm,
        lang: sourceLang,
        direction,
      },
      {
        action: "/api/translation",
        method: "POST",
      }
    );
  }, [debouncedSearchTerm, debouncedDirection]);

  let data = fetcher?.data;
  let isloading = fetcher.state !== "idle";
  let inferenceId = data?.inferenceData?.id;
  let translated = data?.translation;

  function handleEditSubmit() {
    let edited = editRef.current?.value;
    editfetcher.submit(
      {
        inferenceId,
        edited,
      },
      {
        method: "POST",
      }
    );
    setEdit(false);
    setShowLike(false);
  }
  function handleCancelEdit() {
    setEdit(false);
    setShowLike(false);
  }
  return (
    <ToolWraper title="MT">
      <ListInput
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      {/* <div className="flex justify-center items-center gap-2">
        <div
          className={`inline-block text-lg text-gray-500 dark:text-gray-300 ${
            sourceLang == "en" && "font-poppins text-xl"
          } ${sourceLang == "bo" && "text-lg leading-loose font-monlam"}`}
        >
          {langLabels[sourceLang]}
        </div>

        <motion.button
          className="group flex items-center justify-center text-center font-medium relative focus:z-10 focus:outline-none text-white bg-primary border border-transparent enabled:hover:bg-primary-hover focus:ring-primary dark:bg-primary dark:enabled:hover:bg-primary-hover dark:focus:ring-primary rounded-full focus:ring-2 px-2"
          onClick={handleLangSwitch}
          initial={{ rotate: 0 }}
          animate={{ rotate: isRotated ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaArrowRightArrowLeft size="20px" />
        </motion.button>

        <div
          className={`inline-block text-lg text-right text-gray-500 dark:text-gray-300
          ${sourceLang != "en" && "font-poppins text-xl"} ${
            sourceLang != "bo" && "text-lg leading-loose font-monlam"
          }`}
        >
          {langLabels[targetLang]}
        </div>
      </div> */}
      <div className="flex flex-col md:flex-row gap-2 mt-2 ">
        <span className="mt-2">Translate into </span>
        <input
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          placeholder="eg. fr"
          className=" border-2 border-gray-300 pl-2"
        />
      </div>
      <div className="mt-3 flex flex-col md:flex-row md:h-[55vh] gap-5">
        <Card className="md:w-1/2">
          <div className="w-full flex flex-col justify-center gap-2 min-h-[20vh] md:min-h-[40vh] flex-1 overflow-hidden">
            {selectedTool === "text" && (
              <TextComponent
                sourceText={sourceText}
                setSourceText={setSourceText}
                sourceLang={sourceLang}
              />
            )}
            {selectedTool === "document" && (
              <DocumentComponent
                sourceText={sourceText}
                setSourceText={setSourceText}
                setFileType={setFileType}
              />
            )}
          </div>
          <Button
            color="gray"
            className="text-slate-500 md:hidden"
            onClick={() => setSourceText("")}
          >
            {translation.reset}
          </Button>
          <div className="md:mt-2 md:mb-3 flex justify-between items-end">
            {selectedTool === "text" ? (
              <div className="text-gray-400 text-xs">
                {charCount} / {charLimit}
              </div>
            ) : (
              <div className="text-gray-400 text-xs">
                max size: {MAX_SIZE_SUPPORT}KB
              </div>
            )}
          </div>
        </Card>

        <Card className="md:w-1/2 ">
          <div className="w-full flex flex-col justify-center gap-2 min-h-[20vh] md:min-h-[30vh] flex-1 overflow-hidden">
            <div
              ref={targetRef}
              className={`h-full text-lg ${
                targetLang === "bo"
                  ? "tracking-wide leading-loose"
                  : "font-poppins"
              }`}
            >
              {selectedTool === "text" && isloading && (
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              {selectedTool === "text" && !isloading && (
                <>
                  {!edit && (
                    <div
                      className="font-monlam text-[1.2rem]"
                      style={{ lineHeight: "1.8" }}
                    >
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {translated?.translation}
                      </motion.p>
                    </div>
                  )}
                  {edit && (
                    <Textarea
                      defaultValue={translated?.translation}
                      ref={editRef}
                      className="w-full h-full resize-none  bg-transparent font-monlam ring-0  flex-1"
                    />
                  )}
                </>
              )}
              {selectedTool === "document" && (
                <DownloadDocument
                  source={sourceText}
                  lang={sourceLang}
                  fileType={fileType}
                />
              )}
            </div>
          </div>
          {edit && (
            <p className="px-2 py-1 bg-[#F5F6B0] rounded-md text-sm">
              Your contribution will be used to improve translation quality.
            </p>
          )}
          {edit && (
            <div className="flex justify-between">
              <Button color="gray" onClick={handleCancelEdit}>
                cancel
              </Button>
              <Button
                color="blue"
                onClick={handleEditSubmit}
                isProcessing={editfetcher.state !== "idle"}
              >
                submit
              </Button>
            </div>
          )}
          {!edit && (
            <div className="flex justify-between">
              <div className={!liked ? "text-red-400" : "text-green-400"}>
                {message}
              </div>
              <div className="flex relative justify-end items-center">
                {selectedTool === "text" && (
                  <>
                    {" "}
                    <Button
                      className="border-none"
                      color="gray"
                      onClick={() => setShowLike((p) => !p)}
                      disabled={!getTextToCopy()}
                    >
                      <LikeDislike />
                    </Button>
                    {showLike && (
                      <div className=" rounded shadow-md bg-white flex flex-col items-center gap-1 absolute top-[100%] left-0 p-1 z-10">
                        <div>
                          <ReactionButtons
                            fetcher={likefetcher}
                            output={getTextToCopy()}
                            sourceText={sourceText}
                            model="mt"
                            inferenceId={inferenceId}
                          />
                        </div>
                        <Button onClick={() => setEdit((p) => !p)}>
                          suggest
                        </Button>
                      </div>
                    )}
                    <CopyToClipboard
                      textToCopy={getTextToCopy()}
                      onClick={handleCopy}
                    />
                  </>
                )}
                {getTextToCopy() !== "" && selectedTool === "text" && (
                  <>
                    <Speak getText={getTextToCopy} text={null} />
                    <ShareLink
                      link={window.location.origin + `/share/${inferenceId}`}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
      <div className="w-full text-center md:w-fit md:float-right text-xs mt-3 text-slate-400 text-[0.7rem]">
        Monlam-MITRA ཡིག་སྒྱུར་རིག་ནུས་དཔེ་གཞི་ཐོན་རིམ་ <small>v</small>10-16
      </div>
    </ToolWraper>
  );
}

export function ErrorBoundary({ error }) {
  useEffect(() => {
    toast("འདིར་དཀའ་ངལ་འདུག [error with api, try after sometime]", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }, []);

  return (
    <>
      <ErrorMessage error={error} />
    </>
  );
}

function TextComponent({ sourceText, setSourceText, sourceLang }) {
  let { translation, locale } = uselitteraTranlation();
  let isEnglish = locale === "en_US";
  return (
    <Textarea
      name="sourceText"
      placeholder={!isEnglish ? "ཡི་གེ་གཏག་རོགས།..." : "Enter text here..."}
      className={`w-full resize-none bg-slate-50 min-h-full flex-1 p-2 border-0 focus:outline-none focus:ring-transparent  caret-slate-500 placeholder:text-slate-300 placeholder:font-monlam placeholder:text-lg ${
        sourceLang == "en" && "font-poppins text-xl"
      } ${sourceLang == "bo" && "text-lg leading-loose font-monlam"}`}
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
  );
}

function DocumentComponent({ sourceText, setSourceText, setFileType }) {
  const [myFiles, setMyFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setMyFiles([...myFiles, ...acceptedFiles]);
    var file = acceptedFiles[0];
    if (!file) {
      return;
    }
    if (file.size > MAX_SIZE_SUPPORT * 1024) {
      toast("File size is too big.");
      return;
    }

    if (file.name.endsWith(".txt")) {
      setFileType("txt");
      readTextFile(file, setSourceText);
    } else if (file.name.endsWith(".docx")) {
      setFileType("docx");
      readDocxFile(file, setSourceText);
    } else {
      console.log("Unsupported file type.");
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        "text/html": [".txt", ".docx"],
      },
      multiple: false,
    });
  const reset = (file) => () => {
    setFileType(null);
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
    if (sourceText !== "") setSourceText("");
  };
  const removeAll = () => {
    setMyFiles([]);
    if (sourceText !== "") setSourceText("");
  };
  useEffect(() => {
    if (sourceText === "") removeAll();
  }, [sourceText]);

  if (myFiles.length > 0)
    return (
      <div className="bg-gray-200 p-4 rounded-lg shadow-md flex justify-between items-center">
        <div className="flex gap-4">
          <FaFile size="20px" />
          {myFiles?.map((item) => (
            <div key={item.name}>
              {item.name}
              <p>{item?.size}</p>
            </div>
          ))}
        </div>
        <Button size="sm" className="" pill onClick={removeAll}>
          X
        </Button>
      </div>
    );

  return (
    <div className="min-h-full flex-1 flex cursor-pointer" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <>
          <p className="flex-1 flex flex-col justify-center items-center border-blue-400 border-2 rounded text-slate-300 p-3">
            <img
              className="w-1/2 "
              src="//ssl.gstatic.com/translate/drag_and_drop.png"
            />
            Drag 'n' drop some files here, or click to select files
          </p>
        </>
      )}
    </div>
  );
}

function ListInput({ selectedTool, setSelectedTool }) {
  const isTextSelected = selectedTool === "text";
  const isDocumentSelected = selectedTool === "document";

  return (
    <div className="flex gap-2 mt-2">
      <Button
        color={isTextSelected ? "blue" : "gray"}
        size={"xs"}
        onClick={() => setSelectedTool("text")}
      >
        Text
      </Button>
      <Button
        // disabled={true}
        color={isDocumentSelected ? "blue" : "gray"}
        size={"xs"}
        onClick={() => setSelectedTool("document")}
      >
        Document
      </Button>
    </div>
  );
}
