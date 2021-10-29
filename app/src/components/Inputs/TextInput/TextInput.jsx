import React, { useState } from 'react';
import Input from '../Input';
import './TextInput.scss';

const TextInput = ({ value, setValue, ...rest }) => {
	const [feedback, setFeedback] = useState('');
	const validate = (e) => {
		let val = e.target.value;
		if (val.length > 0) {
			setFeedback('');
		} else {
			setFeedback('You must fill in the field.');
		}
		setValue(val);
		setFeedback('');
	};
	return (
		<Input
			type="text"
			feedback={feedback}
			setValue={validate}
			value={value}
			{...rest}
		/>
	);
};

export default TextInput;
