import { Button, Card, Label, Textarea } from "flowbite-react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa/index.js";
// import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs/index.js";
import {  useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

export default function Index() {
  const [audioURL, setAudioURL] = useState<string>("");

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    console.log("audioURL", url);
    setAudioURL(audioURL);
  };

  const handleSubmit = () => {
    // send the audio to the backend
    // get the transcript back
    // display the transcript
  };

  const handleReset = () => {
    // reset the audio element
    setAudioURL("");
  };

  return (
    <main className="m-auto w-11/12 md:w-4/5">
      <h1 className="text-center mb-4">STT Demo Page</h1>
      <div className="flex flex-col  lg:flex-row gap-3">
        <Card className="w-full lg:w-1/2">
          <div className="flex flex-col items-center gap-5">
            <AudioRecorder
              onRecordingComplete={(blob) => addAudioElement(blob)}
              recorderControls={recorderControls}
              showVisualizer={true}
            />
            {audioURL && <audio src={audioURL} controls></audio>}
          </div>
          <div className="flex justify-between">
            <Button pill color="gray" size="xs" onClick={handleReset} 
              disabled={!audioURL}
            >
              Reset
            </Button>
            <Button
              pill
              color="success"
              size="xs"
              onClick={handleSubmit}
              disabled={!audioURL}
            >
              Submit
            </Button>
          </div>
        </Card>
        <Card className="w-full lg:w-1/2">
          <Label
            htmlFor="transcript"
            value="Transcript"
            className="text-gray-500 text-xs"
          />
          <Textarea id="transcript" rows={4} />
          <div className="flex justify-end">
            <Button color="white">
              <FaRegThumbsUp color="gray" />
            </Button>
            <Button color="white">
              <FaRegThumbsDown color="gray" />
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}

// import { Button, Card, Label, Textarea } from "flowbite-react";
// import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa/index.js";
// import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs/index.js";
// import { useRef, useState } from "react";

// export default function Index() {
//   const [recording, setRecording] = useState(false);
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   let mediaRecorder: MediaRecorder;
//   let audioChunks: Blob[] = [];

//   const toggleRecording = () => {
//     if (!recording) {
//       startRecording();
//     } else {
//       stopRecording();
//     }
//   };

//   const startRecording = async () => {
//     console.log("start recording");
//     try {
//       // getting audio stream from user's mic persmission
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//       });
//       mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
//       mediaRecorder.ondataavailable = (e) => {
//         if (e.data.size > 0) {
//           console.log("e.data", e.data);
//           audioChunks.push(e.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
//         audioChunks = [];
//         const audioURL = URL.createObjectURL(audioBlob);
//         console.log("audioURL", audioURL);
//         audioRef.current?.setAttribute("src", audioURL);
//       };

//       mediaRecorder.start();
//       console.log("mediaRecorder", mediaRecorder);
//       setRecording(true);
//     } catch (error) {
//       console.error("Error accessing the microphone:", error);
//     }
//   };

//   const stopRecording = () => {
//     console.log("stop recording", mediaRecorder?.state);
//     mediaRecorder?.stop();
//     setRecording(false);
//   };

//   return (
//     <main className="m-auto w-11/12 md:w-4/5">
//       <h1>STT Demo Page</h1>
//       <div className="flex gap-3">
//         <Card className="w-1/2">
//           <p className="text-black">Input Component</p>
//           <div className="flex flex-col items-center gap-5">
//             <Button size="md" onClick={toggleRecording}>
//               {recording ? <BsFillMicMuteFill /> : <BsFillMicFill />}
//             </Button>
//             <Button pill color="gray" size="xs" onClick={stopRecording}>
//               Stop Recording
//             </Button>
//             <audio ref={audioRef} controls></audio>
//           </div>
//           <div className="flex justify-between">
//             <Button pill color="gray" size="xs">
//               Reset
//             </Button>
//             <Button pill color="success" size="xs">
//               Submit
//             </Button>
//           </div>
//         </Card>
//         <Card className="w-1/2">
//           <p className="text-black">Output Component</p>
//           <Label
//             htmlFor="transcript"
//             value="Transcript"
//             className="text-gray-500 text-xs"
//           />
//           <Textarea id="transcript" rows={4} />
//           <div className="flex justify-end">
//             <Button color="white">
//               <FaRegThumbsUp color="gray" />
//             </Button>
//             <Button color="white">
//               <FaRegThumbsDown color="gray" />
//             </Button>
//           </div>
//         </Card>
//       </div>
//     </main>
//   );
// }
