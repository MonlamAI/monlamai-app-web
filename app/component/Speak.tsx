import { useFetcher } from "@remix-run/react";
import { Button } from "flowbite-react";
import React, { useEffect, useMemo } from "react";
import { BiPause } from "react-icons/bi";
import { RxSpeakerLoud } from "react-icons/rx";

function Speak({
  text,
  getText,
}: {
  text: string | null;
  getText?: () => string;
}) {
  const fetcher = useFetcher();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const pauseClick = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };
  const handleClick = () => {
    let url = "/model/tts";
    let sourceText = getText ? getText() : text;
    fetcher.submit(
      {
        sourceText,
      },
      { action: url, method: "POST" }
    );
  };
  useEffect(() => {
    if (fetcher.data) {
      audioRef.current?.play();
      setIsPlaying(true);
    }
    return () => {
      if (!audioRef.current?.paused) {
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    };
  }, [fetcher.data]);
  let data = fetcher?.data;
  let sourceUrl = useMemo(() => {
    return data ? `data:audio/wav;base64,${data}` : undefined;
  }, [data]);
  return (
    <>
      {isPlaying ? (
        <Button onClick={pauseClick}>
          <BiPause />
        </Button>
      ) : (
        <Button
          color="white"
          onClick={handleClick}
          isProcessing={fetcher.state !== "idle"}
        >
          <RxSpeakerLoud />
        </Button>
      )}
      {fetcher.data && (
        <audio
          id="audio"
          src={sourceUrl}
          hidden
          ref={audioRef}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </>
  );
}

export default Speak;
