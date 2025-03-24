import StethoscopeIcon from '@icon/StethoscopeIcon';
import { Stack, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Link } from 'react-router-dom';
import StaffDataGrid from '../../components/table/StaffDataGrid';
import { useState, useEffect } from 'react';
import CreateDoctorDialog from '../../components/dialog/CreateDoctorDialog';
import doctorApi from '../../service/Doctorapi';
const StaffManage = () => {
    const [ data, setData ] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        doctorApi.getAll().then(res => {
            console.log(res.data);
            setData(res.data);
        });
    }, []);

    return (
        <div>
            <Box sx={{
                padding: "1rem 1.5rem",
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <div className='flex gap-2 items-center'>
                    <div className='rounded-sm bg-gray-300' style={{padding: '0.3rem'}}>
                        <StethoscopeIcon />
                    </div>
                    <p className='text-gray-500'><span className='font-bold text-xl text-black'>{data.length || 0}</span> Bác sĩ</p>
                </div>
                <Stack direction={"row"} spacing={2}>
                    <Button color='warning' variant='outlined' startIcon={<FilterListIcon />}>
                        Lọc
                    </Button>
                    <Button variant='contained' startIcon={<AddIcon />} sx={{ boxShadow: 'none' }} onClick={() => setOpen(true)}>
                        Thêm bác sĩ
                    </Button>
                </Stack>
            </Box>
            <div style={{ padding: "1rem" }}>
                <StaffDataGrid setData={setData} data={data}/>
            </div>
            <CreateDoctorDialog open={open} onClose={() => setOpen(false)}/>
        </div>
    );
}

export default StaffManage;
