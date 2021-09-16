import React from 'react';
import UserDashActivity from '../UserDashActivity/UserDashActivity';
import UserGrubRequest from '../UserGrubRequest/UserGrubRequest';
import './UserDashFeed.scss';

const UserDashFeed = () => {
	return (
		<div className="UserDashFeed animate__animated animate__fadeInUpBig">
			<UserGrubRequest />
			<UserDashActivity />
		</div>
	);
};

export default UserDashFeed;
