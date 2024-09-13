import React, { useState, useEffect } from "react";

interface TimerProps {
  start: boolean;
  stop: boolean;
}

const Timer: React.FC<TimerProps> = ({ start, stop }) => {
  const [timeLeft, setTimeLeft] = useState(120); // 120 seconds = 2 minutes
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (start && !stop) {
      if (intervalId) return; // Avoid multiple intervals

      const id = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      setIntervalId(id);
    }

    if (stop && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [start, stop, intervalId]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const isWarning = timeLeft <= 15 && timeLeft > 0; // 1:45 = 15 seconds left

  return (
    <div className="flex items-center justify-center">
      <div className={`text-4xl font-bold ${isWarning ? "text-red-500" : ""}`}>
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default Timer;
