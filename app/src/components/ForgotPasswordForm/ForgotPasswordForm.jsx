import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Button } from 'react-bootstrap';
import EmailInput from '../Inputs/EmailInput';
import './ForgotPasswordForm.scss';

const ForgotPasswordForm = () => {
	const [email, setEmail] = useState('');
	const [feedback, setFeedback] = useState('');

	const recover = () => {
		if (email) {
			if (!feedback) {
				// TODO: Send account details to database
				console.log(email);
			} else {
				setFeedback('You must enter a valid email');
			}
		} else {
			setFeedback('You must enter an email');
		}
	};

	useEffect(() => {
		// Validate correct email

		if (email.length > 0) {
			let isGoodEmail = true;
			if (isGoodEmail) {
				setFeedback('');
			} else {
				setFeedback('Please enter your account email.');
			}
		}
	}, [email]);

	return (
		<Col className='ForgotPasswordForm'>
			<div className='full-height purplebg'>
				<div className='content'>
					<h1>Forgot Password?</h1>
					<EmailInput
						feedback={setFeedback}
						placeholder='Email Address'
						handler={setEmail}
						required={true}
					/>
					{feedback ? (
						<div className='feedback'>
							<small>{feedback}</small>
						</div>
					) : null}
					<Button onClick={recover}>Recover Password</Button>
					<div className='additional-form-links'>
						<Link to='/create-account'>Create An Account?</Link>
						<Link to='/'>Remember Your Password? Login</Link>
					</div>
				</div>
			</div>
		</Col>
	);
};

export default ForgotPasswordForm;
