import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logowhite from '../../assets/images/grub-logo-white-lg.svg';
import CreateAccountForm from '../../components/CreateAccountForm';
import './CreateAccount.scss';

const CreateAccount = () => {
	return (
		<div className="CreateAccount animate__animated animate__fadeIn">
			<Container fluid="true">
				<Row noGutters>
					<Col md sm={12}>
						<div className="half-img">
							<img
								src={logowhite}
								alt="Create a Grubber Account Today!"
							/>
						</div>
					</Col>
					<Col md sm={12}>
						<CreateAccountForm />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default CreateAccount;
