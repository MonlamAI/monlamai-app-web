import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSearchParams } from '@remix-run/react';
import OCR from './OCR';
import ListInput from '~/component/ListInput';
import SingleInputSection from './SingleInputSection';
import FileInputSection from './FileInputSection';
import { resetFetcher } from '~/component/utils/resetFetcher';
import HeaderComponent from '~/component/HeaderComponent';

// Mock the imports
jest.mock('@remix-run/react', () => ({
    useFetcher: jest.fn().mockReturnValue({
        data: {},
        state: 'idle',
        submit: jest.fn(),
    }),
    useSearchParams: jest.fn(),
}));

jest.mock('~/component/utils/resetFetcher', () => ({
    resetFetcher: jest.fn(),
}));

jest.mock('~/component/ListInput', () => (props) => (
    <div>
        <button onClick={() => props.setSelectedTool('image')}>Select Image</button>
        <button onClick={() => props.setSelectedTool('file')}>Select File</button>
    </div>
));

jest.mock('~/component/HeaderComponent', () => (props) => (
    <div>{props.model} - {props.selectedTool}</div>
));

jest.mock('./SingleInputSection', () => () => <div>Single Input Section</div>);
jest.mock('./FileInputSection', () => () => <div>File Input Section</div>);

describe('OCR Component', () => {
    beforeEach(() => {
        // Reset mock implementation
        jest.clearAllMocks();
    });

    it('renders the correct component based on the selected tool', () => {
        // Mock the useSearchParams hook
        useSearchParams.mockReturnValue([
            new URLSearchParams('tool=image'),
            jest.fn(),
        ]);

        render(<OCR />);

        // Check that the correct component is rendered
        expect(screen.getByText('Single Input Section')).toBeInTheDocument();
        expect(screen.queryByText('File Input Section')).not.toBeInTheDocument();
    });

    it('renders the correct component based on the selected tool', () => {
        // Mock the useSearchParams hook
        useSearchParams.mockReturnValue([
            new URLSearchParams('tool=file'),
            jest.fn(),
        ]);

        render(<OCR />);

        // Check that the correct component is rendered
        expect(screen.queryByText('Single Input Section')).not.toBeInTheDocument();
        expect(screen.getByText('File Input Section')).toBeInTheDocument();
    });

    it('should render the correct section based on selected tool', () => {
        let searchParams = new URLSearchParams('tool=image');
        const setSearchParams = jest.fn((newParams) => {
            searchParams = newParams;
        });

        useSearchParams.mockReturnValue([searchParams, setSearchParams]);

        const { rerender } = render(<OCR />);

        // Assert initial state
        expect(screen.getByText('Single Input Section')).toBeInTheDocument();
        expect(screen.queryByText('File Input Section')).not.toBeInTheDocument();

        // Simulate a button click to change the tool to 'file'
        fireEvent.click(screen.getByText('Select File'));

        // Ensure setSelectedTool was called and updated the URLSearchParams
        expect(setSearchParams).toHaveBeenCalledWith(expect.any(Function));
        const updatedParams = new URLSearchParams();
        updatedParams.set('tool', 'file');
        setSearchParams(updatedParams);

        // Update the mock to reflect the new search params
        useSearchParams.mockReturnValue([
            new URLSearchParams('tool=file'),
            setSearchParams,
        ]);

        // Rerender the component
        rerender(<OCR />);

        // Assert the new state
        expect(screen.getByText('File Input Section')).toBeInTheDocument();
        expect(screen.queryByText('Single Input Section')).not.toBeInTheDocument();
    });
});
