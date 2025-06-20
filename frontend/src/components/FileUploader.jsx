import { Button, styled } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const FileUploader = ({icon = <CameraAltIcon /> , text, onChange, accept= "image/*", multiple = true }) => {

    console.log("FileUploader accept:", accept);
    return (
        <label>
            <Button 
                component="span" 
                sx={{
                    background: 'white',
                    textTransform: 'none',
                    display: 'flex',
                    gap: '10px',
                    padding: '10px',
                    borderRadius: '10px',
                    border: '1px dashed #007bff',
                }}
            >
                {icon}
                {text}
            </Button>
            <VisuallyHiddenInput
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={onChange}
            />
        </label>
    );
}

export default FileUploader;
