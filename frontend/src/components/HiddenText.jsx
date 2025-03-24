import { Stack, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

const HiddenText = ({text = "DN3120123456789"}) => {
    const [showInsuranceCode, setShowInsuranceCode] = useState(false);
    const [showCopy, setShowCopy] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setShowCopy(true);
        setTimeout(() => {
            setShowCopy(false);
        }, 1000);
    }
    return (
        <Stack direction="row" spacing={1} sx={{
            fontSize: '0.875rem',
        }}>
            <input className='insurance-number'  type={showInsuranceCode?"text":"password"} value={text} readOnly/>
            <button
                onClick={() => setShowInsuranceCode(prev => !prev)}
                className="cursor-pointer"
            >
            {showInsuranceCode ? <VisibilityOffIcon sx={{fontSize: 20}}/> : <VisibilityIcon sx={{fontSize: 20}}/>}
            </button>
            <Tooltip title={showCopy ? "copied" : "copy"} arrow>
                <button onClick={handleCopy} className="cursor-pointer">
                    <ContentCopyIcon sx={{fontSize: 20}}/>
                </button>
            </Tooltip>
        </Stack>

    );
}

export default HiddenText;
