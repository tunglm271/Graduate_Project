import DateSlider from '../../../components/DateSlider';
import { Avatar } from '@mui/material';
import './patentMedicinePage.css'
import MorningIcon from "@icon/MorningIcon";
import NightIcon from "@icon/NightIcon";
import MedicineSchedule from '../../../components/MedicineSchedule';

const PatientMedicinePage = () => {
    return (
        <div style={{padding: '20px'}}>
            <div className='patient-medicine-calendar'>
                <div className='flex gap-1 items-center rounded-full'>
                    <Avatar 
                        src='/images/medicine.png'
                        sx={{ width: 25, height: 25, borderRadius: '50%' }} 
                    />
                    <h3>Thuốc của tôi</h3>
                </div>
                <DateSlider />
                <div>
                    <div className="morning-pill">
                        <div className='flex gap-2 items-center font-semibold text-gray-600'>
                            <MorningIcon />
                            Sáng
                        </div>
                        <MedicineSchedule />
                        <MedicineSchedule />
                        <MedicineSchedule />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientMedicinePage;
