import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [collapse, setCollapse] = useState(false);

    return (
        <UserContext.Provider value={{ collapse, setCollapse }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };

