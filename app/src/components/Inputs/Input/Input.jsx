import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = ({
	className,
	label,
	inputClass,
	setValue,
	value = '',
	type,
	required,
	feedback = '',
	onBlur,
	onFocus,
	...rest
}) => {
	const [fb, setFb] = useState(feedback);
	const [focus, setFocus] = useState(false);

	useEffect(() => {
		setFb(feedback);
	}, [feedback]);

	useEffect(() => {
		if (focus) {
			setFb('');
		}
	}, [focus, setFb]);

	const validate = () => {
		console.log(value);
		if (required) {
			if (value.length > 0) {
				setFb('');
			} else {
				setFb('This field cant be left blank.');
			}
		}
	};

	return (
		<label className={`Input ${className || ''} ${fb ? 'error' : ''}`}>
			<span className="label">{label}</span>
			<input
				required={required}
				type={type}
				className={`${inputClass || ''}`}
				onChange={setValue}
				onBlur={() => {
					validate();
					if (onBlur) {
						onBlur();
					}
				}}
				value={value}
				onFocus={() => {
					setFocus(true);
					if (onFocus) {
						onFocus();
					}
				}}
				{...rest}
			/>
			{fb && <p className="text-danger mt-2">{fb}</p>}
		</label>
	);
};

export default Input;

Input.propTypes = {
	className: PropTypes.string,
};

Input.defaultProps = {
	className: '',
};
