import { screen, render, fireEvent } from '@testing-library/react';
import { TextOrDocumentComponent, CharacterOrFileSizeComponent, LoadingAnimation OutputDisplay, EditActionButtons, SubmitButton } from './UtilityComponent';
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import { motion } from 'framer-motion';

jest.mock('~/component/TextComponent', () => (
    jest.fn(() =>
        <div data-testid="text-component">
            TextComponent
        </div>))
);
jest.mock('~/component/FileUpload', () => (
    jest.fn(() =>
        <div data-testid="file-upload">
            FileUpload
        </div>))
);

jest.mock('~/component/hooks/useLitteraTranslation', () => ({
    __esModule: true,
    default: jest.fn()
}));

// Mock framer-motion to avoid animations during tests
jest.mock('framer-motion', () => ({
    motion: {
        p: jest.fn().mockImplementation(({ children }) => <p>{children}</p>),
    },
}));

jest.mock('flowbite-react', () => ({
    Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

describe('TextOrDocumentComponent', () => {
    const defaultProps = {
        selectedTool: 'text',
        sourceText: '',
        setSourceText: jest.fn(),
        sourceLang: 'en',
        setFile: jest.fn(),
        setInputUrl: jest.fn(),
    };

    test('renders TextComponent when selectedTool is "text"', () => {
        render(<TextOrDocumentComponent {...defaultProps} selectedTool="text" />);
        expect(screen.getByTestId('text-component')).toBeInTheDocument();
        expect(screen.queryByTestId('file-upload')).not.toBeInTheDocument();
    });

    test('renders FileUpload when selectedTool is "document"', () => {
        render(<TextOrDocumentComponent {...defaultProps} selectedTool="document" />);
        expect(screen.getByTestId('file-upload')).toBeInTheDocument();
        expect(screen.queryByTestId('text-component')).not.toBeInTheDocument();
    });

    test('renders null when selectedTool is neither "text" nor "document"', () => {
        const { container } = render(<TextOrDocumentComponent {...defaultProps} selectedTool="other" />);
        expect(container.firstChild).toBeNull();
    });
});

describe('CharacterOrFileSizeComponent', () => {
    const defaultProps = {
        selectedTool: 'text',
        charCount: 100,
        CHAR_LIMIT: 200,
        MAX_SIZE_SUPPORT: '5MB',
    };

    beforeEach(() => {
        uselitteraTranlation.mockReturnValue({
            translation: { duration: 'Duration' },
            isTibetan: false,
        });
    });

    test('renders character count for text tool', () => {
        render(<CharacterOrFileSizeComponent {...defaultProps} selectedTool="text" />);
        const spanElement = screen.getByText('100'); // character count
        expect(spanElement).toBeInTheDocument();
        expect(spanElement).toHaveStyle('color: inherit');
    });

    test('renders duration for recording or file tool', () => {
        const { rerender } = render(<CharacterOrFileSizeComponent {...defaultProps} selectedTool="recording" />);
        expect(screen.getByText(/Duration : 100/i)).toBeInTheDocument();

        rerender(<CharacterOrFileSizeComponent {...defaultProps} selectedTool="file" />);
        expect(screen.getByText(/Duration : 100/i)).toBeInTheDocument();
    });

    test('renders max size for other tools', () => {
        render(<CharacterOrFileSizeComponent {...defaultProps} selectedTool="other" />);
        expect(screen.getByText(/max size: 5MB/i)).toBeInTheDocument();
    });

    test('applies correct font class based on isTibetan', () => {
        uselitteraTranlation.mockReturnValueOnce({
            translation: { duration: 'Duration' },
            isTibetan: true,
        });
        const { container } = render(<CharacterOrFileSizeComponent {...defaultProps} />);
        expect(container.firstChild).toHaveClass('font-monlam');
    });

    test('renders character count in red if charCount exceeds CHAR_LIMIT', () => {
        render(<CharacterOrFileSizeComponent {...defaultProps} charCount={250} />);
        expect(screen.getByText(/250/i)).toHaveStyle({ color: 'red' });
    });
    test('does not render character count if charCount is not a number', () => {
        render(<CharacterOrFileSizeComponent {...defaultProps} charCount="not a number" />);
        const spanElement = screen.queryByText('not a number'); // Trying to find the incorrect charCount value
        expect(spanElement).not.toBeInTheDocument();
    });
});

describe('LoadingAnimation Component', () => {
    it('renders the loading animation', () => {
        render(<LoadingAnimation />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
});

describe('OutputDisplay Component', () => {
    it('renders nothing when edit is true', () => {
        render(<OutputDisplay edit={true} editData="" output="Test output" animate={false} targetLang="en" />);
        expect(screen.queryByText('Test output')).toBeNull();
    });

    it('renders output text when edit is false', () => {
        render(<OutputDisplay edit={false} editData="" output="Test output" animate={false} targetLang="en" />);
        expect(screen.getByText('Test output')).toBeInTheDocument();
    });

    it('renders editData text when provided', () => {
        render(<OutputDisplay edit={false} editData="Edit data" output="Test output" animate={false} targetLang="en" />);
        expect(screen.getByText('Edit data')).toBeInTheDocument();
    });

    it('applies the correct classes for English target language', () => {
        render(<OutputDisplay edit={false} editData="" output="Test output" animate={false} targetLang="en" />);
        const divElement = screen.getByText('Test output').closest('div');
        expect(divElement).toHaveClass('font-poppins');
    });

    it('applies the correct classes for Tibetan target language', () => {
        render(<OutputDisplay edit={false} editData="" output="Test output" animate={false} targetLang="bo" />);
        const divElement = screen.getByText('Test output').closest('div');
        expect(divElement).toHaveClass('leading-loose', 'font-monlam');
    });

    it('applies the correct classes for non-English and non-Tibetan target language', () => {
        render(<OutputDisplay edit={false} editData="" output="Test output" animate={false} targetLang="fr" />);
        const divElement = screen.getByText('Test output').closest('div');
        expect(divElement).toHaveClass('font-notosans');
    });

    it('applies the correct font size class based on output length', () => {
        const shortOutput = 'Short output';
        const mediumOutput = 'a'.repeat(800);
        const longOutput = 'a'.repeat(1100);

        const { rerender } = render(<OutputDisplay edit={false} editData="" output={shortOutput} animate={false} targetLang="en" />);
        expect(screen.getByText(shortOutput).closest('div')).toHaveClass('text-lg');

        rerender(<OutputDisplay edit={false} editData="" output={mediumOutput} animate={false} targetLang="en" />);
        expect(screen.getByText(mediumOutput).closest('div')).toHaveClass('text-base');

        rerender(<OutputDisplay edit={false} editData="" output={longOutput} animate={false} targetLang="en" />);
        expect(screen.getByText(longOutput).closest('div')).toHaveClass('text-sm');
    });

    it('renders with motion properties', () => {
        render(<OutputDisplay edit={false} editData="" output="Test output" animate={true} targetLang="en" />);
        expect(motion.p).toHaveBeenCalledWith(expect.objectContaining({
            initial: { opacity: 0 },
            animate: { opacity: 1 },
        }), {});
    });
});

describe('EditActionButtons Component', () => {
    const mockHandleCancelEdit = jest.fn();
    const mockHandleEditSubmit = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders buttons and applies correct classes based on language', () => {
        // Mock translation hook
        uselitteraTranlation.mockReturnValue({
            translation: { contribution_message: 'Contribution message', save: 'Save' },
            locale: 'en',
            isEnglish: true,
        });

        const { container } =render(
            <EditActionButtons
                handleCancelEdit={mockHandleCancelEdit}
                handleEditSubmit={mockHandleEditSubmit}
                editfetcher={{ state: 'idle' }}
                editText="Edit text"
                outputText="Output text"
            />
        );

        // Check if the contribution message is rendered
        expect(screen.getByText('Contribution message')).toBeInTheDocument();

        // Check if the save button is rendered with the correct text
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();

        // Check the classes for the English locale
        const outerDiv = container.querySelector('div.font-poppins');
        expect(outerDiv).toBeInTheDocument();
        expect(outerDiv).toHaveClass('font-poppins');

        // Check the button properties
        const cancelButton = screen.getByRole('button', { name: /x/i });
        expect(cancelButton).toBeInTheDocument();
        expect(cancelButton).toHaveClass('px-1 py-0.5');

        const submitButton = screen.getByRole('button', { name: /Save/i });
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveClass('p-0 bg-secondary-500 dark:bg-primary-500 text-white dark:text-black');
        expect(submitButton).not.toBeDisabled();

        // Simulate button clicks
        fireEvent.click(cancelButton);
        expect(mockHandleCancelEdit).toHaveBeenCalledTimes(1);

        fireEvent.click(submitButton);
        expect(mockHandleEditSubmit).toHaveBeenCalledTimes(1);
    });

    it('disables the submit button when editText equals outputText', () => {
        uselitteraTranlation.mockReturnValue({
            translation: { contribution_message: 'Contribution message', save: 'Save' },
            locale: 'en',
            isEnglish: true,
        });

        render(
            <EditActionButtons
                handleCancelEdit={mockHandleCancelEdit}
                handleEditSubmit={mockHandleEditSubmit}
                editfetcher={{ state: 'idle' }}
                editText="Same text"
                outputText="Same text"
            />
        );

        const submitButton = screen.getByRole('button', { name: /Save/i });
        expect(submitButton).toBeDisabled();
    });

    it('renders with the correct classes and styles for non-English locale', () => {
        uselitteraTranlation.mockReturnValue({
            translation: { contribution_message: 'Contribution message', save: 'Save' },
            locale: 'fr',
            isEnglish: false,
        });

        const { container } = render(
            <EditActionButtons
                handleCancelEdit={mockHandleCancelEdit}
                handleEditSubmit={mockHandleEditSubmit}
                editfetcher={{ state: 'idle' }}
                editText="Edit text"
                outputText="Output text"
            />
        );

        const outerDiv = container.querySelector('div.font-monlam');
        expect(outerDiv).toBeInTheDocument();
        expect(outerDiv).toHaveClass('font-monlam');
    });
});

describe('SubmitButton', () => {
    beforeEach(() => {
        // Mock translation values
        uselitteraTranlation.mockReturnValue({
            translation: { translate: 'Translate' },
            locale: 'en', // Change locale as needed for different tests
        });
    });

    test('renders with correct classes and translation', () => {
        render(
            <SubmitButton
                selectedTool="text"
                trigger={jest.fn()}
                submitFile={jest.fn()}
                charCount={100}
                CHAR_LIMIT={200}
                disabled={false}
            />
        );

        const button = screen.getByRole('button', { name: 'Translate' });

        expect(button).toHaveClass('bg-secondary-500');
        expect(button).toHaveClass('text-white');
        expect(button).toHaveClass('font-poppins');
        expect(button).toHaveTextContent('Translate');
    });

    test('disables the button when charCount exceeds CHAR_LIMIT', () => {
        render(
            <SubmitButton
                selectedTool="text"
                trigger={jest.fn()}
                submitFile={jest.fn()}
                charCount={250}
                CHAR_LIMIT={200}
                disabled={false}
            />
        );

        const button = screen.getByRole('button', { name: 'Translate' });


        expect(button).toBeDisabled();
        expect(button).toHaveAttribute('title', 'Character limit exceeded');
    });

    test('enables the button if charCount is within limit', () => {
        render(
            <SubmitButton
                selectedTool="text"
                trigger={jest.fn()}
                submitFile={jest.fn()}
                charCount={150}
                CHAR_LIMIT={200}
                disabled={false}
            />
        );

        const button = screen.getByRole('button', { name: 'Translate' });


        expect(button).not.toBeDisabled();
    });

    test('handles document tool and submitFile callback', () => {
        const submitFileMock = jest.fn();

        render(
            <SubmitButton
                selectedTool="document"
                trigger={jest.fn()}
                submitFile={submitFileMock}
                charCount={0}
                CHAR_LIMIT={200}
                disabled={false}
            />
        );

        const button = screen.getByRole('button', { name: 'Translate' });


        fireEvent.click(button);
        expect(submitFileMock).toHaveBeenCalled();
    });

    test('handles non-document tool and trigger callback', () => {
        const triggerMock = jest.fn();

        render(
            <SubmitButton
                selectedTool="text"
                trigger={triggerMock}
                submitFile={jest.fn()}
                charCount={10}
                CHAR_LIMIT={200}
                disabled={false}
            />
        );

        const button = screen.getByRole('button', { name: 'Translate' });


        fireEvent.click(button);
        expect(triggerMock).toHaveBeenCalled();
    });

    test('renders with font-monlam when locale is bo_TI', () => {
        uselitteraTranlation.mockReturnValue({
            translation: { translate: 'Translate' },
            locale: 'bo_TI',
        });

        render(
            <SubmitButton
                selectedTool="text"
                trigger={jest.fn()}
                submitFile={jest.fn()}
                charCount={100}
                CHAR_LIMIT={200}
                disabled={false}
            />
        );

        const button = screen.getByRole('button');

        expect(button).toHaveClass('font-monlam');
    });
});
