import { useEffect, useState } from "react";

export default function useAudioPlayer(audioRef: any, fetcherData: any) {
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
