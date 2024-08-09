import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import AudioRecorder from "./AudioRecorder";
import { getBrowser } from "~/component/utils/getBrowserDetail";

// Mock dependencies
jest.mock("react-audio-visualize", () => ({
    LiveAudioVisualizer: (props) => <div data-testid="live-audio-visualizer" {...props}>audio visualizer</div>,
}));
jest.mock("~/component/utils/getBrowserDetail", () => ({
    getBrowser: jest.fn(),
}));
jest.mock("~/routes/model.tts/components/AudioPlayer", () => () => <div>AudioPlayer</div>);
jest.mock("react-icons/bs", () => ({
    BsFillMicFill: () => <div data-testid="mic-icon" />,
    BsFillStopFill: () => <div data-testid="stop-icon" />,
}))
// const mockGetBrowser = jest.fn();
const mockUploadAudio = jest.fn();
// beforeAll(() => {
//     // Mock navigator.permissions.query
//     Object.defineProperty(navigator, 'permissions', {
//         value: {
//             query: jest.fn().mockImplementation(({ name }) => {
//                 if (name === 'microphone') {
//                     return Promise.resolve({ state: 'granted' }); // Change this to 'prompt' or 'denied' to test different cases
//                 }
//                 return Promise.reject(new Error('Permission not supported'));
//             }),
//         },
//         writable: true,
//     });

//     // Mock navigator.mediaDevices.getUserMedia
//     Object.defineProperty(navigator, 'mediaDevices', {
//         value: {
//             getUserMedia: jest.fn().mockResolvedValue(() => ({ getTracks: jest.fn(() => []), })),
//         },
//         writable: true,
//     });
// });
describe("AudioRecorder", () => {
    // Create a mock MediaStream
    const mockMediaStream = {
        active: true,
        id: 'some-unique-id',
        getAudioTracks: () => [AudioTrack],
        getVideoTracks: () => [],
        getTracks: () => [AudioTrack],
        oninactive: null,
        onaddtrack: null,
        onremovetrack: null,
        onactive: null,
        clone: () => MediaStream
    };

    // Mock implementation for `navigator.permissions.query`
    const mockQuery = jest.fn();

    // Mock implementation for `navigator.mediaDevices.getUserMedia`
    const mockGetUserMedia = jest.fn();

    beforeEach(() => {
        global.navigator.permissions = {
            query: mockQuery,
        };

        global.navigator.mediaDevices = {
            getUserMedia: mockGetUserMedia,
        };
        getBrowser.mockReturnValue("chrome");

        global.MediaRecorder = jest.fn().mockImplementation((stream, options) => {
            return {
                start: jest.fn(),
                stop: jest.fn(),
                ondataavailable: jest.fn().mockReturnValue({ data: new Blob() }),
                state: 'inactive',
                stream,
                mimeType: options.mimeType,
            };
        });

        jest.clearAllMocks();
    });

    it("renders the component", () => {
        render(
            <AudioRecorder
                audioURL={null}
                uploadAudio={mockUploadAudio}
                isLoading={false}
                isUploading={false}
            />
        );
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByTestId("mic-icon")).toBeInTheDocument();
    });

    it("toggles the recording state", async () => {
        mockQuery.mockResolvedValueOnce({ state: 'granted' });

        // Mock `navigator.mediaDevices.getUserMedia` to return a MediaStream
        mockGetUserMedia.mockResolvedValueOnce(mockMediaStream);
        render(
            <AudioRecorder
                audioURL={null}
                uploadAudio={mockUploadAudio}
                isLoading={false}
                isUploading={false}
            />
        );

        const recordButton = screen.getByTestId("mic-icon");
        await act( async() => {
            fireEvent.click(recordButton);
        });
        
        expect(screen.getByTestId("live-audio-visualizer")).toBeInTheDocument();
        const stopRecordingButton = screen.getByTestId("stop-icon");
        await act( async() => {
        fireEvent.click(stopRecordingButton);
        });
        expect(screen.queryByTestId("live-audio-visualizer")).not.toBeInTheDocument();
    });

    it("handles microphone permissions", async () => {
        mockQuery.mockResolvedValueOnce({ state: 'granted' });
        // Mock `navigator.mediaDevices.getUserMedia` to return a MediaStream
        mockGetUserMedia.mockResolvedValueOnce(mockMediaStream);
        render(
            <AudioRecorder
                audioURL={null}
                uploadAudio={mockUploadAudio}
                isLoading={false}
                isUploading={false}
            />
        );

        const recordButton = screen.getByRole("button");
        await act(async () => {
            fireEvent.click(recordButton);
        });

        await waitFor(() => {
            expect(mockGetUserMedia).toHaveBeenCalled();
        });
    });

    it("should start and stop recording", async () => {
        mockQuery.mockResolvedValueOnce({ state: 'granted' });

        // Mock `navigator.mediaDevices.getUserMedia` to return a MediaStream
        mockGetUserMedia.mockResolvedValueOnce(mockMediaStream);
        render(
            <AudioRecorder
                audioURL={null}
                uploadAudio={mockUploadAudio}
                isLoading={false}
                isUploading={false}
            />
        );
        const recordButton = screen.getByTestId("mic-icon");
        await act(async () => {
            fireEvent.click(recordButton);
        })
        expect(screen.queryByText('mic-icon')).not.toBeInTheDocument()
        await act(async () => {
            fireEvent.click(screen.getByTestId("stop-icon"));
        });
        expect(screen.queryByText('stop-icon')).not.toBeInTheDocument()

    });

    it("displays the AudioPlayer component when there is an audio URL", () => {
        render(
            <AudioRecorder
                audioURL="test-audio-url"
                uploadAudio={mockUploadAudio}
                isLoading={false}
                isUploading={false}
            />
        );

        expect(screen.getByText(/AudioPlayer/i)).toBeInTheDocument();
    });
});
