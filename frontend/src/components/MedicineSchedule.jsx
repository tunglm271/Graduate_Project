import PillIcon from "@icon/PillIcon";
import { Avatar } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
const MedicineSchedule = () => {
    return (
        <div className='medicine-schedule'>
            <div className="bg-gradient-to-r from-gray-600 to-gray-300 w-10 h-10 rounded-full justify-center items-center inline-flex" style={{ marginRight: '20px' }}>
                <PillIcon size={30} />
            </div>
            <div>
                <h4 className='font-semibold'>Thuốc ameflu 300mg</h4>
                <p className="text-sm text-gray-600">2 viên vào lúc 8:00 SA</p>
                <p className="text-sm text-gray-600">Uống sau khi ăn no</p>
                <p className="text-sm text-gray-600" style={{marginTop: "5px"}}>Còn lại 29 viên</p>
            </div>
                <Avatar sx={{
                    backgroundColor: '#007bff',
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    right: '10px',
                    top: '10px',

                }}>
                    <NotificationsIcon sx={{ fontSize: 15 }} />
                </Avatar>

        </div>
    );
}

export default MedicineSchedule;
