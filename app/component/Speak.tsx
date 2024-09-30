import { useFetcher } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { FaPause } from "react-icons/fa6";
import { Spinner } from "flowbite-react";
import { FaVolumeUp } from "react-icons/fa";

type propType = {
  text: string | null;
  lang: "bo" | "en";
  isDark?: boolean;
};

function Speak({ text, lang, isDark }: propType) {
  const fetcher = useFetcher();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingEnglish, setPlayingEnglish] = useState(false);
  const [audioCache, setAudioCache] = useState<{ [key: string]: string }>({}); // Cache for audio data

  function speak(eng_text) {
    if (playingEnglish) {
      setPlayingEnglish(false);
    }
    if ("speechSynthesis" in window) {
      if (window.speechSynthesis.speaking) {
        // If already speaking, cancel the current speech
        window.speechSynthesis.cancel();
      } else {
        // If not speaking, play the new text
        const utterance = new SpeechSynthesisUtterance(eng_text);
        utterance.lang = "en-US"; // Set language, adjust as needed
        window.speechSynthesis.speak(utterance);
        setPlayingEnglish(true);
        utterance.onend = () => {
          setPlayingEnglish(false);
        };
      }
    } else {
      console.error("Text-to-Speech is not supported in this browser.");
    }
  }

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    if (fetcher.data) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
    return () => {
      if (!audioRef.current?.paused) {
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    };
  }, [fetcher.data, audioRef]);
  const handlePlayClick = () => {
    if (lang == "en") speak(text);
    else if (audioCache[text]) {
      // If cached, use the cached audio URL
      audioRef.current?.setAttribute("src", audioCache[text]);
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      console.log(text)
      // Otherwise, fetch the new audio and cache it
      fetcher.submit({ input: text }, { action: "/api/tts", method: "POST" });
    }
  };
  const audioSourceUrl = fetcher.data?.output;
  if (audioSourceUrl && !audioCache[text]) {
    // Cache the fetched audio URL if not already cached
    setAudioCache((prevCache) => ({ ...prevCache, [text]: audioSourceUrl }));
  }
  return (
    <>
      {isPlaying || playingEnglish ? (
        <button
          onClick={pauseAudio}
          type="button"
          className="flex items-center "
        >
          <FaPause size={20} className="dark:fill-primary-500" />
        </button>
      ) : (
        <>
          {fetcher.state !== "idle" ? (
            <Spinner
              size="md"
              className={"fill-secondary-500 dark:fill-primary-500"}
            />
          ) : (
            <button
              type="button"
              onClick={handlePlayClick}
              id="audioplay"
              className="flex items-center cursor-pointer"
            >
              <FaVolumeUp
                size={20}
                className="text-light_text-secondary dark:text-dark_text-secondary"
                style={{ color: isDark ? "black" : "" }}
              />
            </button>
          )}
        </>
      )}
      {audioCache[text] && (
        <audio
          src={audioCache[text]}
          ref={audioRef}
          onEnded={() => pauseAudio()}
        >
          <track kind="captions" />
        </audio>
      )}
    </>
  );
}

export default Speak;
