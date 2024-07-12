// import { readTextFile, readDocxFile, MAX_TEXT_LIMIT } from '../utils/readerModified';
import { readTextFile, readDocxFile, MAX_TEXT_LIMIT } from '../utils/readers';
import mammoth from 'mammoth';
jest.mock('mammoth');

describe('readTextFile', () => {
  let mockFile;
  let mockSetSourceText;
  let mockFileReaderInstance;

  beforeEach(() => {
    // Create a mock file
    mockFile = new File(['file content'], 'test.txt', { type: 'text/plain' });
    mockSetSourceText = jest.fn();

    // Mock the FileReader
    mockFileReaderInstance = {
      readAsText: jest.fn(),
      onload: null,
      onerror: null,
    };

    global.FileReader = jest.fn(() => mockFileReaderInstance);
  });

  test('should read file and call setSourceText with content if length is within limit', () => {
    readTextFile(mockFile, mockSetSourceText);

    // Simulate file read success
    const onloadCallback = mockFileReaderInstance.onload;
    onloadCallback({ target: { result: 'file content' } });

    expect(mockSetSourceText).toHaveBeenCalledWith('file content');
  });

  test('should not call setSourceText if content length exceeds limit', () => {
    const longText = 'a'.repeat(MAX_TEXT_LIMIT + 1);
    readTextFile(mockFile, mockSetSourceText);

    // Simulate file read success
    const onloadCallback = mockFileReaderInstance.onload;
    onloadCallback({ target: { result: longText } });

    expect(mockSetSourceText).not.toHaveBeenCalled();
  });

  test('should log error if there is an error reading the file', () => {
    console.error = jest.fn();
    readTextFile(mockFile, mockSetSourceText);

    // Simulate file read error
    const onerrorCallback = mockFileReaderInstance.onerror;
    onerrorCallback({ type: 'error' });

    expect(console.error).toHaveBeenCalledWith('Error reading file:', { type: 'error' });
  });
});



describe('readDocxFile', () => {
  let mockFile;
  let mockSetSourceText;
  let mockFileReaderInstance;

  beforeEach(() => {
    // Create a mock file
    mockFile = new File(['dummy content'], 'test.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    mockSetSourceText = jest.fn();

    // Mock the FileReader
    mockFileReaderInstance = {
      readAsArrayBuffer: jest.fn(),
      onload: null,
      onerror: null,
    };

    global.FileReader = jest.fn(() => mockFileReaderInstance);
  });

  test('should read docx file and call setSourceText with content if length is within limit', async () => {
    mammoth.extractRawText.mockResolvedValue({ value: 'extracted text' });

    readDocxFile(mockFile, mockSetSourceText);

    // Simulate file read success
    const onloadCallback = mockFileReaderInstance.onload;
    onloadCallback({ target: { result: 'dummy array buffer' } });

    // Wait for any pending promises
    await new Promise(setImmediate);

    expect(mammoth.extractRawText).toHaveBeenCalledWith({ arrayBuffer: 'dummy array buffer' });
    expect(mockSetSourceText).toHaveBeenCalledWith('extracted text');
  });

  test('should not call setSourceText if content length exceeds limit', async () => {
    const longText = 'a'.repeat(MAX_TEXT_LIMIT + 1);
    mammoth.extractRawText.mockResolvedValue({ value: longText });

    readDocxFile(mockFile, mockSetSourceText);

    // Simulate file read success
    const onloadCallback = mockFileReaderInstance.onload;
    onloadCallback({ target: { result: 'dummy array buffer' } });

    // Wait for any pending promises
    await new Promise(setImmediate);

    expect(mammoth.extractRawText).toHaveBeenCalledWith({ arrayBuffer: 'dummy array buffer' });
    expect(mockSetSourceText).not.toHaveBeenCalled();
  });

  test('should log error if there is an error reading the file', () => {
    console.error = jest.fn();
    readDocxFile(mockFile, mockSetSourceText);

    // Simulate file read error
    const onerrorCallback = mockFileReaderInstance.onerror;
    onerrorCallback({ type: 'error' });

    expect(console.error).toHaveBeenCalledWith('Error reading file:', { type: 'error' });
  });
});
