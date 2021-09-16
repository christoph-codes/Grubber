import React, { useContext } from 'react';
import headshot from '../../assets/images/chris-headshot.png';
import { UserContext } from '../../providers/UserProvider';
import './UserProfileSidebar.scss';

const UserProfileSidebar = () => {
	const { user, logout } = useContext(UserContext);

	return (
		<div className="UserProfileSidebar pt-5">
			<div className="user-quick-touches">
				<img
					className="headshot"
					src={headshot}
					alt={user.user_name + ' headshot'}
				/>
			</div>

			<hr />
			<div className="account-group">
				<p className="account-group-label">Name</p>
				<p>{user.user_name}</p>
			</div>
			<div className="account-group">
				<p className="account-group-label">Location</p>
				<p>{user.location}</p>
			</div>
			<div className="account-group">
				<p className="account-group-label">Favorite Food</p>
				<p>{user.favorite_food}</p>
			</div>
			<div className="account-group">
				<p className="account-group-label">Top 3 Types</p>
				<p>{user.top_three.join(', ')}</p>
			</div>
			<button className="logout" type="button" onClick={() => logout()}>
				Logout
			</button>
		</div>
	);
};

export default UserProfileSidebar;
