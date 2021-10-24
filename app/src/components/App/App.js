import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MarketingFrame from '../Frames/MarketingFrame/MarketingFrame';
import UserFrame from '../Frames/UserFrame/UserFrame';
import Loader from '../Loader/Loader';
import './App.scss';

function App() {
	return (
		<Router>
			<div className='App'>
				<div className='page-container'>
					<Switch>
						<Route component={Loader} />
						<Route path='/dashboard' component={UserFrame} />
						<Route path='/' component={MarketingFrame} />
					</Switch>
				</div>
				{/* Placeholder for footer */}
			</div>
		</Router>
	);
}

export default App;
