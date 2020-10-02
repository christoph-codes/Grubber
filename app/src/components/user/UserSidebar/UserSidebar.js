import React from 'react';
import './UserSidebar.scss';
import logo from '../../../assets/grub-logo-primary.svg';
import icon from '../../../assets/g-icon.svg';
import house from '../../../assets/house-icon.svg';
import food from '../../../assets/food-icon.svg';
import friends from '../../../assets/friends-icon.svg';
import messages from '../../../assets/messages-icon.svg';
import gear from '../../../assets/gear-icon.svg';
import { NavLink } from 'react-router-dom';

export default function UserSidebar(props) {
    const userNavigationLinks = [
        {
            name: 'Dashboard',
            icon: house,
            url: '/dashboard',
        },
        {
            name: 'Requests',
            icon: food,
            url: '/dashboard/requests',
        },
        {
            name: 'Messages',
            icon: messages,
            url: '/dashboard/messages',
        },
        {
            name: 'Friends',
            icon: friends,
            url: '/dashboard/friends',
        },
        {
            name: 'Settings',
            icon: gear,
            url: '/dashboard/settings',
        },
    ]
    const userNavList = userNavigationLinks.map(link => {
        return (
            <li key={link.name}>
                <NavLink exact to={link.url}>
                    <img className="user-navlink-icon" src={link.icon} alt={link.name} /><span className="user-navlink-label d-sm-none d-md-inline-block">{link.name}</span>
                </NavLink>
            </li>
        )
    })
     return (
        <div className='UserSidebar p-md-4 p-sm-1'>
            <div className="logo">
                <img className="d-sm-none d-md-block" src={logo} alt="Grubber Dashboard Logo" />
                <img className="d-sm-block d-md-none" src={icon} alt="Grubber Dashboard Logo" />
            </div>
            <ul className="user-nav-list text-left">
                {userNavList}
            </ul>
            
            <div className="footer text-center d-sm-none d-md-block">
                <p>Let’s Grub.<br/>
                2020 © Grubber Limited</p>
            </div>
        </div>
    );
}