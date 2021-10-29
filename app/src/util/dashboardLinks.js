import house from '../assets/images/house-icon.svg';
import food from '../assets/images/food-icon.svg';
import friends from '../assets/images/friends-icon.svg';
import messages from '../assets/images/messages-icon.svg';
import gear from '../assets/images/gear-icon.svg';
import avatar from '../assets/images/avatar-icon.svg';
import bell from '../assets/images/bell-icon.svg';

const dashboardLinks = [
	{
		name: 'Dashboard',
		icon: house,
		url: '/dashboard',
	},
	{
		name: 'Requests',
		icon: food,
		url: '/dashboard/requests',
	},
	{
		name: 'Messages',
		icon: messages,
		url: '/dashboard/messages',
	},
	{
		name: 'Friends',
		icon: friends,
		url: '/dashboard/friends',
	},
	{
		name: 'Notifications',
		icon: bell,
		url: '/dashboard/notifications',
	},
	{
		name: 'Profile',
		icon: avatar,
		url: '/dashboard/profile',
	},
	{
		name: 'Settings',
		icon: gear,
		url: '/dashboard/settings',
	},
];

export default dashboardLinks;
