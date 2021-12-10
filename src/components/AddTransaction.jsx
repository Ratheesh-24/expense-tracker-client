import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Button, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { fadeInDown, stagger } from '../motion/animation';

export const AddTransaction = () => {
	const [ transaction, setTransaction ] = useState({
		text: '',
		amount: '',
		category: 'Income',
		subCategory: 'Official'
	});

	const { text, amount, category, subCategory } = transaction;

	const { addTransaction } = useContext(GlobalContext);

	const onChange = (e) =>
		setTransaction({
			...transaction,
			[e.target.name]: e.target.value
		});

	const onSubmit = (e) => {
		e.preventDefault();

		if (Object.values(transaction).includes('')) {
			return alert('You have missed something!');
		}

		const newTransaction = {
			text,
			amount: +amount,
			category,
			subCategory
		};

		addTransaction(newTransaction);
	};

	const reset = (e) => {
		setTransaction({
			text: '',
			amount: '',
			category: '',
			subCategory: 'Official'
		});
	};

	return (
		<motion.div>
			<button
				type='button'
				class='btn btn-success text-center'
				data-toggle='modal'
				data-target='#exampleModalScrollable'
			>
				<i class='fa fa-plus-circle' aria-hidden='true' /> ADD TRANSACTION
			</button>

			<motion.div
				className='modal fade'
				id='exampleModalScrollable'
				tabindex='-1'
				role='dialog'
				aria-labelledby='exampleModalScrollableTitle'
				aria-hidden='true'
			>
				<div className='modal-dialog modal-dialog-scrollable' role='document'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalScrollableTitle'>
								Save your Money!
							</h5>
							<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>
						<div className='modal-body'>
							<Form className='form' onSubmit={(e) => onSubmit(e)}>
								<Form.Group onChange={(e) => onChange(e)}>
									<Form.Check
										type='radio'
										value='Income'
										name='category'
										id='category1'
										label='Income'
										checked={transaction.category === 'Income'}
									/>
									<Form.Check
										type='radio'
										value='Expense'
										name='category'
										id='category2'
										label='Expense'
										checked={transaction.category === 'Expense'}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Amount</Form.Label>
									<Form.Control
										type='number'
										placeholder='Eg., 5000'
										name='amount'
										value={amount}
										required
										onChange={(e) => onChange(e)}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>what is this amount for?</Form.Label>
									<Form.Control
										type='text'
										placeholder='Its my salary day!'
										name='text'
										value={text}
										required
										onChange={(e) => onChange(e)}
									/>
								</Form.Group>

								<Form.Group>
									<Form.Label>subCategory</Form.Label>
									<Form.Control name='subCategory' as='select' onChange={(e) => onChange(e)} required>
										<option value='' disabled>
											...Select...
										</option>
										<option value='Official' selected={transaction.subCategory === 'Official'}>
											Official
										</option>
										<option value='Personal' selected={transaction.subCategory === 'Personal'}>
											Personal
										</option>
									</Form.Control>
								</Form.Group>

								<Button className='mr-2' variant='info' size='md' type='submit'>
									Add
								</Button>
								<Button variant='danger' size='md' type='button' onClick={(e) => reset(e)}>
									Reset
								</Button>
							</Form>
						</div>
						<div className='modal-footer'>
							<button type='button' className='btn btn-secondary' data-dismiss='modal'>
								Close
							</button>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};
