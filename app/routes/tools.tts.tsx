import { Button, Card, Label, Select, Spinner, Textarea } from "flowbite-react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa/index.js";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { type ActionFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";

const charLimit = 2000;

export const action: ActionFunction = async ({ request }) => {
  const formdata = await request.formData();
  const voiceType = formdata.get("voice") as string;
  const userInput = formdata.get("sourceText") as string;
  const API_URL = process.env.TTS_API_URL as string;
  const headers = {
    Authorization: process.env.MODEL_API_AUTH_TOKEN as string,
    "Content-Type": "application/json",
  };

  console.log("user form data:", voiceType, userInput);
  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      inputs: userInput,
      // options: {
      //   voice: voiceType,
      // },
    }),
  });
  const data = await response.json();
  console.log("data", data);
  // data has sample_rate, audio_base64
  const { audio_base64 } = data;
  return audio_base64;
};

export default function Index() {
  const [sourceText, setSourceText] = useState("");
  const [charCount, setCharCount] = useState(0);

  const data = useActionData<typeof action>();
  const navigation = useNavigation();
  const isActionSubmission = navigation.state == "submitting";
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // when data is changed, the audio element will be updated
  // with the new audio data
  useEffect(() => {
    if (data) {
      audioRef.current?.setAttribute("src", `data:audio/wav;base64,${data}`);
    }
  }, [data]);

  const handleOnChange = (e) => {
    setSourceText(e.target.value.slice(0, charLimit));
    setCharCount(sourceText.length);
  };

  return (
    <main className="m-auto w-11/12 md:w-4/5">
      <h1 className="mb-10 text-4xl lg:text-5xl text-center text-slate-700">
        Monlam Text To Speech
      </h1>
      <div className="flex flex-col  lg:flex-row gap-3">
        <Card className="w-full lg:w-1/2">
          <Form id="ttsForm" method="post" className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label value="Voice" className="text-lg" />
              <Select
                name="voice"
                className="text-lg border-0"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  select voice
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </div>
            <div className="w-full h-[25vh] lg:h-[50vh]">
              <Textarea
                name="sourceText"
                placeholder="Enter text in English..."
                className="w-full h-full border-0 focus:outline-none focus:ring-transparent bg-transparent caret-slate-500 placeholder:text-slate-300 text-xl leading-relaxed"
                required
                value={sourceText}
                onChange={handleOnChange}
                autoFocus
              />
            </div>
            <div className="flex justify-between items-center">
              <Button
                type="reset"
                form="ttsForm"
                color="gray"
                className="text-slate-500"
              >
                Clear Text
              </Button>
              <div className="text-gray-400 text-xs">
                {charCount} / {charLimit}
              </div>
              <Button
                type="submit"
                form="ttsForm"
                isProcessing={isActionSubmission}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Card>
        <Card className="w-full lg:w-1/2">
          <div className="w-full h-[25vh] lg:h-[60vh]">
            <div className="h-full flex justify-center items-center">
              {isActionSubmission ? (
                <Spinner />
              ) : (
                data && (
                  <audio ref={audioRef} controls>
                    <source />
                  </audio>
                )
              )}
            </div>
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
