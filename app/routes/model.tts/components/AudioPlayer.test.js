import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AudioPlayer from "./AudioPlayer";
import { useWavesurfer } from "@wavesurfer/react";
import { MdPlayArrow, MdPause } from "react-icons/md";
import useLocalStorage from "~/component/hooks/useLocaleStorage";
import { set } from "date-fns";

// Mock the necessary modules
jest.mock("@wavesurfer/react", () => ({
    useWavesurfer: jest.fn(),
}));

jest.mock("react-icons/md", () => ({
    MdPlayArrow: jest.fn(() => <div>Play</div>),
    MdPause: jest.fn(() => <div>Pause</div>),
}));

jest.mock("~/component/hooks/useLocaleStorage", () =>
    jest.fn(() => [1, jest.fn()])
);
jest.mock("~/component/utils/audioGain", () => ({
    amplifyMedia: jest.fn(),
}));

describe("AudioPlayer", () => {
    const audioURL = "test-audio.mp3";

    const wavesurferMock = {
        playPause: jest.fn(),
        seekTo: jest.fn(),
        setPlaybackRate: jest.fn(),
        getDuration: jest.fn(() => 120),
        getMediaElement: jest.fn(() => ({ crossOrigin: null })),
    };

    beforeEach(() => {
        useWavesurfer.mockReturnValue({
            wavesurfer: wavesurferMock,
            isPlaying: false,
            currentTime: 0,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders AudioPlayer component", () => {
        render(<AudioPlayer audioURL={audioURL} />);
        expect(screen.getByText("1 X")).toBeInTheDocument();
        expect(screen.getByText("0:00")).toBeInTheDocument();
        expect(screen.getByText("2:00")).toBeInTheDocument();
    });

    it("toggles playback rate when button is clicked", () => {
        render(<AudioPlayer audioURL={audioURL} />);
        const button = screen.getByText("1 X");
        fireEvent.click(button);
        expect(screen.getByText("1.25 X")).toBeInTheDocument();
        fireEvent.click(button);
        expect(screen.getByText("1.5 X")).toBeInTheDocument();
        fireEvent.click(button);
        expect(screen.getByText("2 X")).toBeInTheDocument();
        fireEvent.click(button);
        expect(screen.getByText("0.5 X")).toBeInTheDocument();
        fireEvent.click(button);
        expect(screen.getByText("1 X")).toBeInTheDocument();
    });

    it("plays and pauses the audio when the play/pause button is clicked", () => {
        render(<AudioPlayer audioURL={audioURL} />);
        const button = screen.getByText("Play");
        fireEvent.click(button);
        expect(wavesurferMock.playPause).toHaveBeenCalled();
    });

    it("changes the volume when the volume slider is adjusted", () => {
        const mockSetVolume = jest.fn();
        useLocalStorage.mockReturnValue([1, mockSetVolume]);
        render(<AudioPlayer audioURL={audioURL} />);
        const volumeSlider = screen.getAllByRole("slider")[0];
        fireEvent.change(volumeSlider, { target: { value: "0.5" } });
        expect(mockSetVolume).toHaveBeenCalledWith
    });

    it("seeks to a new time when the seek slider is adjusted", () => {
        render(<AudioPlayer audioURL={audioURL} />);
        const seekSlider = screen.getAllByRole("slider")[1];
        fireEvent.change(seekSlider, { target: { value: "60" } });
        expect(wavesurferMock.seekTo).toHaveBeenCalledWith(0.5);
    });

    it("displays the correct current time and duration", () => {
        render(<AudioPlayer audioURL={audioURL} />);
        expect(screen.getByText("0:00")).toBeInTheDocument();
        expect(screen.getByText("2:00")).toBeInTheDocument();
    });
});
