import { renderHook, act } from '@testing-library/react';
import uselitteraTranlation from './useLitteraTranslation';
import { useLittera, useLitteraMethods } from '@assembless/react-littera';
import useLocalStorage from './useLocaleStorage';

// Mock the imports
jest.mock('@assembless/react-littera', () => ({
    useLittera: jest.fn(),
    useLitteraMethods: jest.fn(),
}));

jest.mock('./useLocaleStorage', () => jest.fn());

jest.mock("~/helper/translation/en.json", () => ({
    welcome: "Welcome",
}));

jest.mock("~/helper/translation/bo.json", () => ({
    welcome: "བྱོན་པ་ལེགས",
}));

describe('uselitteraTranlation', () => {
    let setLocale;
    let setCurrentLocale;
    let locale = "bo_TI";
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();

        // Initialize mocks
        setLocale = jest.fn((locale) => {
            locale = locale;
        });
        setCurrentLocale = jest.fn();

        // Set default return values for mocks
        useLitteraMethods.mockReturnValue({
            locale,
            setLocale,
        });

        useLittera.mockReturnValue({
            'welcome': {
                en_US: 'Welcome',
                bo_TI: 'བཀྲ་ཤིས་པའི་བསྐུར',
            },
        });
    });

    it('should initialize with the correct locale and translations', () => {
        useLocalStorage.mockReturnValue(['bo_TI', setCurrentLocale]);
        const { result } = renderHook(() => uselitteraTranlation());

        // Check initial values
        expect(result.current.locale).toBe('bo_TI');
        expect(result.current.isEnglish).toBe(false);
        expect(result.current.isTibetan).toBe(true);
        expect(result.current.translation).toEqual({
            'welcome': {
                en_US: 'Welcome',
                bo_TI: 'བཀྲ་ཤིས་པའི་བསྐུར',
            },
        });
    });

    it('should update locale based on localStorage value', () => {
        // Mock useLocalStorage to return a different value
        useLocalStorage.mockReturnValue(['en_US', setCurrentLocale]);

        const { result } = renderHook(() => uselitteraTranlation());

        // Check updated values
        expect(result.current.locale).toBe('en_US');
        expect(result.current.isEnglish).toBe(true);
        expect(result.current.isTibetan).toBe(false);
    });

    it('should call setLocale when localStorage value changes', () => {
        renderHook(() => uselitteraTranlation());

        // Update localStorage value
        act(() => {
            useLocalStorage.mockReturnValue(['en_US', jest.fn()]);
        });

        // Verify setLocale is called with the correct value
        expect(setLocale).toHaveBeenCalledWith('en_US');
    });
});
