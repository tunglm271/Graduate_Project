import patientApi from "../../../service/patientApi";
import PatientTable from "../../../components/table/PatientTable";
import { useEffect, useState } from "react";
import { Stack, Button, Divider } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import FilterListIcon from "@mui/icons-material/FilterList";
const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        patientApi.getByDoctor()
            .then((response) => {
                console.log(response.data);
                setPatients(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching patients:", error);
            });
    }, []);


    return (
        <div>
            <div className='flex items-center justify-between' style={{ padding: '1rem 1.5rem'}}>
                <div className='flex gap-2 items-center'>
                    <div className='rounded-sm bg-gray-300' style={{padding: '0.3rem'}}>
                        <PersonIcon />
                    </div>
                    <p className='text-gray-500'><span className='font-bold text-xl text-black'>{patients.length}</span> Bệnh nhân</p>
                </div>
                <Stack direction={"row"} spacing={2}>
                    <Button color='warning' variant='outlined' startIcon={<FilterListIcon />}>
                        Lọc
                    </Button>
                </Stack>
            </div>
            <Divider />
            <div className="p-4 mt-2">
                <PatientTable loading={loading} patients={patients} />
            </div>
        </div>
    );
}

export default PatientList;
