import React from 'react';
import './SplashScreen.scss';
import logo from '../../assets/grubber_logo.svg';

export default function SplashScreen(props) {
    return (
        <div className="SplashScreen">
            <img src={logo} alt="Grubber is the future." />
        </div>
    )
}