import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './ForgotPassword.scss';
import logowhite from '../../assets/images/grub-logo-white-lg.svg';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';

const ForgotPassword = () => {
	return (
		<div className="ForgotPassword animate__animated animate__fadeIn">
			<Container fluid="true">
				<Row noGutters>
					<Col md={true} sm={12}>
						<div className="half-img">
							<img
								src={logowhite}
								alt="Recover your Grubber Password!"
							/>
						</div>
					</Col>
					<Col md={true} sm={12}>
						<ForgotPasswordForm />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default ForgotPassword;
