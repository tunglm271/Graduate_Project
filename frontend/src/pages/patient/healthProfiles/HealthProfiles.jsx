import './healthProfiles.css'
import { getHealthProfiles } from '../../../service/BackendApi';
import { useEffect, useState } from 'react';

const HealthProfiles = () => {

    const [healthProfiles, setHealthProfiles] = useState([]);

    useEffect(() => {
        getHealthProfiles().then((response) => {
            setHealthProfiles(response);
            console.log(response);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <div id="health-profiles-section">
            {
                healthProfiles.map((profile, index) => {
                    return (
                        <div key={index} className="health-profile-card">
                            <h3>{profile.name} <span>{profile.relationship}</span></h3>
                            <p>{profile.gender}</p> 
                            <p>{profile.date_of_birth}</p>
                            <p>{profile.weight}</p>
                            <p>{profile.height}</p>
                        </div>
                    )})
            }
        </div>
    );
}

export default HealthProfiles;
