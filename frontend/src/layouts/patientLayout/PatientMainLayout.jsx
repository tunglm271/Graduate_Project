import './patientmainLayout.css'
import { Outlet } from 'react-router-dom';
import PatientHeader from '../../components/PatientHeader';
import PatientSidebar from '../../components/PatientSidebar';
import PatientFooter from '../../components/PatientFooter';
import { PateintLayoutProvider } from '../../context/PateintLayoutProvider';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const PatientMainLayout = () => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <PateintLayoutProvider>
            <div>
                <div style={{ display: "flex" }}>
                    <PatientSidebar />
                    <main id='content'>
                        <PatientHeader />
                        <Outlet />
                        <PatientFooter /> 
                    </main>
                </div>
            </div>
        </PateintLayoutProvider>
    );
}

export default PatientMainLayout;
