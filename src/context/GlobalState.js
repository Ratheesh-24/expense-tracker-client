import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { v4 as uuidv4 } from 'uuid';

// Initial state
const initialState = {
	token: localStorage.getItem('token'),
	user: null,
	isAuthenticated: null,
	transactions: [],
	error: null,
	loading: true,
	alerts: []
};

//create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(AppReducer, initialState);

	function setAlert(message, alertType, timeout = 4000) {
		const id = uuidv4();

		dispatch({
			type: 'SET_ALERT',
			payload: { id, message, alertType }
		});

		setTimeout(() => dispatch({ type: 'REMOVE_ALERT', payload: id }), timeout);
	}

	async function loadUser() {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		try {
			const res = await axios.get('/api/auth');
			console.log(res.data);
			dispatch({
				type: 'USER_LOADED',
				payload: res.data
			});
		} catch (err) {
			console.log(err.message);
			dispatch({
				type: 'AUTH_ERROR',
				payload: err.response.data.message
			});
		}
	}

	async function register({ name, email, password }) {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/users', { name, email, password }, config);

			dispatch({
				type: 'REGISTER_SUCCESS',
				payload: res.data
			});

			dispatch(loadUser());
		} catch (error) {
			const alert = error.response.data.message;

			setAlert(alert, 'danger');

			dispatch({
				type: 'REGISTER_FAIL'
			});
		}
	}

	async function login(email, password) {
		const body = { email, password };
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/auth', body, config);
			dispatch({
				type: 'LOGIN_SUCCESS',
				payload: res.data
			});

			dispatch(loadUser());
		} catch (error) {
			const alert = error.response.data.message;
			setAlert(alert, 'danger');

			dispatch({
				type: 'LOGIN_FAIL'
			});
		}
	}

	function logout() {
		dispatch({ type: 'LOGOUT' });
	}

	//Action
	async function getTransactions() {
		try {
			const res = await axios.get('/api/transactions');

			dispatch({
				type: 'GET_TRANSACTIONS',
				payload: res.data.data
			});
		} catch (err) {
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: err.response.data.message
			});
		}
	}
	async function deleteTransaction(id) {
		try {
			await axios.delete(`/api/transactions/${id}`);

			dispatch({
				type: 'DELETE_TRANSACTION',
				payload: id
			});
			setAlert('Successfully Deleted!', 'success');
		} catch (err) {
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: err.response.data.message
			});
		}
	}

	async function addTransaction(transaction) {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/transactions', transaction, config);
			console.log(res.data);
			console.log(res.data.data);
			dispatch({
				type: 'ADD_TRANSACTION',
				payload: res.data.data
			});
			setAlert('Successfully Added!', 'success');
		} catch (err) {
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: err.response.data.message
			});
		}
	}

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				error: state.error,
				loading: state.loading,
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				token: state.token,
				alerts: state.alerts,
				getTransactions,
				deleteTransaction,
				addTransaction,
				register,
				loadUser,
				setAlert,
				logout,
				login
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
