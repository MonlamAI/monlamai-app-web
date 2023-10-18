import { Button, Card, Label, Spinner } from "flowbite-react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa/index.js";
// import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs/index.js";
import { useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { type LoaderFunction, type ActionFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, Form } from "@remix-run/react";

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

// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();
//   const blob = formData.get("blob");
//   console.log("blob", blob, typeof blob);
//   const apiUrl = process.env.STT_API_URL as string;
//   const headers = {
//     Authorization: process.env.MODEL_API_AUTH_TOKEN as string,
//     "Content-Type": "audio/flac",
//   };
//   const response = await fetch(apiUrl, {
//     method: "POST",
//     headers,
//     body: blob,
//   });
//   const data = await response.json();
//   console.log("data", data);
//   return null;
// };

export default function Index() {
  // const fetcher = useFetcher();
  const { apiUrl, headers } = useLoaderData();
  const [audioURL, setAudioURL] = useState<string>("");
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const addAudioElement = (blob: Blob) => {
    console.log("blob", blob);
    setRecordedBlob(blob);
    const url = URL.createObjectURL(blob);
    console.log("audioURL", url);
    setAudioURL(url);
  };

  const handleSubmit = async () => {
    try {
      // const formData = new FormData();
      // formData.append("audio", recordedBlob);
      // fetcher.submit({ blob: recordedBlob }, { method: "post", });
      setIsLoading(true);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: recordedBlob,
      });
      console.log("response", response);
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
    setAudioURL("");
    setTranscript("");
  };

  return (
    <main className="m-auto w-11/12 md:w-4/5">
      <h1 className="text-center mb-4">Monlam STT</h1>
      <div className="flex flex-col  lg:flex-row gap-3">
        <Card className="w-full lg:w-1/2">
          <Form id="sttForm" method="post" className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-5">
              <AudioRecorder
                onRecordingComplete={(blob) => addAudioElement(blob)}
                recorderControls={recorderControls}
                showVisualizer={true}
              />
              {audioURL && (
                <audio id="user-audio" src={audioURL} controls></audio>
              )}
              {/* <input type="hidden" name="blob" value={} /> */}
            </div>
            <div className="flex justify-between">
              <Button
                pill
                color="gray"
                size="xs"
                className="text-slate-500"
                onClick={handleReset}
                disabled={!audioURL}
              >
                Reset
              </Button>
              <Button
                type="submit"
                pill
                size="xs"
                disabled={!audioURL}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Card>
        <Card className="w-full lg:w-1/2">
          <Label
            htmlFor="transcript"
            value="Transcript"
            className="text-gray-600 text-md"
          />
          <div className="w-full h-[50vh] p-3 text-black bg-slate-100 rounded-lg overflow-auto">
            {isLoading ? (
              <div className="h-full flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              transcript && <p>{transcript}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button color="white">
              <FaRegThumbsUp color="gray" size="20px" />
            </Button>
            <Button color="white">
              <FaRegThumbsDown color="gray" size="20px" />
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
