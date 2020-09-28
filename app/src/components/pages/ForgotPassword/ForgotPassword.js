import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './ForgotPassword.scss';
import logowhite from '../../../assets/grub-logo-white-lg.svg';
import ForgotPasswordForm from '../../ForgotPasswordForm/ForgotPasswordForm';

export default function ForgotPassword(props) {
     return (
        <div className='ForgotPassword'>
            <Container fluid='true'>
				<Row noGutters>
					<Col md={true} sm={12}>
						<div className='half-img'>
							<img src={logowhite} alt='Recover your Grubber Password!' />
						</div>
					</Col>
					<Col md={true} sm={12}>
						<ForgotPasswordForm/>
					</Col>
				</Row>
			</Container>
        </div>
    );
}