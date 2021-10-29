import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
	const history = useHistory();
	const [user, setUser] = useState(() => {
		const loggedInUser = localStorage.getItem('grub_user');
		if (loggedInUser) {
			return {
				...JSON.parse(loggedInUser),
				loggedInStatus: true,
			};
		} else {
			return {
				user_name: '',
				first_name: '',
				last_name: '',
				user_gender: '',
				favorite_food: '',
				user_email: '',
				location: '',
				user_description: '',
				created_on: '',
				last_updated: '',
				top_three: [],
				loggedInStatus: false,
			};
		}
	});

	useEffect(() => {
		// For development only
		if (window.location.hostname === 'localhost') {
			setUser({
				user_name: 'tkcwebdev',
				first_name: 'Christopher',
				last_name: 'Jones',
				user_gender: 'male',
				favorite_food: 'Chicken Wings & Caesar Salad',
				user_email: 'tkcwebdev@gmail.com',
				location: 'Las Vegas, NV, 89149',
				user_description:
					"I'm the best at finding awesome eateries, you should join me some time!",
				created_on: '',
				last_updated: '',
				top_three: ['American', 'Mexican', 'Italian'],
				loggedInStatus: true,
			});
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('grub_user', JSON.stringify(user));
	}, [user]);

	const logout = () => {
		console.log('Logging out');
		localStorage.clear();
		history.push('/');
	};

	return (
		<UserContext.Provider value={{ user, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
