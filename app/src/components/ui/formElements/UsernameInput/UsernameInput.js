import React, { Fragment, useEffect, useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import './UsernameInput.scss'

export default function UsernameInput({ placeholder, handler, feedback}) {
    const [value,setValue] = useState('')

    const sendValue = (e) => {
        let val = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        setValue(val)
        // if(val.length > 0) {
        //     let regex = /^[a-z0-9_-]{6,15}$/
        //     if(regex.test(val)) {
        //         // TODO: Check to see whether the value exists in the database already
        //         feedback('')
        //     } else {
        //         feedback('Your username may include _ and - must be between 6 to 16 characters.')
        //     }
        // } else {
        //     feedback('You must enter a unique usernamee.')
        // }
        
        // handler(val);
        console.log(value)
    }
    useEffect(() => {
        let val = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        setValue(val)
        // if(val.length > 0) {
        //     let regex = /^[a-z0-9_-]{6,15}$/
        //     if(regex.test(val)) {
        //         // TODO: Check to see whether the value exists in the database already
        //         feedback('')
        //     } else {
        //         feedback('Your username may include _ and - must be between 6 to 16 characters.')
        //     }
        // } else {
        //     feedback('You must enter a unique usernamee.')
        // }
        
        // handler(val);
        console.log(value)
    }, [value])
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