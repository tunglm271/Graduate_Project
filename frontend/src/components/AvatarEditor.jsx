import { Box, IconButton, Avatar } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import EditAvatarBox from "./dialog/EditAvatarBox";
import { useEffect, useRef, useState } from "react";

const AvatarEditor = ({image, setImage, avatarSize = 120, defaultImg = '', sx = {}}) => {
    const [toggleCropDialog, setToggleCropDialog] = useState(false);
    const [croppedPreviewURL, setCroppedPreviewURL] = useState(null);
    const fileInputRef = useRef(null);

    const defaultSx = {
        position: "relative",
        width: avatarSize,
        height: avatarSize,
        display: "block",
        borderRadius: "50%",
        border: "2px solid white",
        "&:hover .avatar-overlay": {
            opacity: 1,
        },
        ...sx
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result);
                setToggleCropDialog(true);
            };
        }
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        fileInputRef.current.click();
    };

    const handleCropComplete = async (file, previewURL) => {
        setImage(file);
        setCroppedPreviewURL(previewURL);
    };

    useEffect(() => {
        if(defaultImg) {
            setCroppedPreviewURL(defaultImg);
        }
    }, [defaultImg]);


    return (
        <Box sx={defaultSx}>
                <Avatar
                    src={croppedPreviewURL}
                    alt="avatar"
                    sx={{ width: "100%", height: "100%" }}
                />

                <Box
                    className="avatar-overlay"
                    sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    opacity: 0,
                    transition: "opacity 0.3s ease-in-out",
                    }}
                >
                    <IconButton sx={{ color: "white" }}  onClick={handleEditClick}>
                        <EditIcon />
                    </IconButton>
                </Box>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            <EditAvatarBox image={image} open={toggleCropDialog} onClose={() => setToggleCropDialog(false)}  onCropComplete={handleCropComplete}/>
        </Box>
    );
}

export default AvatarEditor;
