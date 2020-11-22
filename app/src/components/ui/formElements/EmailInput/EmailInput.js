import React, { Fragment, useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import './EmailInput.scss';

export default function EmailInput({ placeholder, handler}) {
    const [value,setValue] = useState('')

    const sendValue = (e) => {
        let val = e.target.value;
        setValue(val);
        handler(val);
    }

	return (
		<Fragment>
			<InputGroup className='EmailInput' size='lg'>
				<FormControl
					placeholder={placeholder}
					onChange={sendValue}
                    type='email'
                    value={value}
				/>
			</InputGroup>
		</Fragment>
	);
}
