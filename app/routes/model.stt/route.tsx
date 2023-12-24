import { Button, Card, Label, Spinner } from "flowbite-react";
import { BsFillStopFill, BsFillMicFill } from "react-icons/bs";
import { useState, useRef, useCallback, useEffect } from "react";
import { type LoaderFunction, ActionFunction, json } from "@remix-run/node";
import { MetaFunction, useFetcher } from "@remix-run/react";
import { LiveAudioVisualizer } from "react-audio-visualize";
import CopyToClipboard from "~/component/CopyToClipboard";
import { auth } from "~/services/auth.server";
import ReactionButtons from "~/component/ReactionButtons";
import { getBrowser } from "~/component/utils/getBrowserDetail";
import ErrorMessage from "~/component/ErrorMessage";
import ToolWraper from "~/component/ToolWraper";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { useDropzone } from "react-dropzone";
import { FaDownload, FaFile } from "react-icons/fa6";
import { downloadTxtFile } from "~/component/utils/download";
import ListInput from "~/component/ListInput";
import { FaRedo } from "react-icons/fa";
import Speak from "~/component/Speak";
import { toast } from "react-toastify";

export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  parentMeta.shift(1);

  return [{ title: "Monlam | སྒྲ་འཛིན་རིག་ནུས།" }, ...parentMeta];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const apiUrl = process.env.STT_API_URL as string;
  const headers = {
    Authorization: process.env.MODEL_API_AUTH_TOKEN as string,
    "Content-Type": "audio/flac",
  };
  try {
    let audio = formData.get("audio") as string;
    const blob = await fetch(audio).then((res) => res.blob());
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: blob,
    });
    if (response.ok) {
      const data = await response.json();
      return json({ text: data?.text });
    } else {
      return json({ error_message: "Failed to send the audio to the server" });
    }
  } catch (error) {
    return { error_message: "Error during submission:" + error };
  }
};
export default function Index() {
  const fetcher = useFetcher();
  const [audioChunks, setAudioChunks] = useState([]);
  const [selectedTool, setSelectedTool] = useState<"Recording" | "File">(
    "Recording"
  );
  const [audio, setAudio] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  let mediaRecorder: any = useRef();
  const [audioBase64, setBase64] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  let likefetcher = useFetcher();
  useEffect(() => {
    setAudioURL(null);
  }, [selectedTool]);
  const handleSubmit = async () => {
    const form = new FormData();
    const reader = new FileReader();
    reader.readAsDataURL(audio as Blob);
    reader.addEventListener(
      "loadend",
      () => {
        if (typeof reader.result === "string") {
          form.append("audio", reader.result);
          fetcher.submit(form, { method: "post" });
        }
      },
      { once: true }
    );
  };
  const isLoading = fetcher.state !== "idle";
  const errorMessage = fetcher.data?.error_message;

  const handleReset = () => {
    // reset the audio element and the transcript
    setAudio(null);
    setAudioURL(null);
    fetcher.submit(
      {},
      {
        method: "POST",
        action: "/api/reset_actiondata",
      }
    );
  };
  const toggleRecording = () => {
    if (!recording) {
      startRecording();
    } else {
      stopRecording();
    }
  };
  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        return streamData;
      } catch (err) {
        alert(err.message);
        return false;
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    let stream = await getMicrophonePermission();
    if (stream) {
      try {
        let localAudioChunks: [] = [];
        setAudio(null);
        setRecording(true);
        let browserName = getBrowser();
        const media = new MediaRecorder(stream, {
          mimeType: browserName !== "Safari" ? "audio/webm" : "audio/mp4",
        });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        mediaRecorder.current.ondataavailable = (event: any) => {
          if (typeof event.data === "undefined") return;
          if (event.data.size === 0) return;
          localAudioChunks.push(event?.data);
        };
        setAudioChunks(localAudioChunks);
      } catch (error) {
        console.error("Error accessing the microphone:", error);
      }
    }
  };

  const stopRecording = () => {
    setRecording(false);
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks);
      setAudio(audioBlob);
      setAudioURL(window.URL.createObjectURL(audioBlob));
      setAudioChunks([]);

      const reader = new FileReader();

      // Define a callback function to handle the result
      reader.onload = function () {
        const base64String = reader.result;
        setBase64(base64String);
      };

      // Read the Blob as a data URL (Base64)
      reader.readAsDataURL(audioBlob);
    };
  };

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
  let { translation, label } = uselitteraTranlation();
  let isEnglish = label === "en_US";
  let isDisabled = !audioURL;
  let text = fetcher.data?.text;
  return (
    <ToolWraper title="STT">
      <main className="mx-auto w-11/12 md:w-4/5">
        <div className="flex flex-col lg:flex-row  gap-3">
          {!text ? (
            <Card className="w-full flex   h-[60vh]">
              <div className="flex flex-col gap-2 flex-1 ">
                <ListInput
                  selectedTool={selectedTool}
                  setSelectedTool={setSelectedTool}
                  options={["Recording", "File"]}
                />
                {selectedTool === "Recording" && (
                  <div className="flex flex-col items-center gap-5 flex-1 justify-center min-h-[40dvh]">
                    {recording &&
                      mediaRecorder.current &&
                      getBrowser() !== "Safari" && (
                        <LiveAudioVisualizer
                          mediaRecorder={mediaRecorder.current}
                          width={200}
                          height={75}
                        />
                      )}
                    <Button size="xl" onClick={toggleRecording}>
                      {recording ? <BsFillStopFill /> : <BsFillMicFill />}
                    </Button>
                    {audioURL && (
                      <audio controls>
                        <source src={audioURL} type="audio/mpeg"></source>
                        <source src={audioURL} type="audio/ogg"></source>
                      </audio>
                    )}
                  </div>
                )}
                {selectedTool === "File" && (
                  <HandleAudioFile handleFileChange={handleFileChange} />
                )}

                <div className="flex flex-end h-10">
                  <Button
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    isProcessing={fetcher.state !== "idle"}
                  >
                    {translation.submit}
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="w-full  h-[60vh] flex">
              {text && (
                <div className="flex justify-end">
                  <Speak text={text} />
                </div>
              )}
              <div className="w-full h-[25vh] lg:h-[50vh] p-3 text-black bg-slate-100 dark:text-gray-200 dark:bg-slate-700 rounded-lg overflow-auto">
                {isLoading ? (
                  <div className="h-full flex justify-center items-center">
                    <Spinner />
                  </div>
                ) : (
                  text && (
                    <p
                      className="font-monlam text-2xl"
                      style={{ lineHeight: "1.8" }}
                    >
                      {text}
                    </p>
                  )
                )}
                {errorMessage && (
                  <div className="text-red-400">{errorMessage}</div>
                )}
              </div>
              <div className="flex justify-between">
                <div
                  className={
                    !likefetcher.data?.liked ? "text-red-400" : "text-green-400"
                  }
                >
                  {likefetcher?.data?.message}
                </div>
                <div className="flex gap-2">
                  <ReactionButtons
                    fetcher={likefetcher}
                    output={text}
                    sourceText={audioBase64 ? audioBase64 : null}
                    model="stt"
                  />
                  <CopyToClipboard textToCopy={text} disabled={!text} />
                  <Button
                    disabled={!text || text === ""}
                    onClick={() => downloadTxtFile(text)}
                  >
                    <FaDownload />
                  </Button>
                  <Button
                    color="gray"
                    className="text-slate-500"
                    onClick={handleReset}
                    title={translation.reset}
                  >
                    <FaRedo size={20} color="gray" />
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
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

function HandleAudioFile({ handleFileChange }) {
  const [myFiles, setMyFiles] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    var file = acceptedFiles[0];
    if (!file) {
      return;
    }
    handleFileChange(file);
    setMyFiles(file);
  }, []);
  const removeFile = () => {
    setMyFiles(null);
  };

  let { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp3", ".wav"],
    },
    multiple: false,
    noClick: true,
  });

  if (myFiles)
    return (
      <div className="flex flex-1 w-full items-center">
        <div className="bg-gray-200 py-2 w-full h-16 p-5 rounded-lg shadow-md inline-flex justify-between items-center">
          <div className="flex items-center gap-4">
            <FaFile size="20px" />
            <div className="flex flex-col">
              {myFiles?.name}
              <p>{myFiles?.size}</p>
            </div>
          </div>
          <Button size="sm" className="" pill onClick={removeFile}>
            X
          </Button>
        </div>
      </div>
    );
  return (
    <>
      <form className=" flex-1 flex cursor-pointer" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <p>Drop the files here ...</p>
          </>
        ) : (
          <div className="flex flex-1 flex-col gap-2 hover:border-dotted hover:border-2 hover:border-gray-300">
            <p className=" flex flex-col justify-center items-center  rounded text-slate-300 p-3">
              <img
                className="h-32 "
                src="//ssl.gstatic.com/translate/drag_and_drop.png"
              />
              click to select .mp3 or .wav files
            </p>
            <Button
              onClick={open}
              color="gray"
              className="block max-w-xs text-center m-auto"
            >
              open file browser
            </Button>
          </div>
        )}
      </form>
    </>
  );
}
