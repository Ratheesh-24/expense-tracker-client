import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { sideUp, fadeInUp } from '../motion/animation';
import { motion } from 'framer-motion';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { GlobalContext } from '../context/GlobalState';

const Login = () => {
	const [ formData, setFormData ] = useState({
		email: '',
		password: '',
		passwordConfirm: ''
	});

	const { email, password, passwordConfirm } = formData;
	const { login, setAlert, isAuthenticated } = useContext(GlobalContext);

	const onChange = (e) =>
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== passwordConfirm) {
			setAlert('Password is Not Match!', 'danger');
		} else {
			login( email, password );
		}
	};

	//Redirect if user logged in
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<motion.div className='mt-5 main-shape' variants={sideUp} initial='initial' animate='animate'>
			<Container className='shapes-1'>
				<Row className='justify-content-md-center'>
					<Col lg={8} sm={12}>
						<motion.h3 className='text-center' variants={fadeInUp} initial='initial' animate='animate'>
							Log In
						</motion.h3>
						<motion.p className='text-center' variants={fadeInUp} initial='initial' animate='animate'>
							<i className='fas fa-user mr-2 ' /> Sign in Your Account
						</motion.p>
					</Col>
					<Col lg={8}>
						<Form className='form' onSubmit={(e) => onSubmit(e)}>
							<Form.Group>
								<Form.Label>Email Address</Form.Label>
								<Form.Control
									type='email'
									placeholder='Enter email'
									name='email'
									value={email}
									required
									onChange={(e) => onChange(e)}
								/>
								<Form.Text className='text-muted'>
									We'll never share your email with anyone else.
								</Form.Text>
							</Form.Group>

							<Form.Group className='Col-6'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Password'
									name='password'
									minLength='6'
									value={password}
									required
									onChange={(e) => onChange(e)}
								/>
							</Form.Group>

							<Form.Group className='Col-6'>
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type='confirmPassword'
									placeholder='Confirm Password'
									name='passwordConfirm'
									value={passwordConfirm}
									minLength='6'
									required
									onChange={(e) => onChange(e)}
								/>
							</Form.Group>

							<Row>
								<Col lg={2}>
									<Button variant='info' size='md' type='submit'>
										Login
									</Button>
								</Col>
								<Col lg={10} className='d-flex align-items-center'>
									{' '}
									<motion.p className='my-1' variants={fadeInUp} initial='initial' animate='animate'>
										Not having one ? Create a new account {' '}
										<Link className='color-pm fw-bolder mx-2' to='/register'>
											Register
										</Link>
									</motion.p>
								</Col>
							</Row>
						</Form>
					</Col>
				</Row>

				<h4 style={{color: "tomato", paddingTop:"50px"}}> DEMO CREDENTIALS </h4>
				<h6> Email : test@gmail.com </h6>
				<h6> Password : test@12 </h6>

			</Container>
		</motion.div>
	);
};

export default Login;
