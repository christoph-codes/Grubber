import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import UserDashFriends from '../pages/UserDashFriends/UserDashFriends';
import UserDashMessages from '../pages/UserDashMessages/UserDashMessages';
import UserDashRequests from '../pages/UserDashRequests/UserDashRequests';
import UserDashSettings from '../pages/UserDashSettings/UserDashSettings';
import UserDashProfile from '../UserDashProfile/UserDashProfile';
import UserDashFeed from '../UserDashFeed/UserDashFeed';
import './UserDashContainer.scss';

export default function UserDashContainer(props) {
     return (
        <div className='UserDashContainer'>
            <Row>
                <Col xs md="12" lg="9">
                    <Switch>
                        <Route path="/dashboard/requests" exact component={UserDashRequests} />
                        <Route path="/dashboard/messages" exact component={UserDashMessages} />
                        <Route path="/dashboard/friends" exact component={UserDashFriends} />
                        <Route path="/dashboard/settings" exact component={UserDashSettings} />
                        <Route path="/dashboard" exact component={UserDashFeed} />
                    </Switch>
                </Col>
                <Col xs lg="3" className="d-none d-lg-block">
                    <UserDashProfile/>
                </Col>
            </Row>
        </div>
    );
}