import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square } from 'lucide-react';

const ContinuousPlayer = ({ audioUrls }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStopped, setIsStopped] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio());
  const progressInterval = useRef(null);

  // Setup audio chain
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      if (currentIndex < audioUrls.length - 1 && !isStopped) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsPlaying(false);
        setIsStopped(true);
        setCurrentIndex(0);
      }
    };

    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('ended', handleEnded);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentIndex, audioUrls.length, isStopped]);

  // Handle audio source changes
  useEffect(() => {
    if (audioUrls.length > 0) {
      audioRef.current.src = audioUrls[currentIndex];
      
      if (isPlaying && !isStopped) {
        audioRef.current.play();
      }
    }
  }, [currentIndex, audioUrls, isPlaying, isStopped]);

  // Update progress
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        const duration = audioRef.current.duration || 0;
        const currentTime = audioRef.current.currentTime || 0;
        setProgress((currentTime / duration) * 100);
      }, 100);
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (isStopped) {
      setIsStopped(false);
      setCurrentIndex(0);
    }
    
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setIsStopped(true);
    setCurrentIndex(0);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <button
            onClick={handlePlayPause}
            className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <button
            onClick={handleStop}
            className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
            aria-label="Stop"
          >
            <Square size={24} />
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Track {currentIndex + 1} of {audioUrls.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 text-sm text-gray-500">
        {isPlaying ? 'Playing' : isStopped ? 'Stopped' : 'Paused'}
      </div>
    </div>
  );
};

export default ContinuousPlayer;