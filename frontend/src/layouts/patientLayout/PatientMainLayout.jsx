import './patientmainLayout.css'
import { Outlet } from 'react-router-dom';
import PatientHeader from '../../components/PatientHeader';
import PatientSidebar from '../../components/PatientSidebar';
import PatientFooter from '../../components/PatientFooter';
import { PateintLayoutProvider } from '../../context/PateintLayoutProvider';
import Chat from '../../components/Chat';
const PatientMainLayout = () => {


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
                <Chat />
            </div>
        </PateintLayoutProvider>
    );
}

export default PatientMainLayout;
