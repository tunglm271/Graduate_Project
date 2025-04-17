import { useState, useCallback } from 'react';
import { Dialog, DialogActions, DialogTitle, Button, Box, Slider } from '@mui/material';
import Cropper from 'react-easy-crop';

const EditAvatarBox = ({ open, onClose, image, onCropComplete }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const getCroppedFile = async () => {
        if (!image || !croppedAreaPixels) return null;

        const img = new Image();
        img.src = image;
        img.crossOrigin = "anonymous";

        return new Promise((resolve, reject) => {
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = croppedAreaPixels.width;
                canvas.height = croppedAreaPixels.height;

                ctx.drawImage(
                    img,
                    croppedAreaPixels.x,
                    croppedAreaPixels.y,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height,
                    0,
                    0,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height
                );

                canvas.toBlob(blob => {
                    if (!blob) {
                        reject(new Error("Canvas is empty"));
                        return;
                    }

                    const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
                    const previewURL = URL.createObjectURL(blob);

                    resolve({ file, previewURL });
                }, 'image/jpeg');
            };
            img.onerror = error => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        try {
            const croppedData = await getCroppedFile();
            if (croppedData) {
                onCropComplete(croppedData.file, croppedData.previewURL);
            }
            onClose();
        } catch (error) {
            console.error("Error cropping image: ", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Crop Image</DialogTitle>
            <Box sx={{ position: 'relative', width: '100%', height: 300 }}>
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                />
            </Box>
            <Box sx={{ padding: 2 }}>
                <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e, newValue) => setZoom(newValue)}
                    aria-labelledby="zoom-slider"
                />
            </Box>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Crop & Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditAvatarBox;
