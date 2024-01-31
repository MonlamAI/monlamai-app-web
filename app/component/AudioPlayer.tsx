import React, { useState, forwardRef, memo } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BsFillStopFill, BsPauseFill, BsPlay } from "react-icons/bs";

let timer;
function AudioPlayer(props, ref) {
  let { sourceUrl } = props;
  const [playStatus, setPlayStatus] = useState("stop");
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  function handleStop() {
    ref.current?.load();
    setPlayStatus("stop");
  }

  function togglePause() {
    if (ref.current?.paused) {
      setPlayStatus("play");
      ref.current?.play();
    } else {
      ref.current?.pause();
      setPlayStatus("pause");
    }
  }
  let percentage = currentTime !== 0 ? (currentTime / duration) * 100 : 0;
  return (
    <div className="text-4xl rounded shadow w-full" hidden={!sourceUrl}>
      <audio
        ref={ref}
        src={sourceUrl}
        onEnded={() => {
          if (timer) clearTimeout(timer);
          setPlayStatus("stop");
          timer = setTimeout(() => {
            setCurrentTime(0);
            setDuration(0);
          }, 1000);
        }}
        onTimeUpdate={() => {
          setCurrentTime(ref.current?.currentTime);
          setDuration(ref.current?.duration);
        }}
      />

      <div className="bg-white border-slate-100  dark:bg-slate-800 transition-all duration-500 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
        <div>
          <div className="relative">
            <div className="bg-slate-100 transition-all duration-500 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`bg-cyan-500 transition-all duration-500 dark:bg-cyan-400  h-2`}
                style={{ width: `${percentage}%` }}
                role="progressbar"
              ></div>
            </div>
            <div
              style={{ left: `${percentage}%` }}
              className="ring-cyan-500 transition-all duration-500 dark:ring-cyan-400 ring-2 absolute  top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow"
            >
              <div className="w-1.5 h-1.5 bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
            </div>
          </div>
          <ProgressBar max={duration} value={currentTime} />
        </div>
      </div>
      <div className="text-md bg-slate-50 text-slate-500 transition-all duration-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex items-center">
        <div className="flex-auto flex items-center justify-evenly">
          <button onClick={handleStop} type="button" aria-label="stop">
            <BsFillStopFill />
          </button>
        </div>
        <button
          onClick={togglePause}
          type="button"
          className="bg-white text-slate-900  dark:bg-slate-100 transition-all duration-500 dark:text-slate-700 flex-none  mx-auto p-1 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
          aria-label="play/pause"
        >
          {playStatus === "stop" ? (
            <BsPlay />
          ) : playStatus === "play" ? (
            <BsPauseFill />
          ) : (
            <BsPlay />
          )}
        </button>
        <div className="flex-auto flex items-center justify-evenly">
          <a
            href={sourceUrl}
            download="audio-file"
            className="rounded-lg text-2xl leading-6 font-semibold px-2 ring-2 ring-inset  text-slate-500  dark:text-slate-100  dark:ring-0 transition-all duration-500 dark:bg-slate-500"
          >
            <AiOutlineCloudDownload />
          </a>
        </div>
      </div>
    </div>
  );
}

export default memo(forwardRef(AudioPlayer));

const ProgressBar = ({ max, value }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    if (typeof time !== "number" || isNaN(time)) return "00:00";
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
      <div className="text-cyan-500 transition-all duration-500 dark:text-slate-100">
        {formatTime(value)}
      </div>
      <div className="text-slate-500 transition-all duration-500 dark:text-slate-400">
        {formatTime(max)}
      </div>
    </div>
  );
};
