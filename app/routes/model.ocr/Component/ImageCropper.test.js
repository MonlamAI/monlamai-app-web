import React from 'react';
import { render, fireEvent, waitFor, screen, getByTitle } from '@testing-library/react';
import { ImageCropper } from './ImageCropper'; 

// Mock dependencies
jest.mock("@remix-run/react", () => ({
    useLoaderData:jest.fn().mockReturnValue({isMobile:false}),
}))
jest.mock('react-advanced-cropper', () => ({
    Cropper: React.forwardRef((props, ref) => <div {...props} ref={ref}>Cropper</div>),
}));
jest.mock('~/component/hooks/useLitteraTranslation', () => () => ({
    translation: {
        uploadImage: 'Upload Image',
        acceptedImage: 'Accepted formats: JPG, PNG, JPEG',
        or: 'OR',
        'take-photo': 'Take Photo',
        save: 'Save',
        scan: 'Scan',
        crop: 'Crop'
    },
    isTibetan: false,
}));
jest.mock('./WebcamCapture', () => ({ setImageUrl }) => (
    <div>
        <button onClick={() => setImageUrl("image/url")}>Capture Image</button>
    </div>
));
global.URL.createObjectURL = jest.fn(() => 'mockObjectURL');

describe('ImageCropper Component', () => {
    let uploadFileMock, handleResetMock;

    beforeEach(() => {
        uploadFileMock = jest.fn();
        handleResetMock = jest.fn();
    });

    it('should upload an image file', async () => {
        const { getByLabelText, getByText } = render(
            <ImageCropper
                uploadFile={uploadFileMock}
                handleReset={handleResetMock}
                uploadProgress={0}
                scaning={false}
            />
        );
        const fileInput = getByLabelText('Upload Image');
        const file = new File(['dummy content'], 'example.jpg', { type: 'image/jpeg' });

        fireEvent.change(fileInput, { target: { files: [file] } });
        
        await waitFor(() => {
            expect(screen.getByAltText(/uploaded image/i)).toBeInTheDocument()
            expect(screen.getByText(/crop/i)).toBeInTheDocument();
            expect(screen.getByText(/scan/i)).toBeInTheDocument();
        });
    });

    it('should crop and save the image', async () => {
        const { getByText } = render(
            <ImageCropper
                uploadFile={uploadFileMock}
                handleReset={handleResetMock}
                uploadProgress={0}
                scaning={false}
            />
        );

        // Mock image upload
        fireEvent.change(screen.getByLabelText('Upload Image'), {
            target: { files: [new File(['dummy content'], 'example.jpg', { type: 'image/jpeg' })] },
        });

        await waitFor(() => {
            expect(screen.getByAltText(/uploaded image/i)).toBeInTheDocument()
        });

        const cropBtn = screen.getByText(/crop/i)
        fireEvent.click(cropBtn)
        await waitFor(() => {
            expect(screen.getByText(/cropper/i)).toBeInTheDocument();
            expect(screen.getByText(/save/i)).toBeInTheDocument();
        });
        const cropperElement = screen.getByText(/cropper/i)
        cropperElement.getCanvas = jest.fn().mockReturnValue({ toDataURL: jest.fn(() => "newurl.png") })
        fireEvent.click(screen.getByText(/save/i))
        await waitFor(() => {
            expect(screen.getByText('Scan')).toBeInTheDocument();
        });
    });

    it('should reset the form when click reset button', () => {
        const { getByLabelText, getByText } = render(
            <ImageCropper
                uploadFile={uploadFileMock}
                handleReset={handleResetMock}
                uploadProgress={0}
                scaning={false}
            />
        );

        // Mock image upload
        fireEvent.change(screen.getByLabelText('Upload Image'), {
            target: { files: [new File(['dummy content'], 'example.jpg', { type: 'image/jpeg' })] },
        });
        fireEvent.click(screen.getByTitle('reset'));

        expect(handleResetMock).toHaveBeenCalled();
    });

    it('should open webcam clicking on button', async () => {
        const { getByText } = render(
            <ImageCropper
                uploadFile={uploadFileMock}
                handleReset={handleResetMock}
                uploadProgress={0}
                scaning={false}
            />
        );
        fireEvent.click(getByText('Take Photo'));
        
        expect(screen.getByText('Capture Image')).toBeInTheDocument();
    });
});
