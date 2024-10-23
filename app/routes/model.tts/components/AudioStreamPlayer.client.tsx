import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

function AudioQueuePlayer({ audioList }) {
  const queue = audioList;
  const [currentIndex, setCurrentIndex] = useState(0); // Current track index
  const [isPlaying, setIsPlaying] = useState(false); // Track whether audio is playing or paused
  const [isBuffering, setIsBuffering] = useState(false); // Buffering state
  const audioRef = useRef(null); // Ref for audio element

  // Handle playing the next track when the current one ends
  const handleAudioEnd = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to next track
    } else {
      setIsBuffering(true); // Start buffering if no more tracks
      setIsPlaying(false); // Pause if queue is empty
    }
  };

  // Play or pause the audio when the play/pause button is clicked
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false); // Toggle playing state

      } else {
        setCurrentIndex(0)
        audioRef.current.play();
        setIsPlaying(true); // Toggle playing state
      }
    }
  };

  // Automatically handle queue updates, start playing if new items are added
  useEffect(() => {
    // If 'done' is in the queue, stop playing
    if (queue[currentIndex] === 'done') {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      return; // Exit early to avoid playing further
    }

    // Start playing if the queue has updated and we aren't currently playing
    if (queue.length > 0 && !isPlaying) {
      setIsBuffering(false);
      setCurrentIndex(0); // Reset to first track on update
    }

    // Auto play if new audio is added to the queue and the component is already playing
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [audioList, queue, currentIndex, isPlaying]);

  // Ensure playback starts when component mounts
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [isPlaying]);

  return (
    <div>
      <audio
        ref={audioRef}
        src={queue[currentIndex]}
        onEnded={handleAudioEnd}
      />
      <button onClick={togglePlayPause}>
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
    </div>
  );
}

export default AudioQueuePlayer;
