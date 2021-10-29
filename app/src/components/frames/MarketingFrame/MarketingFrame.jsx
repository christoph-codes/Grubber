import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './MarketingFrame.scss';

import SplashScreen from '../../SplashScreen';
import CreateAccount from '../../../pages/CreateAccount';
import HomeLogin from '../../../pages/HomeLogin';
import ForgotPassword from '../../../pages/ForgotPassword';

import Header from '../../Header';

const MarketingFrame = () => {
	return (
		<div className='MarketingFrame'>
			<Header />
			<Switch>
				<Route path='/create-account' exact component={CreateAccount} />
				<Route
					path='/forgot-password'
					exact
					component={ForgotPassword}
				/>
				<Route path='/splash' exact component={SplashScreen} />
				<Route path='/' exact component={HomeLogin} />
			</Switch>
		</div>
	);
};

export default MarketingFrame;
