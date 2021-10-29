import React, { useContext } from 'react';
import './UserDashActivity.scss';
import UserGrub from '../UserGrub';
import { GrubContext } from '../../providers/GrubProvider';

const UserDashActivity = () => {
	const { grubs } = useContext(GrubContext);
	const sortedGrubs = grubs.sort((a, b) => {
		return new Date(b.creationdate) - new Date(a.creationdate);
	});
	const grublist = sortedGrubs.map((grub, index) => {
		return <UserGrub grub={grub} key={index} />;
	});
	return <div className="UserDashActivity">{grublist}</div>;
};

export default UserDashActivity;
