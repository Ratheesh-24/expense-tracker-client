import React, { useContext } from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { GlobalContext } from '../context/GlobalState';

const NavBar = () => {
	const { isAuthenticated,logout } = useContext(GlobalContext);

	const authLinks = (
		<Navbar.Collapse id='responsive-navbar-nav'>
			<Nav className='nav   justify-content-end'>
				<Nav.Link as={Link} to='/dashboard'>
					<i className='fas fa-user' />&nbsp;Dashboard
				</Nav.Link>
				<Nav.Link onClick={() => logout()}>
					<i className='fas fa-sign-out-alt' /> Logout
				</Nav.Link>
			</Nav>
		</Navbar.Collapse>
	);

	const guestLinks = (
		<Navbar.Collapse id='responsive-navbar-nav'>
			<Nav className='nav mr-5 justify-content-end'>
				<Nav.Link href='/register'>
					<i className='fas fa-user' />&nbsp;Sign Up
				</Nav.Link>
				<Nav.Link href='/login'>
					<i className='fas fa-sign-in-alt' />&nbsp;Login
				</Nav.Link>
			</Nav>
		</Navbar.Collapse>
	);

	return (
		<Navbar className='pl- nav-bar' collapseOnSelect expand='lg' bg='dark' variant='dark'>
			<Navbar.Brand href='/'>
				<Image src={logo} width='40px' height='40px' className='mr-2' />
				<span className='blush blush-hover mx-1'>Expense</span> Tracker
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='responsive-navbar-nav' />

			{isAuthenticated ? authLinks : guestLinks}
		</Navbar>
	);
};

export default NavBar;
