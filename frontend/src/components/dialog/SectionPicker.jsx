import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
      margin: theme.spacing(0.5),
      border: 0,
      padding: '5px 20px',
      borderRadius: theme.shape.borderRadius,
      [`&.${toggleButtonGroupClasses.disabled}`]: {
        border: 0,
      },
      '&:hover': {
        backgroundColor: '#007bff',
        color: theme.palette.common.white, 
      },
    },
    [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
      {
        marginLeft: -1,
        borderLeft: '1px solid transparent',
      },
      [`& .${toggleButtonGroupClasses.selected}`]: {
        backgroundColor: '#007bff', 
        color: theme.palette.common.white, 
      },
      
  }));


const SectionPicker = () => {
    const [shift, setShift] = useState('morning');
    const sectionListMorning = ['07:00 - 07:30', '07:30 - 08:00', '08:00 - 08:30', '08:30 - 09:00', '09:00 - 09:30', '09:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00'];
    const sectionListAftermoon = ['12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'];
    const sectionListNight = ['17:00 - 18:00', '18:00 - 19:00']; 
    const [sectionList, setSectionList] = useState(sectionListMorning);
    const [selectedSection, setSelectedSection] = useState();
    useEffect(() => {
        if (shift === 'morning') {
            setSectionList(sectionListMorning);
        } else if (shift === 'aftermoon') {
            setSectionList(sectionListAftermoon);
        } else {
            setSectionList(sectionListNight);
        }
        setSelectedSection();
    }, [shift]);


    const handleShift = (event, newShift) => {
        setShift(newShift);
    }

    return (
        <div style={{margin: '20px 0'}}>
             <Paper
                elevation={0}
                sx={(theme) => ({
                display: 'flex',
                border: `1px solid ${theme.palette.divider}`,
                flexWrap: 'wrap',
                width: 'fit-content',
                marginLeft: 'auto',
                marginRight: 'auto',
                })}
            >
                <StyledToggleButtonGroup
                size="small"
                value={shift}
                exclusive
                onChange={handleShift}
                aria-label="text alignment"
                >
                <ToggleButton value="morning" aria-label="morning">
                    Ca sáng
                </ToggleButton>
                <ToggleButton value="aftermoon" aria-label="aftermoon">
                    Ca chiều
                </ToggleButton>
                <ToggleButton value="night" aria-label="night">
                    Ca tối
                </ToggleButton>
                </StyledToggleButtonGroup>
            </Paper>

            <div className="section-grid">
                {sectionList.map((section, index) => (
                    <div key={index} className="section-item">
                        <button className="section-option" 
                          style={{backgroundColor: selectedSection === index ? '#007bff' : 'white', color: selectedSection === index ? 'white' : 'black'}}
                          onClick={() => setSelectedSection(index)}
                        >
                          {section}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SectionPicker;
