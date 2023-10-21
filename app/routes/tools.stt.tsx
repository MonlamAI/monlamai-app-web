import { Button, Card, Label, Spinner } from "flowbite-react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa/index.js";
import { BsFillStopFill, BsFillMicFill } from "react-icons/bs/index.js";
import { useState, useRef } from "react";
import { type LoaderFunction } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { LiveAudioVisualizer } from "react-audio-visualize";
import CopyToClipboard from "~/component/CopyToClipboard";
export const loader: LoaderFunction = async ({ request }) => {
  const apiUrl = process.env.STT_API_URL as string;
  const headers = {
    Authorization: process.env.MODEL_API_AUTH_TOKEN as string,
    "Content-Type": "audio/flac",
  };
  return {
    apiUrl,
    headers,
  };
};

export default function Index() {
  // const fetcher = useFetcher();
  const { apiUrl, headers } = useLoaderData();
  const [audioChunks, setAudioChunks] = useState([]);
  const [transcript, setTranscript] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audio, setAudio] = useState<{ blob: Blob; url: string } | null>(null);
  let mediaRecorder: any = useRef();

  const [recording, setRecording] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: audio?.blob,
      });
      if (response.ok) {
        const data = await response.json();
        const { text } = data;
        setTranscript(text);
        setIsLoading(false);
      } else {
        console.error("Failed to send the audio to the server");
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const handleReset = () => {
    // reset the audio element and the transcript
    setAudio(null);
    setTranscript("");
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
        const media = new MediaRecorder(stream, { mimeType: "audio/webm" });
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
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio({ blob: audioBlob, url: audioUrl });

      setAudioChunks([]);
    };
  };
  return (
    <main className="mx-auto w-11/12 md:w-4/5">
      <h1 className="mb-10 text-2xl lg:text-3xl text-center text-slate-700">
        སྒྲ་འཛིན་རིག་ནུས།
      </h1>
      <div className="flex flex-col lg:flex-row items-stretch gap-3">
        <Card className="w-full lg:w-1/2 flex">
          <Form
            id="sttForm"
            method="post"
            className="flex flex-col w-full h-[25vh] lg:h-[50vh] justify-center gap-4"
          >
            <div className="flex flex-col items-center gap-5 flex-1 justify-center">
              {recording && mediaRecorder.current && (
                <LiveAudioVisualizer
                  mediaRecorder={mediaRecorder.current}
                  width={200}
                  height={75}
                />
              )}
              <Button size="xl" onClick={toggleRecording}>
                {recording ? <BsFillStopFill /> : <BsFillMicFill />}
              </Button>

              {audio?.url && (
                <audio id="user-audio" src={audio.url} controls></audio>
              )}
            </div>
            <div className="flex justify-between h-10">
              <Button
                color="gray"
                className="text-slate-500"
                onClick={handleReset}
                disabled={!audio?.url}
              >
                བསྐྱར་སྒྲིག།
              </Button>
              <Button disabled={!audio?.url} onClick={handleSubmit}>
                ཐོངས།
              </Button>
            </div>
          </Form>
        </Card>
        <Card className="w-full lg:w-1/2 max-h-[60vh] flex">
          <Label
            htmlFor="transcript"
            value="ཡིག་འབེབས།"
            className="text-lg text-gray-500"
          />
          <div className="w-full h-[25vh] lg:h-[50vh] p-3 text-black bg-slate-100 rounded-lg overflow-auto">
            {isLoading ? (
              <div className="h-full flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              transcript && <p className="text-lg">{transcript}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button color="white" disabled={!transcript}>
              <FaRegThumbsUp color="gray" size="20px" />
            </Button>
            <Button color="white" disabled={!transcript}>
              <FaRegThumbsDown color="gray" size="20px" />
            </Button>
            <CopyToClipboard textToCopy={transcript} disabled={!transcript} />
          </div>
        </Card>
      </div>
    </main>
  );
}
