import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import HttpService from './services/HttpService/HttpService';
import './index.scss';

HttpService.requestGet(`${process.env.REACT_APP_API_HOST}/healthcheck`)
	.then(() => {
		// load the app
	})
	.catch(() => {
		//redirect to error page
	});

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
