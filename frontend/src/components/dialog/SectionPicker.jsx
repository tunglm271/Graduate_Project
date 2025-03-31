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


const SectionPicker = ({ sectionList, onSelectSection, selectedSection }) => {
    const [shift, setShift] = useState('morning');
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
          { sectionList.length === 0 ? (
            <p className="text-center w-full">
                Không có ca khám nào trong ngày này
            </p>
          ) 
          : 
          sectionList.map((section, index) => {
            const formatTime = (time) => time.slice(0, 5);
            const isSelected = selectedSection?.start_time === section.start_time && selectedSection?.end_time === section.end_time;
            return (
              <div key={index} className="section-item">
                <button className="section-option" 
                    style={{backgroundColor: isSelected ? '#007bff' : 'white', color: isSelected ? 'white' : 'black'}}
                    onClick={() => onSelectSection(section)}
                >
                  {formatTime(section.start_time)} - {formatTime(section.end_time)}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default SectionPicker;
