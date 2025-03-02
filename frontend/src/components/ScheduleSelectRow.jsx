import { Switch, Box, Stack} from '@mui/material';
import dayjs from 'dayjs';
import ScheduleButton from './ScheduleButton';
import { useState } from 'react';

const ScheduleSelectRow = ({day, work = false}) => {
    const [startTime, setStartTime] = useState(dayjs('2022-04-17T8:00'));
    const [endTime, setEndTime] = useState(dayjs('2022-04-17T17:00'));
    return (
        <div className='flex items-center justify-between'>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2, width: "30%"}}>
                <Switch checked={work}/>
                {day}
                {!work && <p className='text-gray-500 italic text-sm'>Không làm việc ngày này</p>}
            </Box>
            {work &&
            <div className='flex flex-col gap-2.5'> 
                <Box direction='row' gap={2} sx={{display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.875rem', color: "#6a7282"}}>
                    <input className='time-input' type="time" name="" id="" defaultValue="08:00" lang="en-GB"/>
                    To
                    <input className='time-input' type="time" name="" id="" defaultValue={"12:00"} lang="en-GB"/>
                </Box>
                <Box direction='row' gap={2} sx={{display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.875rem', color: "#6a7282"}}>
                    <input className='time-input' type="time" name="" id="" defaultValue="13:00" lang="en-GB"/>
                    To
                    <input className='time-input' type="time" name="" id="" defaultValue={"17:00"} lang="en-GB"/>
                </Box>
            </div>
            }
        </div>
    );
}

export default ScheduleSelectRow;
