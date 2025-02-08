import { Stack, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';

const HiddenText = () => {
    const [showInsuranceCode, setShowInsuranceCode] = useState(false);
    return (
        <Stack direction="row" spacing={1}>
            <input className='insurance-number'  type={showInsuranceCode?"text":"password"} value={"DN3120123456789"} readOnly/>
            <IconButton aria-label="delete"
                onClick={() => setShowInsuranceCode(prev => !prev)}
            >
            {showInsuranceCode ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
            <IconButton onClick={() => navigator.clipboard.writeText("DN3120123456789")}>
                <ContentCopyIcon />
            </IconButton>
        </Stack>

    );
}

export default HiddenText;
