import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { AddTransaction } from '../components/AddTransaction';
import moment from 'moment';
import { motion } from 'framer-motion';
import { fadeInUp } from '../motion/animation';

const DisplayMonetary = () => {
	const { transactions } = useContext(GlobalContext);
	const income = transactions
		.filter((transaction) => transaction.category === 'Income')
		.map((transaction) => transaction.amount)
		.reduce((acc, cur) => (acc += cur), 0)
		.toFixed(2);
	const expense = transactions
		.filter((transaction) => transaction.category === 'Expense')
		.map((transaction) => transaction.amount)
		.reduce((acc, cur) => (acc += cur), 0)
		.toFixed(2);

	const time = moment(new Date().getTime());
	const sec = time.fromNow(true);
	return (
		<motion.section variants={fadeInUp} initial='initial' animate='animate'>
			<Row className='d-flex justify-content-center mb-3 flex-wrap'>
				<Col md={4} className='scale-hover'>
					<Card bg='primary' text='white' className='mb-2'>
						<Card.Header>Balance</Card.Header>
						<Card.Body>
							<Card.Title>₹ {income - expense} </Card.Title>
							<Card.Text> as on {moment().format('DD-MM-YYYY')} </Card.Text>
							<small className='text-secondary'>Last updated {sec}</small>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4} className='scale-hover'>
					<Card bg='success' text='white' className='mb-2'>
						<Card.Header>Income</Card.Header>
						<Card.Body>
							<Card.Title>₹ {income}</Card.Title>
							<Card.Text> as on {moment().format('DD-MM-YYYY')} </Card.Text>
							<small className='text-secondary'>Last updated {sec}</small>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4} className='scale-hover'>
					<Card bg='warning' text='white' className='mb-2'>
						<Card.Header>Expenses</Card.Header>
						<Card.Body>
							<Card.Title>₹ {expense}</Card.Title>
							<Card.Text> as on {moment().format('DD-MM-YYYY')} </Card.Text>
							<small className='text-secondary'>Last updated {sec}</small>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<AddTransaction />

			
			<Row>
				<Col className='d-flex flex-column justify-content'>
					<Card bg='white' text='dark' className='my-2 scale-hover card-outline'>
						<Card.Body className='d-flex justify-content-around'>
							<Button variant='dark' className=''>
								<Link className='bg-dark text-light' to='/tabledData'>
									VIEW ALL TRANSACTIONS
								</Link>
							</Button>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</motion.section>
	);
};

export default DisplayMonetary;
