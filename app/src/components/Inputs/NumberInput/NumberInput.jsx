import React, { useState } from 'react';
import Input from '../Input';
import './NumberInput.scss';

const NumberInput = ({ value, setValue, ...rest }) => {
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
			type="number"
			feedback={feedback}
			setValue={validate}
			value={value}
			{...rest}
		/>
	);
};

export default NumberInput;
