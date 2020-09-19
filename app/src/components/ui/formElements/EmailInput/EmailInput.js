import React, { Fragment, useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import './EmailInput.scss';

export default function EmailInput({ handler }) {
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
					placeholder="Email Address"
					onChange={sendValue}
                    type='email'
                    pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
                    title="You must enter a valid email"
				/>
			</InputGroup>
            <small className="text-center">{feedback}</small>
		</Fragment>
	);
}
