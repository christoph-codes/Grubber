import React, { Fragment, useEffect, useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import './EmailInput.scss';

const EmailInput = ({ placeholder, handler, feedback }) => {
	const [value, setValue] = useState('');

	const sendValue = (e) => {
		let val = e.target.value;
		setValue(val);
	};

	useEffect(() => {
		if (value) {
			if (value.length > 0) {
				let regex =
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (regex.test(value)) {
					// TODO: Check to see whether the value exists in the database already
					feedback('');
				} else {
					feedback('You must enter a valid email.');
				}
			} else {
				feedback('You must enter an email address.');
			}
		}
		handler(value);
	});
	return (
		<Fragment>
			<InputGroup className="EmailInput" size="lg">
				<FormControl
					placeholder={placeholder}
					onChange={sendValue}
					type="email"
					value={value}
				/>
			</InputGroup>
		</Fragment>
	);
};

export default EmailInput;
