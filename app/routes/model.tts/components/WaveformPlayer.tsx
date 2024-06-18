import React, { forwardRef, useEffect, useRef, useState } from "react";
import { MdPlayArrow, MdPause } from "react-icons/md";
import WaveSurfer from "wavesurfer.js";

const WaveformPlayer = ({ audioUrl, playbackRate }, audioRef) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const containerRef = useRef();
  const waveSurferRef = useRef(null);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      barHeight: 12,
      cursorWidth: 0,
      waveColor: "#5290F4",
      barGap: 4,
      barWidth: 4,
    });
    waveSurfer.load(audioUrl);
    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
      setDuration(waveSurfer.getDuration());
      waveSurfer.setPlaybackRate(playbackRate);
    });

    // Listen to "play" and "pause" events to accurately set isPlaying state
    waveSurfer.on("play", () => setIsPlaying(true));
    waveSurfer.on("pause", () => setIsPlaying(false));

    // Update currentTime on audioprocess
    waveSurfer.on("audioprocess", () => {
      setCurrentTime(waveSurfer.getCurrentTime());
    });

    return () => {
      waveSurfer.destroy();
    };
  }, [audioUrl]);

  useEffect(() => {
    if (waveSurferRef.current) {
      waveSurferRef.current.setPlaybackRate(playbackRate);
    }
  }, [playbackRate]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-around">
      {/* Placeholder for the waveform */}
      <div ref={containerRef} />

      <div className="flex flex-1 items-center justify-between gap-5">
        <button
          onClick={() => {
            waveSurferRef.current.playPause();
          }}
          className="text-secondary-50 dark:text-black rounded-full bg-secondary-700 dark:bg-secondary-50"
        >
          {isPlaying ? <MdPause size={36} /> : <MdPlayArrow size={36} />}
        </button>
        <div className="flex flex-1 justify-center items-center">
          <div className="text-sm">{currentTime.toFixed(2)}</div>
          <input
            type="range"
            min="0"
            max={duration}
            step="0.1"
            value={currentTime}
            onChange={(e) => {
              const newTime = parseFloat(e.target.value);
              waveSurferRef.current.seekTo(newTime / duration);
              setCurrentTime(newTime);
            }}
            className="mx-2 h-1 w-full appearance-none bg-gray-300 rounded-full"
          />
          <div className="text-sm">{duration.toFixed(2)}</div>
        </div>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source src={audioUrl} type="audio/*" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default forwardRef(WaveformPlayer);
