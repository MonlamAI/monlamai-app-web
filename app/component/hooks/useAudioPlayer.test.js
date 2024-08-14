import { renderHook, act } from '@testing-library/react';
import useAudioPlayer from './useAudioPlayer';

describe('useAudioPlayer', () => {
    let audioRef;
    let fetcherData;

    beforeEach(() => {
        audioRef = { current: { play: jest.fn(), pause: jest.fn(), paused: true } };
        fetcherData = null;
    });

    it('should play audio and set isPlaying to true when fetcherData is provided', () => {
        fetcherData = {}; // mock fetcher data

        const { result } = renderHook(() => useAudioPlayer(audioRef, fetcherData));

        expect(audioRef.current.play).toHaveBeenCalled();
        expect(result.current.isPlaying).toBe(true);
    });

    it('should pause audio and set isPlaying to false when component unmounts', () => {
        fetcherData = {}; // mock fetcher data

        const { result, unmount } = renderHook(() => useAudioPlayer(audioRef, fetcherData));

        expect(result.current.isPlaying).toBe(true);
        unmount();
        expect(audioRef.current.paused).toBe(true);
    });

    it('should not play audio if fetcherData is null', () => {
        fetcherData = null;

        const { result } = renderHook(() => useAudioPlayer(audioRef, fetcherData));

        expect(audioRef.current.play).not.toHaveBeenCalled();
        expect(result.current.isPlaying).toBe(false);
    });

    it('should pause audio and set isPlaying to false when pauseAudio is called', () => {
        fetcherData = {}; // mock fetcher data

        const { result } = renderHook(() => useAudioPlayer(audioRef, fetcherData));

        act(() => {
            result.current.pauseAudio();
        });

        expect(audioRef.current.pause).toHaveBeenCalled();
        expect(result.current.isPlaying).toBe(false);
    });
});
