import React from 'react';
import './header.styles.scss';

const Header = () => (
    <div className='header'>
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