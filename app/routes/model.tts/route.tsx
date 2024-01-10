import { Button, Card, Spinner, Textarea } from "flowbite-react";
import { MetaFunction, useFetcher } from "@remix-run/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactionButtons from "~/component/ReactionButtons";
import { amplifyMedia } from "~/component/utils/audioGain";
import useLocalStorage from "~/component/hooks/useLocaleStorage";
import AudioPlayer from "~/component/AudioPlayer";
import ToolWraper from "~/component/ToolWraper";
import { readDocxFile, readTextFile } from "~/component/utils/readers";
import { useDropzone } from "react-dropzone";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { FaFile } from "react-icons/fa6";
import { FaRedo } from "react-icons/fa";
import { toast } from "react-toastify";
import ErrorMessage from "~/component/ErrorMessage";
import InferenceWrapper from "~/component/layout/InferenceWrapper";
import { CHAR_LIMIT_TTS } from "~/helper/const";
import ShareLink from "~/component/ShareLink";

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  parentMeta.shift(1);

  return [{ title: "Monlam | ཀློག་འདོན་རིག་ནུས།" }, ...parentMeta];
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
  const data = fetcher.data?.data;
  const inferenceId = fetcher.data?.inferenceData?.id;
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
  useEffect(() => {
    setSourceText("");
  }, [selectedTool]);

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
        action: "/api/tts",
      }
    );
  }

  let { translation } = uselitteraTranlation();
  return (
    <ToolWraper title="TTS">
      <InferenceWrapper
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
        options={["text", "document"]}
      >
        <Card className="w-full min-h-[20vh] lg:min-h-[40vh] lg:h-auto flex">
          <div className="flex flex-col  gap-2 flex-1 ">
            <div className="flex flex-col flex-1  justify-center max-h-[50vh] ">
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
                onClick={handleReset}
                disabled={!sourceText || sourceText === ""}
              >
                {translation.reset}
              </Button>
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
        <Card className="w-full  max-h-[60vh] flex">
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
          <div className="flex justify-end">
            <div className="flex gap-2">
              <ReactionButtons
                fetcher={likeFetcher}
                output={data ? `data:audio/wav;base64,${data}` : null}
                sourceText={sourceText}
                inferenceId={inferenceId}
              />

              {inferenceId && (
                <>
                  <Button
                    color="gray"
                    className="text-slate-500"
                    onClick={handleReset}
                    title={translation.reset}
                  >
                    <FaRedo size={20} color="gray" />
                  </Button>
                  <ShareLink link={"/share/" + inferenceId} />
                </>
              )}
            </div>
          </div>
        </Card>
      </InferenceWrapper>
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

function TextComponent({ sourceText, setSourceText }) {
  let charCount = sourceText?.length;

  return (
    <div className=" flex flex-col min-h-full flex-1 bg-slate-50 caret-slate-500">
      <Textarea
        name="sourceText"
        placeholder="ཡི་གེ་གཏག་རོགས།..."
        className={`w-full resize-none flex-1  p-2 border-0  focus:ring-transparent placeholder:text-slate-300 placeholder:font-monlam placeholder:text-lg text-lg leading-loose`}
        required
        value={sourceText}
        onInput={(e) => {
          setSourceText((prev) => {
            let value = e.target.value;
            if (value?.length <= CHAR_LIMIT_TTS) return value;
            return prev;
          });
        }}
        autoFocus
      />
      <div className="text-gray-400 self-end mr-3 text-xs">
        {charCount} / {CHAR_LIMIT_TTS}
      </div>
    </div>
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
          {acceptedFiles.map((item) => (
            <div key={item.name}>
              {item.name}
              <p>{item.size} B</p>
            </div>
          ))}
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
            click to select some .txt or .docx file here
          </p>
        </>
      )}
    </div>
  );
}
