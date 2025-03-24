import { useState, createContext, useEffect } from 'react';

export const FacilityLayoutContext = createContext();

const FacilityLayoutProvider = () => {
    const [chatbox, setChatbox] = useState(null);
    return (
        <PatientLayoutContext.Provider value={{ chatbox, setChatbox }}>
            {children}
        </PatientLayoutContext.Provider>
    );
}

export default FacilityLayoutProvider;
