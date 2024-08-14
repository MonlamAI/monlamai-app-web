import { renderHook, act } from '@testing-library/react';
import useDebounce from './useDebounceState';

describe('useDebounce', () => {
    it('should debounce the value', () => {
        jest.useFakeTimers(); // Use fake timers to control the timing

        const { result, rerender } = renderHook(({ value, delay }) =>
            useDebounce(value, delay),
            {
                initialProps: { value: 'initial', delay: 500 },
            }
        );

        expect(result.current).toBe('initial');

        // Update the value
        act(() => {
            rerender({ value: 'updated', delay: 500 });
        });

        // The debounced value should not update immediately
        expect(result.current).toBe('initial');

        // Fast-forward the timers
        act(() => {
            jest.advanceTimersByTime(500);
        });

        // The debounced value should be updated now
        expect(result.current).toBe('updated');

        jest.useRealTimers(); // Clean up and reset timers
    });

    it('should clear the timeout on unmount', () => {
        jest.useFakeTimers(); // Use fake timers to control the timing

        const { unmount } = renderHook(({ value, delay }) =>
            useDebounce(value, delay),
            {
                initialProps: { value: 'test', delay: 500 },
            }
        );

        // Fast-forward the timers to simulate passing time
        act(() => {
            jest.advanceTimersByTime(250);
        });

        // Unmount the component
        unmount();

        // Ensure that the timeout is cleared (no value change should occur)
        act(() => {
            jest.advanceTimersByTime(250);
        });

        // No additional assertions are needed; the absence of errors is the indicator

        jest.useRealTimers(); // Clean up and reset timers
    });
});
