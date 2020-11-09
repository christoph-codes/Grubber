import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user,setUser] = useState({});

    const getUser = () => {
        // Call database and return user
    }
    
    useEffect(() => {
        console.log('Hello')
    }, [user]);
    
    return (
        <UserContext.Provider
          value={{
            user,
            setUser,
          }}
        >
          {children}
        </UserContext.Provider>
      );
}