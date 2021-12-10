import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { loading, isAuthenticated } = useContext(GlobalContext);

	return (
		<Route
			{...rest}
			render={(props) => (!loading && !isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />)}
		/>
	);
};

export default PrivateRoute;
