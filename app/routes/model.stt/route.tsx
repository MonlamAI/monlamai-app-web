import { Button, Card, Label, Spinner } from "flowbite-react";
import { BsFillStopFill, BsFillMicFill } from "react-icons/bs";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  type LoaderFunction,
  ActionFunction,
  json,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { MetaFunction, useFetcher } from "@remix-run/react";
import { getBrowser } from "~/component/utils/getBrowserDetail";
import ErrorMessage from "~/component/ErrorMessage";
import ToolWraper from "~/component/ToolWraper";
import CardComponent from "~/component/Card";
import InferenceWrapper from "~/component/layout/InferenceWrapper";
import {
  CharacterOrFileSizeComponent,
  EditActionButtons,
  LoadingAnimation,
  OutputDisplay,
} from "../model.mt/components/UtilityComponent";
import { ErrorBoundary } from "../model.mt/route";
import { NonEditButtons, NonEditModeActions } from "~/component/ActionButtons";
import { updateEdit } from "~/modal/inference.server";
import EditDisplay from "~/component/EditDisplay";
import { resetFetcher } from "~/component/utils/resetFetcher";
import { RxCross2 } from "react-icons/rx";
import { CancelButton } from "~/component/Buttons";
import { MAX_SIZE_SUPPORT_AUDIO } from "~/helper/const";
import { HandleAudioFile } from "./components/FileUpload";
import { auth } from "~/services/auth.server";
import { getUserSession } from "~/services/session.server";
import AudioRecorder from "./components/AudioRecorder";

export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  parentMeta.shift(1);

  return [{ title: "Monlam | སྒྲ་འཛིན་རིག་ནུས།" }, ...parentMeta];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let userdata = await getUserSession(request);
  let user = null;
  if (userdata) {
    user = userdata;
  }
  return { user };
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
  const [selectedTool, setSelectedTool] = useState<"recording" | "file">(
    "recording"
  );
  const [audio, setAudio] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState("");

  let likefetcher = useFetcher();
  const editfetcher = useFetcher();

  let editData = editfetcher.data?.edited;
  let liked = likefetcher.data?.liked;
  function handleCopy() {
    let textToCopy = text;
    navigator.clipboard.writeText(textToCopy);
  }

  useEffect(() => {
    setAudioURL(null);
  }, [selectedTool]);

  const handleSubmit = async () => {
    if (!audioURL || audioURL === "") return;
    const form = new FormData();
    form.append("audioURL", audioURL);
    fetcher.submit(form, { method: "POST", action: "/api/stt" });
    resetFetcher(editfetcher);
  };
  const isLoading = fetcher.state !== "idle";

  const handleReset = () => {
    // reset the audio element and the transcript
    setAudio(null);
    setAudioURL(null);
    setEdit(false);
    resetFetcher(editfetcher);
    resetFetcher(fetcher);
  };

  useEffect(() => {
    if (audioURL && audioURL !== "") {
      handleSubmit();
    }
  }, [audioURL]);

  const handleFileChange = (file) => {
    if (file) {
      setAudio(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAudioURL(reader.result);
      };
      reader.onerror = (error) => {
        console.error("Error: ", error);
      };
    }
  };
  let text = fetcher.data?.text;
  let inferenceId = fetcher.data?.inferenceId;
  let RecordingSelected = selectedTool === "recording";
  let fileSelected = selectedTool === "file";

  function handleEditSubmit() {
    let edited = editText;
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
  }
  let newText = editfetcher.data?.edited;

  function handleCancelEdit() {
    setEdit(false);
    setEditText("");
  }

  const errorMessage = fetcher.data?.error_message;
  const actionError = fetcher.data?.error ?? errorMessage;
  return (
    <ToolWraper title="STT">
      <InferenceWrapper
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
        options={["recording"]}
      >
        {actionError && <ErrorMessage error={actionError} />}

        <CardComponent>
          <div className="flex flex-col relative gap-2 flex-1 min-h-[30vh]">
            {RecordingSelected && (
              <AudioRecorder audioURL={audioURL} setAudioURL={setAudioURL} />
            )}
            {fileSelected && (
              <HandleAudioFile
                handleFileChange={handleFileChange}
                reset={handleReset}
              />
            )}
            {RecordingSelected && (
              <CancelButton onClick={handleReset} hidden={!audioURL}>
                <RxCross2 size={20} />
              </CancelButton>
            )}

            <div className="flex justify-between">
              <CharacterOrFileSizeComponent
                selectedTool={selectedTool}
                charCount={"2 min "}
                CHAR_LIMIT={undefined}
                MAX_SIZE_SUPPORT={MAX_SIZE_SUPPORT_AUDIO}
              />
            </div>
          </div>
        </CardComponent>
        <CardComponent>
          <div className="w-full flex-1 min-h-[30vh] lp-3 text-black  dark:text-gray-200 dark:bg-slate-700 rounded-lg overflow-auto">
            {RecordingSelected && isLoading && <LoadingAnimation />}
            {edit && (
              <EditDisplay editText={editText} setEditText={setEditText} />
            )}
            {!isLoading && (
              <OutputDisplay
                edit={edit}
                editData={editData}
                output={text}
                animate={false}
                targetLang="bo"
              />
            )}
          </div>
          {edit && (
            <EditActionButtons
              handleCancelEdit={handleCancelEdit}
              handleEditSubmit={handleEditSubmit}
              editfetcher={editfetcher}
              editText={editText}
              outputText={text}
            />
          )}
          {!edit && inferenceId && (
            <NonEditButtons
              selectedTool={selectedTool}
              likefetcher={likefetcher}
              sourceText={""}
              inferenceId={inferenceId}
              setEdit={setEdit}
              text={newText ?? text}
              handleCopy={handleCopy}
              setEditText={setEditText}
              sourceLang="bo"
            />
          )}
        </CardComponent>
      </InferenceWrapper>
    </ToolWraper>
  );
}

export { ErrorBoundary };
