import React, { useEffect, useRef, useState } from "react";

const RecordingAnimation = () => {
  const canvasRef = useRef(null);
  const [animationId, setAnimationId] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const getGradient = (ctx, canvas) => {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#f4a5f4"); // Magenta
    gradient.addColorStop(0.5, "#9eeedf"); // Cyan
    gradient.addColorStop(1, "#91c1f6"); // Blue
    return gradient;
  };

  const generateBars = (timestamp) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!startTime) setStartTime(timestamp);
    const elapsedTime = timestamp - startTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerY = canvas.height / 2;
    const barWidth = 8;
    const barGap = 2;
    const numBars = Math.floor(canvas.width / (barWidth + barGap));

    ctx.fillStyle = getGradient(ctx, canvas);

    for (let i = 0; i < numBars; i++) {
      const x = i * (barWidth + barGap);
      // Slow down the animation by reducing the time factor
      const height =
        Math.abs(Math.sin(i * 0.2 + elapsedTime * 0.0005)) *
        canvas.height *
        0.8;
      const y = centerY - height / 2;

      ctx.fillRect(x, y, barWidth, height);
    }

    setAnimationId(requestAnimationFrame(generateBars));
  };

  useEffect(() => {
    generateBars();
    return () => cancelAnimationFrame(animationId); // Cleanup the animation on component unmount
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="flex justify-center items-center m-0 p-0 font-sans">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default RecordingAnimation;
