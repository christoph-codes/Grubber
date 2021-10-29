import React, { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import HttpService from '../../services/HttpService/HttpService'
import { getCookie, setCookie } from '../util/helpers';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user,setUser] = useState(() => {
      let cookieUser = getCookie("grubUser");

      if (cookieUser) {
        return {
          ...cookieUser
        };
      } else {
        return {};
      }

    });

    useEffect(() => {
      // Call database and return user
        HttpService.requestPost(`${process.env.REACT_APP_API_HOST}/api/auth/authorize`, user).then(response => {
          setUser(response.data);
          setCookie('grubUser',user);
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