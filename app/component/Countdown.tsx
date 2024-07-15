import React, { useState } from "react";
import Countdown from "react-countdown";

const ReleaseAnnouncement = () => {
  const [show, setShow] = useState(true);
  const releaseDate = new Date("2024-07-06T04:00:00Z");

  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <span>
        {days}d {hours}h {minutes}m {seconds}s
      </span>
    );
  };

  if (!show) return null;

  return (
    <div className="w-full bg-blue-500 text-white text-center p-1 shadow-md  ">
      <div className="relative">
        <h1 className="text-lg font-semibold">
          New Version Releasing on July 6th -{" "}
          <Countdown date={releaseDate} renderer={renderer} />
        </h1>
        <button
          className="absolute top-0 right-0  text-white p-1 rounded-full "
          onClick={() => setShow(false)}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ReleaseAnnouncement;
