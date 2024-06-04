import { useFetcher } from "@remix-run/react";
import { Button } from "flowbite-react";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { BiPause } from "react-icons/bi";
import { FaPause } from "react-icons/fa6";
import { RxSpeakerLoud } from "react-icons/rx";
import { ICON_SIZE } from "~/helper/const";

function useAudioPlayer(audioRef, fetcherData) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (fetcherData) {
      audioRef.current?.play();
      setIsPlaying(true);
    }
    return () => {
      if (!audioRef.current?.paused) {
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    };
  }, [fetcherData, audioRef]);

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  return { isPlaying, pauseAudio };
}

function Speak({
  text,
  getText,
}: {
  text: string | null;
  getText?: () => string;
}) {
  const fetcher = useFetcher();
  const audioRef = useRef<HTMLAudioElement>(null);

  const { isPlaying, pauseAudio } = useAudioPlayer(audioRef, fetcher.data);

  const handlePlayClick = () => {
    const url = "/api/tts";
    const sourceText = getText ? getText() : text;
    fetcher.submit({ sourceText }, { action: url, method: "POST" });
  };

  const audioSourceUrl = useMemo(() => {
    return fetcher.data ? fetcher.data?.data : undefined;
  }, [fetcher.data]);

  return (
    <>
      {isPlaying ? (
        <div onClick={pauseAudio} className="flex items-center ">
          <FaPause size={ICON_SIZE} />
        </div>
      ) : (
        <div
          color="white"
          onClick={handlePlayClick}
          className={`flex items-center cursor-pointer ${
            fetcher.state !== "idle" ? "animate-pulse" : ""
          }`}
        >
          <RxSpeakerLoud size={ICON_SIZE} />
          {fetcher.state !== "idle" && (
            <div className="speaker_loading ml-2"></div>
          )}
        </div>
      )}
      {fetcher.data && (
        <audio
          src={audioSourceUrl}
          ref={audioRef}
          onEnded={() => pauseAudio()}
        ></audio>
      )}
    </>
  );
}

export default Speak;
