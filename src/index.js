import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';

ReactDOM.render(
	<GlobalProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</GlobalProvider>,
	document.getElementById('root')
);
