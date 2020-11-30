import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import './CreateAccount.scss';
import logowhite from '../../../assets/grub-logo-white-lg.svg';
import CreateAccountForm from '../../CreateAccountForm/CreateAccountForm';
import PersonalDetailsForm from '../../PersonalDetailsForm/PersonalDetailsForm';

export default function CreateAccount(props) {
	return (
		<div className='CreateAccount animate__animated animate__fadeIn'>
			<Container fluid='true'>
				<Row noGutters>
					<Col md={true} sm={12}>
						<div className='half-img'>
							<img src={logowhite} alt='Create a Grubber Account Today!' />
						</div>
					</Col>
					<Col md={true} sm={12}>
						<Switch>
							<Route path="/create-account" exact component={CreateAccountForm} />
							<Route path="/create-account/personal-details" exact component={PersonalDetailsForm} />
						</Switch>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
