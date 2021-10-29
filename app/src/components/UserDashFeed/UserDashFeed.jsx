import React from 'react';
import DashboardContainer from '../DashboardContainer';
import UserDashActivity from '../UserDashActivity/UserDashActivity';
import UserGrubRequest from '../UserGrubRequest/UserGrubRequest';
import './UserDashFeed.scss';

const UserDashFeed = () => {
	return (
		<DashboardContainer
			title="Ready for some grub?"
			className="UserDashFeed"
		>
			<UserGrubRequest />
			<UserDashActivity />
		</DashboardContainer>
	);
};

export default UserDashFeed;
