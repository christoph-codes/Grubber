import React from 'react';
import { Row, Col } from 'react-bootstrap';
import UserDashProfile from '../UserDashProfile/UserDashProfile';
import './UserDashContainer.scss';

export default function UserDashContainer(props) {
     return (
        <div className='UserDashContainer'>
            <Row>
                <Col xs md="9">
                    User Primary Area List
                </Col>
                <Col xs md="3" className="d-none d-lg-block">
                    <UserDashProfile/>
                </Col>
            </Row>
        </div>
    );
}