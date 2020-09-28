import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './CreateAccount.scss';
import logowhite from '../../../assets/grub-logo-white-lg.svg';
import CreateAccountForm from '../../CreateAccountForm/CreateAccountForm';

export default function CreateAccount(props) {
	return (
		<div className='CreateAccount'>
			<Container fluid='true'>
				<Row noGutters>
					<Col md={true} sm={12}>
						<div className='half-img'>
							<img src={logowhite} alt='Create a Grubber Account Today!' />
						</div>
					</Col>
					<Col md={true} sm={12}>
						<CreateAccountForm/>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
