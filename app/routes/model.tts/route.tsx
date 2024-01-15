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
import { CHAR_LIMIT, CHAR_LIMIT_TTS, MAX_SIZE_SUPPORT } from "~/helper/const";
import ShareLink from "~/component/ShareLink";
import { resetFetcher } from "~/component/utils/resetFetcher";
import { RxCross2 } from "react-icons/rx";
import { CancelButton, SubmitButton } from "~/component/Buttons";
import { formatBytes } from "~/component/utils/formatSize";
import FileUpload from "~/component/FileUpload";
import TextComponent from "~/component/TextComponent";
import { CharacterOrFileSizeComponent } from "../model.mt/components/UtilityComponent";

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
    resetFetcher(fetcher);
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
            <div className="flex relative flex-col flex-1  justify-center ">
              {selectedTool === "text" && (
                <TextComponent
                  setSourceText={setSourceText}
                  sourceText={sourceText}
                  sourceLang={"bo"}
                />
              )}
              {selectedTool === "document" && (
                <FileUpload
                  setSourceText={setSourceText}
                  sourceText={sourceText}
                />
              )}
              <CancelButton
                onClick={handleReset}
                hidden={!sourceText || sourceText === ""}
              >
                <RxCross2 />
              </CancelButton>
            </div>
            <div className="flex justify-between items-center">
              <CharacterOrFileSizeComponent
                selectedTool={selectedTool}
                charCount={sourceText.length}
                CHAR_LIMIT={CHAR_LIMIT}
                MAX_SIZE_SUPPORT={MAX_SIZE_SUPPORT}
              />
              <SubmitButton
                type="submit"
                form="ttsForm"
                isProcessing={isLoading}
                onClick={submitHandler}
                disabled={!sourceText || sourceText === ""}
              >
                {translation.submit}
              </SubmitButton>
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
            <div className="flex gap-3 md:gap-5 items-center">
              <ReactionButtons
                fetcher={likeFetcher}
                output={data ? `data:audio/wav;base64,${data}` : null}
                sourceText={sourceText}
                inferenceId={inferenceId}
              />

              {inferenceId && <ShareLink inferenceId={inferenceId} />}
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
