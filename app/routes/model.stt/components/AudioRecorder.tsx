import { Button } from "flowbite-react";
import { useRef, useState } from "react";
import { LiveAudioVisualizer } from "react-audio-visualize";
import { BsFillMicFill, BsFillStopFill } from "react-icons/bs";
import { getBrowser } from "~/component/utils/getBrowserDetail";
import AudioPlayer from "~/routes/model.tts/components/AudioPlayer";
import RecordingAnimation from "./RecordingAnimation";
import Timer from "./Timer";
let stopRecordingTimeout: any;

type AudioRecordProps = {
  audioURL: string | null;
  uploadAudio: (file: File) => void;
  isLoading: boolean;
  isUploading: boolean;
};

function AudioRecorder({
  audioURL,
  uploadAudio,
  isLoading,
  isUploading,
}: AudioRecordProps) {
  let mediaRecorder: any = useRef();
  const chunksRef = useRef<BlobPart[]>([]);
  const [tempAudioURL, setTempAudioURL] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  // use a ref for chunks to avoid state timing issues during recording

  const toggleRecording = () => {
    if (!recording) {
      startRecording();
    } else {
      stopRecording();
    }
  };
  const getMicrophonePermission = async () => {
    let permissionStatus = await navigator?.permissions.query({
      name: "microphone",
    });
    if (permissionStatus.state === "prompt") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          // Use the audio stream
        })
        .catch((error) => {
          // Handle the error or guide the user to enable permissions
        });
      alert("Please provide the required permission from browser settings");
    } else if (permissionStatus.state === "denied") {
      // The user has denied permission - guide them to enable it manually
      alert("Please enable microphone permissions in your browser settings.");
    } else if (permissionStatus.state === "granted") {
      // Permission was already granted
      return await navigator?.mediaDevices.getUserMedia({ audio: true });
    }
  };
  const startRecording = async () => {
    let stream = await getMicrophonePermission();
    if (!stream) return;
    try {
      chunksRef.current = [];
      setRecording(true);
      const browserName = getBrowser();
      const mimeType = browserName !== "Safari" ? "audio/webm;codecs=opus" : "audio/mp4";
      const media = new MediaRecorder(stream, { mimeType });
      mediaRecorder.current = media;

      mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
        if (!event?.data || event.data.size === 0) return;
        chunksRef.current.push(event.data);
      };

      // emit data every second to ensure tail data is flushed across browsers
      mediaRecorder.current.start(1000);

      stopRecordingTimeout = setTimeout(() => {
        stopRecording();
      }, 30000);
    } catch (error) {
      console.error("Error accessing the microphone:", error);
    }
  };
  const stopRecording = () => {
    if (stopRecordingTimeout) {
      clearTimeout(stopRecordingTimeout);
    }

    setRecording(false);
    //stops the recording instance
    try {
      // Flush any buffered data before stopping
      mediaRecorder.current?.requestData?.();
    } catch {}

    const stream: MediaStream | undefined = mediaRecorder.current?.stream;

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = async () => {
      const mimeType = mediaRecorder.current?.mimeType || "audio/webm";
      const audioBlob = new Blob(chunksRef.current, { type: mimeType });

      // create a File with an extension that matches the MIME type
      const ext = mimeType.includes("audio/mp4") ? "m4a" : mimeType.includes("audio/webm") ? "webm" : "wav";
      const file = new File([audioBlob], `recording.${ext}`, { type: mimeType });

      setTempAudioURL(URL.createObjectURL(audioBlob));
      uploadAudio(file);
      chunksRef.current = [];

      // fully release microphone tracks
      try {
        stream?.getTracks().forEach((t) => t.stop());
      } catch {}

      // const reader = new FileReader();

      // // Define a callback function to handle the result
      // reader.onload = function () {
      //   const base64String = reader.result;
      // };

      // // Read the Blob as a data URL (Base64)
      // reader.readAsDataURL(audioBlob);
    };
  };

  return (
    <div className="flex flex-col items-center gap-5 flex-1 justify-center">
      {recording && <Timer start={recording} stop={!recording} />}
      {recording && mediaRecorder.current && getBrowser() !== "Safari" && (
        <LiveAudioVisualizer
          mediaRecorder={mediaRecorder.current}
          width={200}
          height={75}
        />
      )}
      {recording && mediaRecorder.current && getBrowser() === "Safari" && (
        <RecordingAnimation />
      )}
      {!tempAudioURL && !audioURL && !isUploading && !isLoading && (
        <Button
          size="lg"
          color="gray"
          onClick={toggleRecording}
          className="border-secondary-500 dark:border-primary-500 text-secondary-500 dark:text-primary-500 enabled:hover:bg-neutral dark:enabled:hover:bg-[--card-bg] enabled:hover:text-secondary-600  dark:enabled:hover:text-primary-600"
        >
          {recording ? (
            <BsFillStopFill className="w-[32px] h-[34px] md:w-[50px] md:h-[50px]" />
          ) : (
            <BsFillMicFill className="w-[32px] h-[34px] md:w-[50px] md:h-[50px]" />
          )}
        </Button>
      )}

      {(tempAudioURL || audioURL) && (
        <div className="pt-8 w-full h-full">
          <AudioPlayer audioURL={(tempAudioURL || audioURL) as string} />
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
