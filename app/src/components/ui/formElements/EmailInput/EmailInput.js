import React, { Fragment } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import './EmailInput.scss';

export default function EmailInput({ placeholder, handler, feedback }) {

    const sendValue = (e) => {
        let val = e.target.value;
        if(val.length > 0) {
            let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(regex.test(val)) {
                // TODO: Check to see whether the value exists in the database already
                feedback('')
            } else {
                feedback('You must enter a valid email.')
            }
        } else {
            feedback('You must enter an email address.')
        }
        handler(val);
    }
	return (
		<Fragment>
			<InputGroup className='EmailInput' size='lg'>
				<FormControl
					placeholder={placeholder}
					onChange={sendValue}
                    type='email'
				/>
			</InputGroup>
		</Fragment>
	);
}
