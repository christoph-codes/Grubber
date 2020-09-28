import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';

// import Header from '../Header/header.component';

import SplashScreen from '../SplashScreen/SplashScreen';
import CreateAccount from '../pages/CreateAccount/CreateAccount';
import HomeLogin from '../pages/HomeLogin/HomeLogin';

function App() {
	return (
		<Router>
			<div className='App'>
        {/* Placeholder for header */}
        <div className="page-container">
        <Route path='/' exact component={SplashScreen} />
		<Route path='/home' exact component={HomeLogin} />
		<Route path='/create-account' component={CreateAccount} />
        </div>
        {/* Placeholder for footer */}
			</div>
		</Router>
	);
}

export default App;
