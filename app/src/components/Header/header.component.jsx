import React from 'react';
import './header.styles.scss';

import { Link } from 'react-router-dom';

import logo from '../../assets/grubber_logo.svg';

const Header = () => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <img src={logo} className='logo' alt='Grubber is the future.'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/'>
                HOME
            </Link>
            <Link className='option' to='/login'>
                LOGIN
            </Link>
            <Link className='option' to='/create-account'>
                CREATE ACCOUNT
            </Link>
        </div>
    </div>
)

export default Header;