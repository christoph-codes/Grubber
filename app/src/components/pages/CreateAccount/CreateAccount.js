import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './CreateAccount.scss';
import logowhite from '../../../assets/grub-logo-white-lg.svg';

import EmailInput from '../../ui/formElements/EmailInput/EmailInput';
import TextInput from '../../ui/formElements/TextInput/TextInput';
import PasswordInput from '../../ui/formElements/PasswordInput/PasswordInput';

export default function CreateAccount(props) {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [location, setLocation] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
    const [feedback, setFeedback] = useState('');

	const createAccount = () => {
		const accountDetails = {
			email,
			username,
			location,
			password,
			confirmPassword,
		};
		console.log(accountDetails);
	};
	return (
		<div className='CreateAccount'>
			<Container fluid='true'>
				<Row noGutters>
					<Col>
						<div className='create-account-img'>
							<img src={logowhite} alt='Create a Grubber Account Today!' />
						</div>
					</Col>
					<Col>
						<div className='full-height purplebg'>
							<div className='content'>
								<h1>Create Account</h1>
								<TextInput
									feedback={setFeedback}
									placeholder='Username'
									handler={setUsername}
								/>
								<TextInput
									feedback={setFeedback}
									placeholder='Location'
									handler={setLocation}
								/>
								<EmailInput
									feedback={setFeedback}
									placeholder='Enter Email Address'
									handler={setEmail}
								/>
								<PasswordInput
									feedback={setFeedback}
									placeholder='Password'
									handler={setPassword}
								/>
								<PasswordInput
									feedback={setFeedback}
									placeholder='Confirm Password'
									handler={setConfirmPassword}
								/>
								{feedback ? (
									<div className='feedabck'>
										<small className='text-center'>{feedback}</small>
									</div>
								) : null}
								<Button onClick={createAccount}>Create Account</Button>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
