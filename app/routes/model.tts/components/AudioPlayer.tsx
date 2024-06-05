// components/AudioPlayer.jsx
import React, { useEffect, useRef, useState } from "react";
import { MdPlayArrow, MdPause } from "react-icons/md";
import WaveSurfer from "wavesurfer.js";

const AudioPlayer = ({ audioURL }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [playbackRate, setPlaybackRate] = useState(1); // 1, 1.25, 1.5, 2, 0.5 (default 1)

  const containerRef = useRef();
  const waveSurferRef = useRef(null);
  const audioRef = useRef();

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
    waveSurfer.load(audioURL);
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
  }, [audioURL]);

  const changePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2, 0.5];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];
    if (audioRef.current) audioRef.current.playbackRate = newRate;
    setPlaybackRate(newRate);
  };

  useEffect(() => {
    if (waveSurferRef.current) {
      waveSurferRef.current.setPlaybackRate(playbackRate);
    }
  }, [playbackRate]);

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <div className="p-4 w-full h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg
            className="w-6 h-6 text-light_text-default dark:text-dark_text-secondary"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M15 6.037c0-1.724-1.978-2.665-3.28-1.562L7.638 7.933H6c-1.105 0-2 .91-2 2.034v4.066c0 1.123.895 2.034 2 2.034h1.638l4.082 3.458c1.302 1.104 3.28.162 3.28-1.562V6.037Z" />
            <path
              fill-rule="evenodd"
              d="M16.786 7.658a.988.988 0 0 1 1.414-.014A6.135 6.135 0 0 1 20 12c0 1.662-.655 3.17-1.715 4.27a.989.989 0 0 1-1.414.014 1.029 1.029 0 0 1-.014-1.437A4.085 4.085 0 0 0 18 12a4.085 4.085 0 0 0-1.2-2.904 1.029 1.029 0 0 1-.014-1.438Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            type="range"
            min={1}
            max={20}
            step={0.1}
            value={volume}
            onChange={handleVolumeChange}
            className="h-0.5 appearance-none bg-black dark:bg-secondary-50"
          />
          <svg
            className="w-6 h-6 text-light_text-default dark:text-dark_text-secondary"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M13 6.037c0-1.724-1.978-2.665-3.28-1.562L5.638 7.933H4c-1.105 0-2 .91-2 2.034v4.066c0 1.123.895 2.034 2 2.034h1.638l4.082 3.458c1.302 1.104 3.28.162 3.28-1.562V6.037Z" />
            <path
              fill-rule="evenodd"
              d="M14.786 7.658a.988.988 0 0 1 1.414-.014A6.135 6.135 0 0 1 18 12c0 1.662-.655 3.17-1.715 4.27a.989.989 0 0 1-1.414.014 1.029 1.029 0 0 1-.014-1.437A4.085 4.085 0 0 0 16 12a4.085 4.085 0 0 0-1.2-2.904 1.029 1.029 0 0 1-.014-1.438Z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M17.657 4.811a.988.988 0 0 1 1.414 0A10.224 10.224 0 0 1 22 12c0 2.807-1.12 5.35-2.929 7.189a.988.988 0 0 1-1.414 0 1.029 1.029 0 0 1 0-1.438A8.173 8.173 0 0 0 20 12a8.173 8.173 0 0 0-2.343-5.751 1.029 1.029 0 0 1 0-1.438Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <button
          className="flex item-center text-lg p-2 font-semibold text-light_text-default dark:text-dark_text-secondary hover:bg-neutral-300 dark:hover:bg-primary-700 rounded-md"
          onClick={changePlaybackRate}
        >
          <span>{playbackRate} X</span>
        </button>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        {/* Placeholder for the waveform */}
        <div className="my-auto" ref={containerRef} />

        <div className="flex items-center justify-between gap-5">
          <button
            onClick={() => {
              waveSurferRef.current.playPause();
            }}
            className=" text-dark_text-default dark:text-light_text-default rounded-full bg-secondary-700 dark:bg-dark_text-default"
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
          <source src="your-audio-file.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default AudioPlayer;
