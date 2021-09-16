import React, { Fragment, useEffect, useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import './PasswordInput.scss';

const PasswordInput = ({ placeholder, handler, feedback }) => {
	const [value, setValue] = useState('');
	const sendValue = (e) => {
		let val = e.target.value;
		setValue(val);
	};

	useEffect(() => {
		if (value) {
			if (value.length > 0) {
				let regex =
					/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
				if (regex.test(value)) {
					feedback(null);
				} else {
					feedback(
						'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'
					);
				}
			} else {
				feedback('You must enter a password.');
			}
		}
		handler(value);
	});
	return (
		<Fragment>
			<InputGroup className="PasswordInput" size="lg">
				<FormControl
					placeholder={placeholder}
					onChange={sendValue}
					type="password"
					min="6"
					autoComplete="new-password"
					value={value}
				/>
			</InputGroup>
		</Fragment>
	);
};

export default PasswordInput;
