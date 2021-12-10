/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import React, { Fragment, useContext, useEffect } from 'react';
import Register from './screens/Register';
import NavBar from './screens/NavBar';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import AlertCard from './components/Alert';
import { AnimatePresence } from 'framer-motion';
import { GlobalContext } from './context/GlobalState';
import setAuthToken from './utils/setAuthToken';
import TabledData from './components/TabledData';
import PrivateRoute from './components/PrivateRouting';

const App = () => {
	const location = useLocation();

	const { loadUser } = useContext(GlobalContext);

	useEffect(() => {
		// check for token in Local Storage in browser
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		//eslint-disable-next-line
		loadUser();

		/* 	window.addEventListener('storage', () => {
			if (!localStorage.token) return store.dispatch({ type: LOGOUT });
		}); */
	}, []);

	return (
		<AnimatePresence exitBeforeEnter>
			<Fragment>
				<NavBar />
				<AlertCard />
				<Switch location={location} key={location.key}>
					<Route exact path='/' component={Landing} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={Login} />
					<PrivateRoute exact path='/dashboard' component={Dashboard} />
					<PrivateRoute exact path='/tabledData' component={TabledData} />
				</Switch>
			</Fragment>
		</AnimatePresence>
	);
};

export default App;
