import React from 'react';
import logo from '../../assets/images/grubber_logo.svg';
import './SplashScreen.scss';

const SplashScreen = () => {
	return (
		<div className="SplashScreen animate__fadeInUpBig animate__fadeOutUpBig">
			<img src={logo} alt="Grubber is the future." />
		</div>
	);
};

export default SplashScreen;
