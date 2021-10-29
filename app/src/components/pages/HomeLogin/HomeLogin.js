import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './HomeLogin.scss';
import logowhite from '../../../assets/grub-logo-white-lg.svg';
import LoginForm from '../../LoginForm/LoginForm';

export default function HomeLogin(props) {
     return (
        <div className='HomeLogin animate__animated animate__fadeIn'>
            <Container fluid='true'>
				<Row noGutters>
					<Col md={true} sm={12}>
						<div className='half-img'>
							<img src={logowhite} alt='Login To Your Grubber Account Today!' />
						</div>
					</Col>
					<Col md={true} sm={12}>
						<LoginForm/>
					</Col>
				</Row>
			</Container>
        </div>
    );
}