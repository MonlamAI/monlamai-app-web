import { renderHook, act } from '@testing-library/react';
import useSocket from './useSocket';
import { getSocket } from '~/services/socket';
import { useLoaderData } from '@remix-run/react';

// Mock getSocket and useLoaderData
jest.mock('~/services/socket', () => ({
    getSocket: jest.fn(),
}));

jest.mock('@remix-run/react', () => ({
    useLoaderData: jest.fn(),
}));

describe('useSocket', () => {
    let mockSocket
    let mockEmit
    let mockOn
    let mockOff

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();

        // Create mock socket object
        mockEmit = jest.fn();
        mockOn = jest.fn();
        mockOff = jest.fn();
        mockSocket = {
            on: mockOn,
            off: mockOff,
            emit: mockEmit,
        };

        // Mock implementation of getSocket
        getSocket.mockReturnValue(mockSocket);

        // Mock implementation of useLoaderData
        useLoaderData.mockReturnValue({
            user: { email: 'test@example.com' },
            fileUploadUrl: 'http://example.com/upload',
        });
    });

    it('should initialize and clean up socket connections', () => {
        const { result } = renderHook(() => useSocket());

        // Check that socket is initialized with the correct URL
        expect(getSocket).toHaveBeenCalledWith('http://example.com/upload');

        // Simulate socket connection
        act(() => {
            mockSocket.on.mock.calls.forEach(([event, handler]) => {
                if (event === 'connect') handler();
            });
        });

        expect(result.current.isConnected).toBe(true);

        // Simulate socket disconnection
        act(() => {
            mockSocket.on.mock.calls.forEach(([event, handler]) => {
                if (event === 'disconnect') handler();
            });
        });

        expect(result.current.isConnected).toBe(false);

        // Simulate progress update
        act(() => {
            mockSocket.on.mock.calls.forEach(([event, handler]) => {
                if (event === 'progressUpdate') handler({ id: '1', progress: 50 });
            });
        });

        expect(result.current.progress).toEqual({ '1': 50 });

    });
});
