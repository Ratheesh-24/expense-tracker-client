/* eslint-disable import/no-anonymous-default-export */
import React, { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { GlobalContext } from '../context/GlobalState';

export default function() {
	const { alerts } = useContext(GlobalContext);
	return (
		alerts !== null &&
		alerts.length > 0 &&
		alerts.map(({ id, alertType, message }) => (
			<Alert key={id} variant={alertType} className='p-2 h6 text-center'>
				<i className='fas fa-bell' /> &nbsp; {message}
			</Alert>
		))
	);
}
