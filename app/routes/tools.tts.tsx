import { Button, Card, Spinner, Textarea } from "flowbite-react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa/index.js";
import {
  Form,
  useActionData,
  useFetcher,
  useNavigation,
} from "@remix-run/react";
import { LoaderFunctionArgs, type ActionFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
import { auth } from "~/services/auth.server";

const charLimit = 500;
export async function loader({ request }: LoaderFunctionArgs) {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return { user: userdata };
}

export const action: ActionFunction = async ({ request }) => {
  const formdata = await request.formData();
  const voiceType = formdata.get("voice") as string;
  const userInput = formdata.get("sourceText") as string;
  const API_URL = process.env.TTS_API_URL as string;
  const headers = {
    Authorization: process.env.MODEL_API_AUTH_TOKEN as string,
    "Content-Type": "application/json",
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      inputs: userInput,
    }),
  });
  const data = await response.json();
  const { audio_base64 } = data;
  return audio_base64;
};

export default function Index() {
  const [sourceText, setSourceText] = useState("");
  const data = useActionData<typeof action>();
  const navigation = useNavigation();
  const isActionSubmission = navigation.state == "submitting";
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleReset = () => {
    setSourceText("");
    // setCharCount(0);
    // hide the audio element only
    audioRef.current?.setAttribute("hidden", "");
  };

  let charCount = sourceText?.length;
  let likeFetcher = useFetcher();
  function handleLike() {
    if (!data) return;
    likeFetcher.submit(
      {
        source: sourceText,
        output: `data:audio/wav;base64,${data}`,
        _action: "liked",
        model: "tts",
      },
      {
        method: "POST",
        action: "/feedback",
      }
    );
  }
  function handleDislike() {
    if (!data) return;
    likeFetcher.submit(
      {
        source: sourceText,
        output: `data:audio/wav;base64,${data}`,
        _action: "disliked",
        model: "tts",
      },
      {
        method: "POST",
        action: "/feedback",
      }
    );
  }
  let liked = likeFetcher.data?.liked;
  let disliked = likeFetcher.data?.disliked;
  let message = likeFetcher.data?.message;
  return (
    <main className="mx-auto w-11/12 md:w-4/5">
      <h1 className="mb-10 text-2xl lg:text-3xl text-center text-slate-700">
        ཀློག་འདོན་རིག་ནུས།
      </h1>
      <div className="flex flex-col  lg:flex-row gap-3">
        <Card className="w-full lg:w-1/2 max-h-[60vh] flex">
          <Form
            id="ttsForm"
            method="post"
            className="flex flex-col gap-5 flex-1 "
          >
            <div className="w-full flex-1 max-h-[50vh]">
              <Textarea
                name="sourceText"
                placeholder="ཡི་གེ་གཏག་རོགས།..."
                className="w-full h-full max-h-full border-0 focus:outline-none focus:ring-transparent bg-transparent caret-slate-500 placeholder:text-slate-300 text-xl leading-relaxed"
                required
                value={sourceText}
                onInput={(e) => {
                  setSourceText((prev) => {
                    let value = e.target.value;
                    if (value?.length <= charLimit) return value;
                    return prev;
                  });
                }}
                autoFocus
              />
            </div>
            <div className="flex justify-between items-center">
              <Button
                type="reset"
                form="ttsForm"
                color="gray"
                className="text-slate-500"
                onClick={handleReset}
              >
                བསྐྱར་སྒྲིག།
              </Button>
              <div className="text-gray-400 text-xs">
                {charCount} / {charLimit}
              </div>
              <Button
                type="submit"
                form="ttsForm"
                isProcessing={isActionSubmission}
              >
                ཀློགས།
              </Button>
            </div>
          </Form>
        </Card>
        <Card className="w-full lg:w-1/2 max-h-[60vh] flex">
          <div className="w-full h-[25vh] lg:h-[60vh]">
            <div className="h-full flex justify-center items-center">
              {isActionSubmission ? (
                <Spinner />
              ) : (
                data && (
                  <audio src={`data:audio/wav;base64,${data}`} controls>
                    <source />
                  </audio>
                )
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className={!liked ? "text-red-400" : "text-green-400"}>
              {message}
            </div>
            <div className="flex justify-end">
              <Button color="white" disabled={!data} onClick={handleLike}>
                <FaRegThumbsUp color={liked ? "green" : "gray"} size="20px" />
              </Button>
              <Button color="white" disabled={!data} onClick={handleDislike}>
                <FaRegThumbsDown
                  color={disliked ? "red" : "gray"}
                  size="20px"
                />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
