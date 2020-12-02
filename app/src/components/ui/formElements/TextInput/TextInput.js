import React, { Fragment } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import './TextInput.scss'

export default function TextInput({ placeholder, handler, onBlurHandler}) {

    const sendValue = (e) => {
        let val = e.target.value;
        handler(val);
    }
	return (
		<Fragment>
			<InputGroup className='TextInput' size='lg'>
				<FormControl
					placeholder={placeholder}
					onChange={sendValue}
					onBlur={onBlurHandler}
                    type='text'
				/>
			</InputGroup>
		</Fragment>
    );
}