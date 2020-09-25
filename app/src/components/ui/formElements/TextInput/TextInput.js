import React, { Fragment } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import './TextInput.scss'

export default function TextInput({ placeholder, handler, feedback}) {

    const sendValue = (e) => {
        let val = e.target.value;
        if(val.length > 0) {
                feedback('')
        } else {
            feedback('You must fill in the field.')
        }
        handler(val);
    }
	return (
		<Fragment>
			<InputGroup className='TextInput' size='lg'>
				<FormControl
					placeholder={placeholder}
					onChange={sendValue}
                    type='text'
				/>
			</InputGroup>
		</Fragment>
    );
}