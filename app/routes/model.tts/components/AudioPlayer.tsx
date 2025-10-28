// components/AudioPlayer.jsx
import React, { useEffect, useRef, useState } from "react";
import { MdPlayArrow, MdPause, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import useLocalStorage from "~/component/hooks/useLocaleStorage";
import { useWavesurfer } from "@wavesurfer/react";

type AudioPlayerProps = { audioURL: string };
const AudioPlayer = ({ audioURL }: AudioPlayerProps) => {
  const [playbackRate, setPlaybackRate] = useState(1); // 1, 1.25, 1.5, 2, 0.5 (default 1)
  const [volume, setVolume] = useLocalStorage("volume", 1);

  const containerRef = useRef(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    // Prefer MediaElement backend for broad codec support (webm/m4a)
    media: audioElRef.current as any,
    url: audioURL,
    barHeight: 12,
    cursorWidth: 0,
    waveColor: "#5290F4",
    progressColor: "#1E3A8A",
    barGap: 4,
    barWidth: 4,
  });
  const maxDuration = wavesurfer?.getDuration();

  const changePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2, 0.5];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];
    setPlaybackRate(newRate);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurfer) {
      wavesurfer.setVolume(newVolume);
    }
  };

  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.setPlaybackRate(playbackRate);
    }
  }, [playbackRate, wavesurfer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="w-full max-w-[560px] mx-auto px-3 py-3 flex flex-col gap-3">
      {/* Top controls: volume + playback rate */}
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          {volume > 0 ? (
            <MdVolumeUp className="text-light_text-default dark:text-primary-500" size={20} />
          ) : (
            <MdVolumeOff className="text-light_text-default dark:text-primary-500" size={20} />
          )}
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={handleVolumeChange}
            className="w-28 h-1.5 appearance-none bg-gray-300 dark:bg-primary-500 rounded-full"
          />
        </div>
        <button
          className="px-2 py-0.5 rounded-full border text-light_text-default dark:text-primary-500"
          onClick={changePlaybackRate}
        >
          <span>{playbackRate} X</span>
        </button>
      </div>
      <audio ref={audioElRef} src={audioURL} preload="auto" style={{ display: "none" }} />
      {/* Main row: play/pause + scrubber */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => wavesurfer?.playPause()}
          className="text-dark_text-default dark:text-light_text-default rounded-full bg-secondary-700 dark:bg-primary-500"
        >
          {isPlaying ? <MdPause size={36} /> : <MdPlayArrow size={36} />}
        </button>
        <div className="flex flex-1 items-center gap-3">
          <div className="text-sm w-10 text-right">
            {formatTime(typeof currentTime === 'number' ? currentTime : 0)}
          </div>
          <input
            type="range"
            min="0"
            max={Math.floor((maxDuration ?? 0))}
            step="0.1"
            value={typeof currentTime === 'number' ? currentTime : 0}
            onChange={(e) => {
              const newTime = parseFloat(e.target.value);
              wavesurfer?.seekTo(maxDuration ? (newTime / maxDuration) : 0);
            }}
            className="flex-1 h-1.5 appearance-none bg-gray-300 dark:bg-primary-500 rounded-full"
          />
          <div className="text-sm w-10">
            {formatTime(Math.floor(maxDuration ?? 0))}
          </div>
        </div>
      </div>
      {/* Keep an invisible container for wavesurfer requirements */}
      <div className="hidden" ref={containerRef} />
    </div>
  );
};

export default AudioPlayer;
