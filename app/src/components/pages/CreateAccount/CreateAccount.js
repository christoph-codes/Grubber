import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './CreateAccount.scss';
import logowhite from '../../../assets/grub-logo-white-lg.svg';

import EmailInput from '../../ui/formElements/EmailInput/EmailInput';
import TextInput from '../../ui/formElements/TextInput/TextInput';

export default function CreateAccount(props) {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
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
								{email || username ? (
									<p>
										{email},{username}
									</p>
								) : null}

								<EmailInput
									placeholder='Enter Email Address'
									handler={setEmail}
								/>
								<TextInput placeholder='Username' handler={setUsername} />
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
