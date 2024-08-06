import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useFetcher, useSearchParams } from '@remix-run/react';
import LanguageInput from './LanguageInput';
import { resetFetcher } from '~/component/utils/resetFetcher';
import { toast } from 'react-toastify';
import LanguageDetect from 'languagedetect';
import { eng_languagesOptions, tib_languageOptions } from '~/helper/const';
import uselitteraTranlation from '~/component/hooks/useLitteraTranslation';

jest.mock('@remix-run/react', () => ({
    ...jest.requireActual('@remix-run/react'),
    useFetcher: jest.fn(),
    useSearchParams: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: jest.fn(),
}));

jest.mock('~/component/utils/resetFetcher', () => ({
    resetFetcher: jest.fn(),
}));

jest.mock('languagedetect', () => jest.fn(() => ({
    detect: jest.fn(),
})));

jest.mock('~/component/hooks/useLitteraTranslation', () => jest.fn());

jest.mock("react-icons/go", () => ({
    GoArrowSwitch: () => <>GoArrowSwitch</>,
}))
describe('LanguageInput component', () => {
    let params
    let setParams
    let fetcherMock
    let lngDetector
    let useLitteraTranslationMock

    const mockFetcherData = {
        data: {},
        state: 'idle',
        submit: jest.fn(),
    };

    beforeEach(() => {
        jest.resetAllMocks();
        params = new URLSearchParams();
        setParams = jest.fn((cb) => {
            cb(params);
        });
        fetcherMock = jest.fn().mockReturnValue(mockFetcherData);
        lngDetector = new LanguageDetect();
        useLitteraTranslationMock = jest.fn().mockReturnValue({
            isTibetan: false,
            translation: {
                detect: 'Detect language',
                beta: 'Beta',
            },
        });

        (useFetcher).mockImplementation(fetcherMock);
        (useSearchParams).mockReturnValue([params, setParams]);
        (uselitteraTranlation).mockImplementation(useLitteraTranslationMock);
    });

    it('should render the component with default values', () => {
        const { container } = render(
            <LanguageInput
                likefetcher={fetcherMock}
                sourceText=""
                setSourceText={jest.fn()}
                data=""
                setTranslated={jest.fn()}
            />
        );

        // default value of source language is detect language
        expect(screen.getByText('Detect language')).toBeInTheDocument();
        const switchLangBtn = screen.getByRole('button', { name: 'GoArrowSwitch' });
        // check if switch button in dom
        expect(switchLangBtn).toBeInTheDocument();
        const outerMostDiv = container.querySelector("div")
        // check if the outermost div has the correct class according to isTibetan
        expect(outerMostDiv).toHaveClass('font-poppins');
    });

    it('should detect and set language when input text is provided', async () => {
        fetcherMock.mockReturnValueOnce({
            ...mockFetcherData,
            data: {
                language: 'en',
            },
        });

        const { rerender } = render(
            <LanguageInput
                likefetcher={fetcherMock}
                sourceText="Hello"
                setSourceText={jest.fn()}
                data=""
                setTranslated={jest.fn()}
            />
        );

        await waitFor(() => {
            expect(fetcherMock().submit).toHaveBeenCalledWith(
                { inputText: 'Hello' },
                { method: 'POST', action: '/api/detectLanguage' }
            );
        });

        rerender(
            <LanguageInput
                likefetcher={fetcherMock}
                sourceText="Hello"
                setSourceText={jest.fn()}
                data=""
                setTranslated={jest.fn()}
            />
        );

        await waitFor(() => {
            expect(setParams).toHaveBeenCalledWith(expect.any(Function));
        });
    });

    it('should swap source and target languages when toggle button is clicked', () => {
        params.set('source', 'en');
        params.set('target', 'bo');

        render(
            <LanguageInput
                likefetcher={fetcherMock}
                sourceText="Hello"
                setSourceText={jest.fn()}
                data="Translated Text"
                setTranslated={jest.fn()}
            />
        );

        fireEvent.click(screen.getByRole('button',{name: 'GoArrowSwitch'}));

        expect(setParams).toHaveBeenCalledWith(expect.any(Function));
        expect(resetFetcher).toHaveBeenCalledWith(fetcherMock);
    });

    it.only("Should select the language when the language is selected", () => {
        render(
            <LanguageInput
                likefetcher={fetcherMock}
                sourceText=""
                setSourceText={jest.fn()}
                data="Translated Text"
                setTranslated={jest.fn()}
            />
        );

        fireEvent.change(screen.getAllByRole('combobox')[0], { target: { value: 'en' } });

        expect(setParams).toHaveBeenCalledWith(expect.any(Function));
    });
});
