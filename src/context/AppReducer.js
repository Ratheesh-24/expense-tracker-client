/* eslint-disable import/no-anonymous-default-export */

export default (state, action) => {
	const { payload, type } = action;

	switch (type) {
		case 'SET_ALERT':
			return {
				...state,
				alerts: [ payload ]
			};

		case 'REMOVE_ALERT':
			return {
				...state,
				alerts: state.alerts.filter((alert) => alert.id !== payload)
			};

		case 'USER_LOADED':
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload
			};

		case 'REGISTER_SUCCESS':
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			};

		case 'LOGIN_SUCCESS':
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			};

		case 'REGISTER_FAIL':
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};

		case 'AUTH_ERROR':
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};

		case 'LOGIN_FAIL':
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};

		case 'LOGOUT':
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};

		case 'ACCOUNT_DELETED':
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};

		case 'GET_TRANSACTIONS':
			return {
				...state,
				loading: false,
				transactions: payload
			};
		case 'DELETE_TRANSACTION':
			return {
				...state,
				transactions: state.transactions.filter((transaction) => transaction._id !== payload)
			};
		case 'ADD_TRANSACTION':
			return {
				...state,
				transactions: [ ...state.transactions, payload ]
			};
		case 'TRANSACTION_ERROR':
			return {
				...state,
				error: payload
			};
		default:
			return state;
	}
};
