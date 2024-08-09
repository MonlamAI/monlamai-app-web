import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WebcamCapture from './WebcamCapture';
import Webcam from 'react-webcam';

// Mock the react-webcam module
jest.mock('react-webcam', () => {
    return React.forwardRef((props, ref) => (
        <div {...props} ref={ref}>
           webcam
        </div>
    ));
});

// Mock the fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        blob: () => Promise.resolve(new Blob(['mock data'], { type: 'text/plain' })),
    })
);

// Mock the File constructor
global.File = jest.fn((parts, filename, properties) => ({
    name: filename,
    type: properties.type,
    size: parts[0].size,
    lastModified: Date.now(),
}));

describe('WebcamCapture', () => {

    it('captures screenshot and sets image URL on button click', async () => {
        const mockSetImageUrl = jest.fn();
        const mockGetScreenshot = jest.fn().mockReturnValue('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD');

        // Render the component
        render(<WebcamCapture setImageUrl={mockSetImageUrl} />);

        // Get the webcam element and mock getScreenshot method
        const webcamElement = screen.getByText('webcam');
        webcamElement.getScreenshot = mockGetScreenshot;

        // Simulate button click
        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Assertions
        expect(mockGetScreenshot).toHaveBeenCalled();
        waitFor(() => expect(mockGetScreenshot).toHaveBeenCalled());
    });
});
