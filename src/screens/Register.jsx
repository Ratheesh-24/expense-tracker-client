import React, { useState, useContext } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { sideUp, fadeInUp } from '../motion/animation';
import { motion } from 'framer-motion';
import { GlobalContext } from '../context/GlobalState';

const Register = () => {
	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirm: ''
	});

	const { name, email, password, passwordConfirm } = formData;

	const { register, setAlert, isAuthenticated } = useContext(GlobalContext);

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== passwordConfirm) {
			setAlert('Password is Not Match!', 'danger');
		} else {
			register({ name, email, password });
		}
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Container className='shapes'>
			<motion.div className='mt-4 main-shape' variants={sideUp} initial='initial' animate='animate'>
				<Row className=' justify-content-md-center '>
					<Col lg={8} sm={12}>
						<motion.h3
							className='text-center fw-bold color-pm '
							variants={fadeInUp}
							initial='initial'
							animate='animate'
						>
							Sign Up
						</motion.h3>
						<motion.p className='text-center ' variants={fadeInUp} initial='initial' animate='animate'>
							<i className='fas fa-user mr-2 ' /> Create Your Account
						</motion.p>
					</Col>
					<Col lg={8}>
						<Form className='form' onSubmit={(e) => onSubmit(e)}>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='Enter name'
									name='name'
									value={name}
									required
									onChange={(e) => onChange(e)}
								/>
							</Form.Group>
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
									placeholder='Password should have min 6 characters'
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
								<Col md={2}>
									<Button variant='info' size='md' type='submit'>
										Sign Up
									</Button>
								</Col>
								<Col md={9} className='d-flex align-items-center'>
									{' '}
									<motion.p className='my-1' variants={fadeInUp} initial='initial' animate='animate'>
										Already have an account?{' '}
										<Link className='color-pm fw-bolder mx-2' to='/login'>
											Login
										</Link>
									</motion.p>
								</Col>
							</Row>
						</Form>
					</Col>
				</Row>
			</motion.div>
		</Container>
	);
};

export default Register;
