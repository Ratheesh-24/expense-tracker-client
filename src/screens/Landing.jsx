import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sideLeft, stagger } from '../motion/animation';

const Landing = () => {
	return (
		<motion.section
			className='landing d-flex flex-wrap flex-column justify-column-center'
			exit={{ opacity: 0 }}
			initial='initial'
			animate='animate'
		>
			<div className='dark-overlay '>
				<motion.div className='landing-div' variants={stagger} initial='initial' animate='animate'>
					<motion.h1
						className='fw-bolder  py-2 text-lg text-dark  smallScreen'
						variants={sideLeft}
						initial='initial'
						animate='animate'
					>
						Track and Manage your <span className='blush'>Expense's </span> 
					</motion.h1>
					<motion.p
						className='fw-normal px-2 smallScreen-p'
						variants={sideLeft}
						initial='initial'
						animate='animate'
					>

					</motion.p>
					<motion.div className='landing-btns my-1' variants={sideLeft} initial='initial' animate='animate'>
						<Link to='/register' className='btn btn-dark mx-2 scale-hover'>
							SIGN UP
						</Link>
						<Link to='/login' className='btn btn-main mx-2 scale-hover'>
							LOGIN
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</motion.section>
	);
};

export default Landing;
