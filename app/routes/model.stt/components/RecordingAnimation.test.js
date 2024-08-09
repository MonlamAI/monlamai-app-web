import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordingAnimation from './RecordingAnimation';

describe('RecordingAnimation', () => {
    it('renders the canvas element correctly', () => {
        const { container } = render(<RecordingAnimation />);
        const canvasElement = container.querySelector('canvas');
        expect(canvasElement).toBeInTheDocument();
    });

    it('calls requestAnimationFrame for the animation', () => {
        const requestAnimationFrameMock = jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
            setTimeout(() => callback(0), 16); // simulate 60fps
            return 1;
        });
        const cancelAnimationFrameMock = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => { });

        render(<RecordingAnimation />);

        expect(requestAnimationFrameMock).toHaveBeenCalled();

        requestAnimationFrameMock.mockRestore();
        cancelAnimationFrameMock.mockRestore();
    });
});
