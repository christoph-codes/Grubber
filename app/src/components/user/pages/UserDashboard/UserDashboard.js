import React from 'react';
import { Col, Row } from 'react-bootstrap';
import UserSidebar from '../../UserSidebar/UserSidebar';
import UserDashContainer from '../../UserDashContainer/UserDashContainer';
import './UserDashboard.scss';

export default function UserDashboard(props) {
     return (
        <div className='UserDashboard'>
            <Row noGutters="true">
                <Col xs="1" sm="2" md="3" xl="2">
                    <UserSidebar/>
                </Col>
                <Col xs="11" sm="10" md="9" xl="10">
                    <UserDashContainer/>
                </Col>
            </Row>
        </div>
    );
}