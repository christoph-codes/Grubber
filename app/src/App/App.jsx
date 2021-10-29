import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MarketingFrame from '../components/Frames/MarketingFrame';
import UserFrame from '../components/Frames/UserFrame';
import UserProvider from '../providers/UserProvider';
import './App.scss';

const App = () => {
	return (
		<Router>
			<div className="App">
				<div className="page-container">
					<UserProvider>
						<Switch>
							<Route path="/dashboard" component={UserFrame} />
							<Route path="/" component={MarketingFrame} />
						</Switch>
					</UserProvider>
				</div>
				{/* Placeholder for footer */}
			</div>
		</Router>
	);
};

export default App;
