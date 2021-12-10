import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TableRow from '@material-ui/core/TableRow';
import { GlobalContext } from '../context/GlobalState';

import { Container } from '@material-ui/core';
import moment from 'moment';
import './TableData.css';

const columns = [ 'ID', 'SOURCE', 'PURPOSE', 'AMOUNT (₹)', 'DESCRIPTION', 'CREATED AT', '' ];

const useStyles = makeStyles({
	root: {
		width: '100%'
	},
	container: {
		maxHeight: 440,
		overflowX: 'auto',
		marginRight: 'auto',
		marginLeft: 'auto'
	}
});

export default function TabledData() {
	const { transactions, getTransactions, deleteTransaction } = useContext(GlobalContext);

	const classes = useStyles();
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(10);

	const handleChangePage = (newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	useEffect(() => {
		getTransactions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Container className='mt-5'>
			<Paper className={classes.root}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label='sticky table'>
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column._id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{transactions
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((transaction) => {
									return (
										<TableRow
											hover
											role='checkbox'
											tabIndex={-1}
											key={transaction._id}
											className='scale-hover'
										>
											<TableCell>{transaction._id}</TableCell>
											<TableCell>
												{transaction.category} &nbsp;
												{transaction.category[0] === 'I' ? (
													<i
														className='fa fa-arrow-circle-up text-success'
														aria-hidden='true'
													/>
												) : (
													<i
														className='fa fa-arrow-circle-down text-danger'
														aria-hidden='true'
													/>
												)}
											</TableCell>
											<TableCell>
												{transaction.subCategory} &nbsp;
												{transaction.subCategory[0] === 'O' ? (
													<i className='fas fa-briefcase text-primary' />
												) : (
													<i className='fas fa-coffee text-warning' />
												)}
											</TableCell>
											<TableCell>{transaction.amount}</TableCell>
											<TableCell>{transaction.text}</TableCell>
											<TableCell>
												{moment(transaction.createdAt).format('mm-dd-yyyy hh:mmA')}
											</TableCell>
											<TableCell>
												{' '}
												<IconButton
													aria-label='delete'
													onClick={() => deleteTransaction(transaction._id)}
													className='text-danger'
												>
													<DeleteIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[ 10, 25, 100 ]}
					component='div'
					count={transactions.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</Container>
	);
}
