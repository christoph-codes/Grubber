import React, { Fragment, useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import './TextInput.scss'

export default function TextInput({ placeholder, handler}) {
    const [feedback, setFeedback] = useState('');

    const sendValue = (e) => {
        if(e.target.checkValidity) {
            setFeedback(e.target.validationMessage)
        } else {
            setFeedback('');
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
                    title="You must enter a valid email"
				/>
			</InputGroup>
            <small className="text-center">{feedback}</small>
		</Fragment>
    );
}