import { Button, Card, Spinner, Textarea } from "flowbite-react";
import { MetaFunction, useFetcher } from "@remix-run/react";
import {
  LoaderFunctionArgs,
  type ActionFunction,
  LinksFunction,
} from "@remix-run/node";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { auth } from "~/services/auth.server";
import ReactionButtons from "~/component/ReactionButtons";
import inputReplace from "~/component/utils/ttsReplace.server";
import { amplifyMedia } from "~/component/utils/audioGain";
import useLocalStorage from "~/component/hooks/useLocaleStorage";
import { AiOutlineCloudDownload } from "react-icons/ai";
import ErrorMessage from "~/component/ErrorMessage";
import AudioPlayer from "~/component/AudioPlayer";
import { BsFillVolumeUpFill } from "react-icons/bs";
import ToolWraper from "~/component/ToolWraper";
import { readDocxFile, readTextFile } from "~/component/utils/readers";
import { useDropzone } from "react-dropzone";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { FaFile } from "react-icons/fa6";
const charLimit = 2000;
export async function loader({ request }: LoaderFunctionArgs) {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return { user: userdata };
}

export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  parentMeta.shift(1);

  return [{ title: "Monlam | ཀློག་འདོན་རིག་ནུས།" }, ...parentMeta];
};

export const action: ActionFunction = async ({ request }) => {
  const formdata = await request.formData();
  // const voiceType = formdata.get("voice") as string;
  const userInput = formdata.get("sourceText") as string;
  const API_URL = process.env.TTS_API_URL as string;
  const headers = {
    Authorization: process.env.MODEL_API_AUTH_TOKEN as string,
    "Content-Type": "application/json",
  };
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        inputs: inputReplace(userInput),
      }),
    });
    const data = await response.json();
    const { audio_base64 } = data;
    return audio_base64;
  } catch (e) {
    return {
      error: "There was a problem with the API :" + e,
    };
  }
};
export default function Index() {
  const [sourceText, setSourceText] = useState("");
  const [selectedTool, setSelectedTool] = useLocalStorage(
    "tts_selected_input",
    "text"
  );
  const [volume, setVolume] = useLocalStorage("volume", 1);
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";
  const data = fetcher.data;
  let sourceUrl = useMemo(() => {
    return data ? `data:audio/wav;base64,${data}` : null;
  }, [data]);
  const audioRef = useRef<HTMLAudioElement>(null);
  let setting = useRef();

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    amplify(e.target.value);
  };
  const handleReset = () => {
    setSourceText("");
    fetcher.submit(
      {},
      {
        method: "POST",
        action: "/api/reset_actiondata",
      }
    );
  };
  let charCount = sourceText?.length;
  let likeFetcher = useFetcher();
  useEffect(() => {
    if (audioRef.current && !setting.current && data) {
      setting.current = amplifyMedia(audioRef.current, volume);
    }
  }, [data]);

  function amplify(number) {
    if (setting.current) {
      setting.current?.amplify(number);
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    fetcher.submit(
      {
        sourceText: sourceText,
      },
      {
        method: "POST",
      }
    );
  }

  let { translation } = uselitteraTranlation();
  return (
    <ToolWraper title="TTS">
      <main className="mx-auto w-11/12 md:w-4/5">
        <div className="flex flex-col  lg:flex-row gap-3 lg:h-[60vh]">
          <Card className="w-full lg:w-1/2 min-h-[20vh] lg:min-h-[40vh] lg:h-auto flex">
            <div className="flex flex-col gap-2 flex-1 ">
              <ListInput
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
              />
              <div className="w-full flex-1 max-h-[50vh] ">
                {selectedTool === "text" && (
                  <TextComponent
                    setSourceText={setSourceText}
                    sourceText={sourceText}
                  />
                )}
                {selectedTool === "document" && (
                  <DocumentComponent
                    setSourceText={setSourceText}
                    sourceText={sourceText}
                  />
                )}
              </div>
              <div className="flex justify-between items-center">
                <Button
                  type="reset"
                  form="ttsForm"
                  color="gray"
                  className="text-slate-500"
                  onClick={handleReset}
                  disabled={true}
                >
                  {translation.reset}
                </Button>
                <div className="text-gray-400 text-xs">
                  {charCount} / {charLimit}
                </div>
                <Button
                  type="submit"
                  form="ttsForm"
                  isProcessing={isLoading}
                  onClick={submitHandler}
                  disabled={!sourceText || sourceText === ""}
                >
                  {translation.submit}
                </Button>
              </div>
            </div>
          </Card>
          <Card className="w-full lg:w-1/2 max-h-[60vh] flex">
            <div className="w-full flex-1">
              {data && (
                <div className="flex justify-between mx-2">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">སྒྲ་ཤུགས་ཆེ་ཆུང་།</span>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      step={0.01}
                      value={volume}
                      onChange={handleVolumeChange}
                    />{" "}
                  </div>
                </div>
              )}
              {isLoading ? (
                <Spinner />
              ) : (
                <div className="flex-1 h-full flex justify-center items-center">
                  {data?.error ? (
                    <div className="text-red-400">{data?.error}</div>
                  ) : (
                    <AudioPlayer ref={audioRef} sourceUrl={sourceUrl} />
                  )}
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <div
                className={
                  !likeFetcher.data?.liked ? "text-red-400" : "text-green-400"
                }
              >
                {likeFetcher.data?.message}
              </div>
              <ReactionButtons
                fetcher={likeFetcher}
                output={data ? `data:audio/wav;base64,${data}` : null}
                sourceText={sourceText}
                model="tts"
              />
            </div>
          </Card>
        </div>
      </main>
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

function TextComponent({ sourceText, setSourceText }) {
  return (
    <Textarea
      name="sourceText"
      placeholder="ཡི་གེ་གཏག་རོགས།..."
      className={`w-full bg-slate-50 min-h-full flex-1 p-2 border-0 focus:outline-none focus:ring-transparent  caret-slate-500 placeholder:text-slate-300 placeholder:font-monlam placeholder:text-lg text-lg leading-loose`}
      required
      value={sourceText}
      onInput={(e) => {
        setSourceText((prev) => {
          let value = e.target.value;
          if (value?.length <= charLimit) return value;
          return prev;
        });
      }}
      autoFocus
    />
  );
}

function DocumentComponent({ sourceText, setSourceText }) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    var file = acceptedFiles[0];
    if (!file) {
      return;
    }

    if (file.name.endsWith(".txt")) {
      readTextFile(file, setSourceText);
    } else if (file.name.endsWith(".docx")) {
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
    });
  function reset() {
    acceptedFiles.splice(0, acceptedFiles.length);
    if (sourceText !== "") setSourceText("");
  }

  if (acceptedFiles.length > 0)
    return (
      <div className="bg-gray-200 p-5 rounded-lg shadow-md flex justify-between items-center">
        <div className="flex gap-4">
          <FaFile size="20px" />
          {acceptedFiles.map((item) => item.name)}{" "}
        </div>
        <Button size="sm" className="" pill onClick={reset}>
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
          <p className="flex-1 flex flex-col justify-center items-center  rounded text-slate-300 p-3">
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
    <div className="flex gap-2">
      <Button
        color={isTextSelected ? "blue" : "gray"}
        size={"xs"}
        onClick={() => setSelectedTool("text")}
      >
        Text
      </Button>
      <Button
        color={isDocumentSelected ? "blue" : "gray"}
        size={"xs"}
        onClick={() => setSelectedTool("document")}
      >
        Document
      </Button>
    </div>
  );
}
