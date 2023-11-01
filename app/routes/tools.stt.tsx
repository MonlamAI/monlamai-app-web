import { Button, Card, Label, Spinner } from "flowbite-react";
import { BsFillStopFill, BsFillMicFill } from "react-icons/bs";
import { useState, useRef } from "react";
import { type LoaderFunction, ActionFunction, json } from "@remix-run/node";
import { MetaFunction, useFetcher } from "@remix-run/react";
import { LiveAudioVisualizer } from "react-audio-visualize";
import CopyToClipboard from "~/component/CopyToClipboard";
import { auth } from "~/services/auth.server";
import ReactionButtons from "~/component/ReactionButtons";
import { getBrowser } from "~/component/utils/getBrowserDetail";
import ErrorMessage from "~/component/ErrorMessage";
import { FaAssistiveListeningSystems } from "react-icons/fa";

export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  parentMeta.shift(1);

  return [{ title: "Monlam | ཀློག་འདོན་རིག་ནུས།" }, ...parentMeta];
};

export const loader: LoaderFunction = async ({ request }) => {
  const apiUrl = process.env.STT_API_URL as string;
  const headers = {
    Authorization: process.env.MODEL_API_AUTH_TOKEN as string,
    "Content-Type": "audio/flac",
  };
  await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return {
    apiUrl,
    headers,
  };
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
  const [audio, setAudio] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  let mediaRecorder: any = useRef();
  const [audioBase64, setBase64] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  let likefetcher = useFetcher();
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
        // getting audio stream from user's mic persmission
        let localAudioChunks: [] = [];
        setAudio(null);
        setRecording(true);
        let browserName = getBrowser();
        const media = new MediaRecorder(stream, {
          mimeType: browserName !== "Safari" ? "audio/webm" : "audio/mp4",
        });
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
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
        // The result is a Base64-encoded string
        const base64String = reader.result;
        setBase64(base64String);

        // Now you can use the base64String as needed
      };

      // Read the Blob as a data URL (Base64)
      reader.readAsDataURL(audioBlob);
    };
  };
  return (
    <main className="mx-auto w-11/12 md:w-4/5">
      <h1 className="flex gap-3 justify-center mb-10 text-2xl lg:text-3xl text-center text-slate-700">
        <div className="text-[#FF0000]">
          <FaAssistiveListeningSystems />
        </div>
        སྒྲ་འཛིན་རིག་ནུས།
      </h1>
      <div className="flex flex-col lg:flex-row items-stretch gap-3">
        <Card className="w-full lg:w-1/2 flex">
          <div
            id="sttForm"
            className="flex flex-col w-full h-[25vh] lg:h-[50vh] justify-center gap-4"
          >
            <div className="flex flex-col items-center gap-5 flex-1 justify-center">
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
            <div className="flex justify-between h-10">
              <Button
                color="gray"
                className="text-slate-500"
                onClick={handleReset}
                disabled={!audioURL}
              >
                བསྐྱར་སྒྲིག
              </Button>
              <Button disabled={!audioURL} onClick={handleSubmit}>
                ཐོངས།
              </Button>
            </div>
          </div>
        </Card>
        <Card className="w-full lg:w-1/2 max-h-[60vh] flex">
          <Label value="ཡིག་འབེབས།" className="text-lg text-gray-500" />
          <div className="w-full h-[25vh] lg:h-[50vh] p-3 text-black bg-slate-100 rounded-lg overflow-auto">
            {isLoading ? (
              <div className="h-full flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              fetcher?.data?.text && (
                <p className="text-lg">{fetcher?.data?.text}</p>
              )
            )}
            {errorMessage && <div className="text-red-400">{errorMessage}</div>}
          </div>
          <div className="flex justify-between">
            <div
              className={
                !likefetcher.data?.liked ? "text-red-400" : "text-green-400"
              }
            >
              {likefetcher?.data?.message}
            </div>
            <div className="flex">
              <ReactionButtons
                fetcher={likefetcher}
                output={fetcher?.data?.text}
                sourceText={audioBase64 ? audioBase64 : null}
                model="stt"
              />

              <CopyToClipboard
                textToCopy={fetcher?.data?.text}
                disabled={!fetcher?.data?.text}
              />
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <>
      <ErrorMessage error={error} />
    </>
  );
}
