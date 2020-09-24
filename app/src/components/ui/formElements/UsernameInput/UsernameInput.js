import React, { Fragment, useEffect, useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import './UsernameInput.scss'

export default function UsernameInput({ placeholder, handler, feedback}) {
    const [value,setValue] = useState('');

    const sendValue = (e) => {
        let val = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        setValue(val)
        if(val.length > 0) {
            let regex = /^[a-z0-9.]{6,16}$/
            if(regex.test(val)) {
                    setValue(val)
                    feedback('')
            } else {
                feedback('Your unique username must be between 6 to 16 characters. It may include dashes or underscores.')
            }
        } else {
            feedback('You must enter a unique username.')
        }

    }
    useEffect(() => {
        handler(value);
    })

	return (
		<Fragment>
			<InputGroup className='UsernameInput' size='lg'>
				<FormControl
					placeholder={placeholder}
					onChange={sendValue}
                    type='text'
                    value={value}
                    maxLength="16"
				/>
			</InputGroup>
		</Fragment>
    );
}