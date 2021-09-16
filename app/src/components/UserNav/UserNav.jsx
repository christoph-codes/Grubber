import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Button from '../Button';
import dashboardLinks from '../../util/dashboardLinks';
import gLogo from '../../assets/images/grub-logo-primary.svg';
import './UserNav.scss';

const UserNav = () => {
	return (
		<nav className="UserNav py-3">
			<Row>
				<Col className="border-right ">
					<img
						className="navlogo"
						src={gLogo}
						alt="Grubber Icon Logo"
					/>
				</Col>
				{dashboardLinks.map((dlink, index) => {
					return (
						<Col xs key={index}>
							<NavLink exact to={dlink.url}>
								<Button
									className="mx-auto mb-0"
									variant="ghost"
								>
									<img
										className="user-navlink-icon"
										src={dlink.icon}
										alt={dlink.name}
									/>
								</Button>
							</NavLink>
						</Col>
					);
				})}
			</Row>
		</nav>
	);
};

export default UserNav;
