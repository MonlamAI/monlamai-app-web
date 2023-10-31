import React, { useState, useEffect } from "react";

const Waveform = ({ url, data }, ref) => {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    console.log(url);
    setPlaying(!playing);
  };

  return (
    <div className="wave-container">
      <audio
        id="track"
        src={url}
        controls
        ref={ref}
        hidden={!data}
        onPlay={handlePlay}
      >
        <source />
      </audio>
    </div>
  );
};

export default React.forwardRef(Waveform);
