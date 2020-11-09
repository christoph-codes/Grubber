import React from 'react';
import './SplashScreen.scss';
import logo from '../../assets/grub-logo-white-lg.svg';

export default function SplashScreen(props) {
    return (
        <div className="SplashScreen">
            <img className="animate__animated animate__fadeInDownBig" src={logo} alt="Grubber is the future." />
        </div>
    )
}