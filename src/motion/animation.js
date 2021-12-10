let easing = [ 0.6, -0.5, 0.01, 0.99 ];

export const sideRight = {
	initial: {
		x: -100,
		opacity: 0
	},
	animate: {
		x: 0,
		opacity: 1,
		transition: {
			delay: 0.2,
			duration: 0.2,

			type: 'spring'
		}
	},
	exit: {
		opacity: 0
	}
};

export const stagger = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1
		}
	}
};

export const fadeInUp = {
	initial: {
		x: 800,
		opacity: 0,
		transition: { duration: 0.6, ease: easing }
	},
	animate: {
		x: 0,
		opacity: 1,
		transition: {
			delay: 0.2,

			duration: 0.8,
			type: 'spring'
		}
	}
};
export const fadeInDown = {
	initial: {
		y: '60vw',
		opacity: 0,
		transition: { duration: 0.6, ease: easing }
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			delay: 0.2,
			duration: 0.6,
			ease: easing,
			type: 'spring'
		}
	}
};
export const sideUp = {
	initial: { y: 60, opacity: 0 },
	animate: {
		y: 0,
		opacity: 1,
		transition: { delay: 0.1, duration: 0.3, ease: easing, type: 'spring' }
	}
};

export const sideLeft = {
	initial: { x: 60, opacity: 0 },
	animate: {
		x: 0,
		opacity: 1,
		transition: { duration: 0.3, ease: easing, type: 'spring' }
	}
};
