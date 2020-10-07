import React from 'react';
import './SplashScreen.scss';
import logo from '../../assets/grubber_logo.svg';

export default function SplashScreen(props) {
    return (
        <div className="SplashScreen animate__fadeInUpBig animate__fadeOutUpBig">
            <img src={logo} alt="Grubber is the future." />
        </div>
    )
}