import React, { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

function AudioToggle({ output }: { output: string | null | "" }) {
  let outputURL = output;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  let disabled = outputURL === "";
  if (outputURL === null) return null;
  return (
    <>
      <button
        disabled={disabled}
        onClick={togglePlay}
        className="mr-3 hover:text-blue-700 transition duration-150 ease-in-out disabled:text-gray-400"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <audio
        ref={audioRef}
        src={outputURL!}
        onEnded={() => setIsPlaying(false)}
      />
    </>
  );
}

export default AudioToggle;
