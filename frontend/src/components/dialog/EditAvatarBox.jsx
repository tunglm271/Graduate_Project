import { useState } from 'react';
import { Dialog, DialogActions, DialogTitle, Button, Box, Slider } from '@mui/material';
import Cropper from 'react-easy-crop';
const EditAvatarBox = ({open, onClose , image}) => {

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

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
                    onCropComplete={null}
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
                <Button onClick={onClose} color="primary">Crop & Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditAvatarBox;
