import React from 'react';
import './header.styles.scss';

import logo from '../../assets/grubber_logo.svg';

const Header = () => (
    <div className='header'>
        <div className='logo-container'>
            <img src={logo} className='logo' alt='Grubber is the future.'/>
        </div>
        <div className='options'>
            <div className='option'>
                HOME
            </div>
            <div className='option'>
                LOGIN
            </div>
            <div className='option'>
                CREATE ACCOUNT
            </div>
        </div>
    </div>
)

export default Header;