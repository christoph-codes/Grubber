import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/grubber_logo.svg';
import './Header.scss';

const Header = () => (
	<div className="header">
		<NavLink className="logo-container" to="/">
			<img src={logo} className="logo" alt="Grubber is the future." />
		</NavLink>
		<div className="options">
			<NavLink
				className="option"
				activeStyle={{
					color: '#DBA74C',
				}}
				exact
				to="/"
			>
				Home
			</NavLink>
			<NavLink
				className="option"
				activeStyle={{
					color: '#DBA74C',
				}}
				to="/create-account"
			>
				Create Account
			</NavLink>
		</div>
	</div>
);

export default Header;
