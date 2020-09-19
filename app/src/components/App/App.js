import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import SplashScreen from '../SplashScreen/SplashScreen';
import CreateAccount from '../pages/CreateAccount/CreateAccount';

function App() {
	return (
		<Router>
			<div className='App'>
				<Route path='/' exact component={SplashScreen} />
				<Route path='/create-account' component={CreateAccount} />
			</div>
		</Router>
	);
}

export default App;
