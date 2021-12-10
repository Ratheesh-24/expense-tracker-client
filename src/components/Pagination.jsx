import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sideUp } from '../motion/animation';

const Pagination = ({ data, RenderComponent, pageLimit, dataLimit }) => {
	/* const pages = Math.ceil(data.length / dataLimit); */
	const [ currentPage, setCurrentPage ] = useState(1);

	/* 	function goToNextPage() {
		setCurrentPage((page) => page + 1);
	} */

	function goToPreviousPage() {
		setCurrentPage((page) => page - 1);
	}

	function changePage(event) {
		const pageNumber = Number(event.target.textContent);
		setCurrentPage(pageNumber);
	}

	const getPaginatedData = () => {
		const startIndex = currentPage * dataLimit - dataLimit;
		const endIndex = startIndex + dataLimit;
		return data.slice(startIndex, endIndex);
	};

	const getPaginationGroup = () => {
		let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

		return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
	};
	return (
		<motion.div variants={sideUp} initial='initial' animate='animate'>
			<motion.h4 className='text-center pt-3 fw-500' variants={sideUp} initial='initial' animate='animate'>
				Recent Transactions
			</motion.h4>
			{/* show the posts, 10 posts at a time */}
			<div className='dataContainer transactions'>
				{getPaginatedData().map((d, idx) => <RenderComponent key={idx} data={d} />)}
			</div>

			{/* show the pagination it consists of next and previous buttons along with page numbers, in our case, 5 page numbers at a time */}

			<div className='pagination py-3 '>
				{/* previous button */}
				<button onClick={goToPreviousPage} className={`prev ${currentPage === 1 ? 'disabled' : ''}`}>
					prev
				</button>

				{/* show page numbers */}
				{getPaginationGroup().map((item, index) => (
					<button
						key={index}
						onClick={changePage}
						className={`paginationItem scale-hover ${currentPage === item ? 'active' : null}`}
					>
						<span>{item}</span>
					</button>
				))}

				{/* next button 
				<button onClick={goToNextPage} className={`next ${currentPage === pages ? 'disabled' : ''}`}>
					next
				</button>*/}
			</div>
		</motion.div>
	);
};

export default Pagination;
