import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import GrubProvider from '../../../providers/GrubProvider';
import UserDashFriends from '../../../pages/UserDashFriends';
import UserDashMessages from '../../../pages/UserDashMessages';
import UserDashRequests from '../../../pages/UserDashRequests';
import UserDashSettings from '../../../pages/UserDashSettings';
import UserDashProfile from '../../../pages/UserDashProfile';
import UserDashNotifications from '../../../pages/UserDashNotifications';
import UserProfileSidebar from '../../UserProfileSidebar';
import UserDashFeed from '../../UserDashFeed';
import UserNav from '../../UserNav';
import './UserFrame.scss';

const UserFrame = ({ children }) => {
	return (
		<div className="UserFrame">
			<UserNav />
			<Row>
				<Col xs md={12} lg={9} className="pt-5">
					<GrubProvider>
						<Switch>
							<Route
								path="/dashboard/requests"
								exact
								component={UserDashRequests}
							/>
							<Route
								path="/dashboard/messages"
								exact
								component={UserDashMessages}
							/>
							<Route
								path="/dashboard/friends"
								exact
								component={UserDashFriends}
							/>
							<Route
								path="/dashboard/profile"
								exact
								component={UserDashProfile}
							/>
							<Route
								path="/dashboard/notifications"
								exact
								component={UserDashNotifications}
							/>
							<Route
								path="/dashboard/settings"
								exact
								component={UserDashSettings}
							/>
							<Route
								path="/dashboard"
								exact
								component={UserDashFeed}
							/>
							{/* <Route path="/dashboard" component={UserDashboard} /> */}
						</Switch>
					</GrubProvider>
				</Col>
				<Col>
					<UserProfileSidebar />
				</Col>
			</Row>
		</div>
	);
};

export default UserFrame;
