import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocaleStorage';

// Mock localStorage
const localStorageMock = (() => {
    let store = {};

    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value;
        },
        removeItem: (key) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
});

describe('useLocalStorage', () => {
    beforeEach(() => {
        localStorageMock.clear();
    });

    it('should initialize with the value from localStorage if it exists', () => {
        // Set item in localStorage
        window.localStorage.setItem('test-key', JSON.stringify('stored value'));

        const { result } = renderHook(() => useLocalStorage('test-key', 'initial value'));

        expect(result.current[0]).toBe('stored value');
    });

    it('should initialize with the initial value if localStorage is empty', () => {
        const { result } = renderHook(() => useLocalStorage('test-key', 'initial value'));

        expect(result.current[0]).toBe('initial value');
    });

    it('should update both localStorage and state when setValue is called', () => {
        const { result } = renderHook(() => useLocalStorage('test-key', 'initial value'));

        act(() => {
            result.current[1]('new value');
        });

        expect(result.current[0]).toBe('new value');
        expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify('new value'));
    });

    it('should update state when localStorage changes from another tab', () => {
        const { result } = renderHook(() => useLocalStorage('test-key', 'initial value'));

        // Simulate a change in localStorage from another tab
        act(() => {
            window.localStorage.setItem('test-key', JSON.stringify('updated from another tab'));
            const event = new StorageEvent('storage', {
                key: 'test-key',
                newValue: JSON.stringify('updated from another tab'),
            });
            window.dispatchEvent(event);
        });

        expect(result.current[0]).toBe('updated from another tab');
    });
});
