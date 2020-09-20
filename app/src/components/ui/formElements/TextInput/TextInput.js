import React, { Fragment } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import './TextInput.scss'

export default function TextInput({ placeholder, handler, feedback}) {

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
			<InputGroup className='EmailInput' size='lg'>
				<FormControl
					placeholder={placeholder}
					onChange={sendValue}
                    type='text'
				/>
			</InputGroup>
		</Fragment>
    );
}