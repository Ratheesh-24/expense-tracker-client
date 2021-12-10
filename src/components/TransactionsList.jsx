import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Button, Image } from 'react-bootstrap';
import Income from '../assets/Income.png';
import Expense from '../assets/expense.png';
import { motion } from 'framer-motion';
import { sideRight } from '../motion/animation';

const TransactionsList = (props) => {
	const { amount, category, subCategory, _id } = props.data;

	const { deleteTransaction } = useContext(GlobalContext);

	return (
		<motion.div className='my-3 scale-hover' variants={sideRight} initial='initial' animate='animate'>
			<div className='card card-style d-flex flex-row justify-content-around align-items-center p-3'>
				{category[0] === 'I' ? (
					<Image className='card-img' src={Income} alt='Income alt text' />
				) : (
					<Image className='card-img' src={Expense} alt='expense alt text' />
				)}

				<div className='text-center'>
					<h6 className='color-pm'>₹ {amount}</h6>
					<p className='card-text text-secondary'>{subCategory}</p>
				</div>
				<Button size='sm' className='mr-2' variant='danger' onClick={() => deleteTransaction(_id)}>
					<i className='fa fa-trash' />
				</Button>
			</div>
		</motion.div>
	);
};

export default TransactionsList;
