import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ className, variant, children, ...rest }) => {
	return (
		<button
			type="button"
			className={`Button ${className || ''} ${variant}`}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;

Button.propTypes = {
	variant: PropTypes.string,
};

Button.defaultProps = {
	variant: 'primary',
};
