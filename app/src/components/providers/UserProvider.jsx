import React, { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import HttpService from '../../services/HttpService/HttpService'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user,setUser] = useState({
      userName: 'tkcwebdev',
      userPass: 'kirk4lyf'
    });

    useEffect(() => {
      // Call database and return user
        HttpService.requestPost(`${process.env.REACT_APP_API_HOST}/api/auth/authorize`, user).then(response => {
            console.log(response.data);
        }).catch(err => {
          console.log(err)
        });
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