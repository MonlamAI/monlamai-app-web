export const amplifyMedia = (mediaElement, volume, settingRef) => {
  if (!settingRef.current) {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(mediaElement);
    const gainNode = audioContext.createGain();

    gainNode.gain.value = volume; // Set the initial gain value based on volume

    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    settingRef.current = { audioContext, gainNode, source };
  } else {
    settingRef.current.gainNode.gain.value = volume;
  }
};
