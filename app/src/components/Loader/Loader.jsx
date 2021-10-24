import React from 'react';
import loaderIcon from '../../assets/food-icon.svg';
import './Loader.scss';

export default function Loader() {
	return <img src={loaderIcon} className='Loader' alt='loading' />;
}
