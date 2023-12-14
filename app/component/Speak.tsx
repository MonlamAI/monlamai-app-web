import { useFetcher } from "@remix-run/react";
import { Button } from "flowbite-react";
import React, { useEffect, useMemo } from "react";
import { RxSpeakerLoud } from "react-icons/rx";

function Speak({ text }: { text: string }) {
  const fetcher = useFetcher();
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const handleClick = () => {
    let url = "/model/tts";
    fetcher.submit(
      {
        sourceText: text,
      },
      { action: url, method: "POST" }
    );
  };
  useEffect(() => {
    if (fetcher.data) {
      audioRef.current?.play();
    }
  }, [fetcher.data]);
  let data = fetcher?.data;
  let sourceUrl = useMemo(() => {
    return data ? `data:audio/wav;base64,${data}` : undefined;
  }, [data]);
  return (
    <>
      <Button
        color="white"
        onClick={handleClick}
        isProcessing={fetcher.state !== "idle"}
      >
        <RxSpeakerLoud />
      </Button>
      {fetcher.data && (
        <audio id="audio" src={sourceUrl} hidden ref={audioRef} />
      )}
    </>
  );
}

export default Speak;
