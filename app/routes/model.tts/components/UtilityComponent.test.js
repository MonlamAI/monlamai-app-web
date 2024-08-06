import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { TtsSubmitButton } from './UtilityComponents';
import uselitteraTranlation from '~/component/hooks/useLitteraTranslation';

jest.mock('~/component/hooks/useLitteraTranslation');

describe('TtsSubmitButton', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        uselitteraTranlation.mockReturnValue({
            translation: {
                synthesis: 'Synthesize',
            },
            locale: 'en_US',
        });
    });
    const defaultProps = {
        selectedTool: 'text',
        trigger: jest.fn(),
        submitFile: jest.fn(),
        charCount: 10,
        CHAR_LIMIT: 1000,
        disabled: false,
    };

    it('renders the component correctly', () => {
        render(<TtsSubmitButton {...defaultProps} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByText('Synthesize')).toBeInTheDocument();
    });

    it('disables the button when charCount exceeds CHAR_LIMIT', () => {
        render(<TtsSubmitButton {...defaultProps} charCount={1100} />);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('disables the button when selectedTool is "document" and disabled is true', () => {
        render(<TtsSubmitButton {...defaultProps} selectedTool="document" disabled={true} />);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('triggers the correct function based on selectedTool', () => {
        const triggerMock = jest.fn();
        const submitFileMock = jest.fn();

        const { rerender } = render(
            <TtsSubmitButton
                {...defaultProps}
                trigger={triggerMock}
                submitFile={submitFileMock}
            />
        );

        fireEvent.click(screen.getByRole('button'));
        expect(triggerMock).toHaveBeenCalledTimes(1);
        expect(submitFileMock).not.toHaveBeenCalled();

        rerender(
            <TtsSubmitButton
                {...defaultProps}
                selectedTool="document"
                trigger={triggerMock}
                submitFile={submitFileMock}
            />
        );

        fireEvent.click(screen.getByRole('button'));
        expect(submitFileMock).toHaveBeenCalledTimes(1);
    });

    it('applies the correct class based on locale', () => {
        const { rerender } = render(<TtsSubmitButton {...defaultProps} />);
        expect(screen.getByRole('button')).toHaveClass('font-poppins');

        uselitteraTranlation.mockReturnValue({
            translation: {
                synthesis: 'Synthesize',
            },
            locale: 'bo_TI',
        });

        rerender(<TtsSubmitButton {...defaultProps} />);
        expect(screen.getByRole('button')).toHaveClass('font-monlam');
    });
});