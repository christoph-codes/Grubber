import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';

// import Header from '../Header/header.component';

import SplashScreen from '../SplashScreen/SplashScreen';
import CreateAccount from '../pages/CreateAccount/CreateAccount';
import HomeLogin from '../pages/HomeLogin/HomeLogin';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';

import Header from '../Header/header.component';

function App() {
	return (
		<Router>
			<div className='App'>
        <div className="page-container">
        <Header />
        <Route path='/' exact component={SplashScreen} />
		<Route path='/home' exact component={HomeLogin} />
		<Route path='/create-account' component={CreateAccount} />
		<Route path='/forgot-password' component={ForgotPassword} />
        </div>
        {/* Placeholder for footer */}
			</div>
		</Router>
	);
}

export default App;
