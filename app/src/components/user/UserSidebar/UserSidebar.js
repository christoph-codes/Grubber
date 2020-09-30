import React from 'react';
import './UserSidebar.scss';
import logo from '../../../assets/grub-logo-primary.svg';

export default function UserSidebar(props) {
     return (
        <div className='UserSidebar'>
            <div className="logo">
                <img src={logo} alt="Grubber Dashboard Logo" />
            </div>
            User Sidebar Navigation
            <div className="footer text-center">
                <p>Let’s Grub.<br/>
                2020 © Grubber Limited</p>
            </div>
        </div>
    );
}