import React, { Fragment } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import './PasswordInput.scss'

export default function PasswordInput({ placeholder, handler, feedback}) {

    const sendValue = (e) => {
        if(e.target.checkValidity) {
            feedback(e.target.validationMessage)
        } else {
            feedback('');
        }
        handler(e.target.value)
    }
	return (
		<Fragment>
			<InputGroup className='PasswordInput' size='lg'>
				<FormControl
					placeholder={placeholder}
					onChange={sendValue}
                    type='password'
                    title="Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
                    min="6"
                    // pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
				/>
			</InputGroup>
		</Fragment>
    );
}