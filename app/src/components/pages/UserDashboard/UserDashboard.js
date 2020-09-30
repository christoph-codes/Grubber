import React from 'react';
import { Col, Row } from 'react-bootstrap';
import UserSidebar from '../../user/UserSidebar/UserSidebar';
import UserDashContainer from '../../user/UserDashContainer/UserDashContainer';
import './UserDashboard.scss';

export default function UserDashboard(props) {
     return (
        <div className='UserDashboard'>
            <Row noGutters="true">
                <Col sm="2" md="3" xl="2">
                    <UserSidebar/>
                </Col>
                <Col sm="10" md="9" xl="10">
                    <UserDashContainer/>
                </Col>
            </Row>
        </div>
    );
}