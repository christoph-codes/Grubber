import React, { Fragment } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import './NumberInput.scss';

export default function NumberInput({ placeholder, handler, feedback}) {

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
			<InputGroup className='NumberInput' size='lg'>
				<FormControl
					placeholder={placeholder}
					onChange={sendValue}
                    type='number'
				/>
			</InputGroup>
		</Fragment>
    );
}