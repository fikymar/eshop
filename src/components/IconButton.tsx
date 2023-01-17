import React from 'react';
import { motion } from 'framer-motion';

type IIconButton = {
	addClass?: string;
	children: any;
	onClick?: () => void;
	id?: string;
	initial?: {};
	animate?: {};
	exit?: {};
};

const IconButton = ({ initial, animate, exit, onClick, children, addClass, id }: IIconButton) => {
	return (
		<motion.button
			id={id}
			type="button"
			initial={initial}
			animate={animate}
			exit={exit}
			onClick={onClick}
			whileTap={{ scale: 0.6 }}
			whileHover={{ scale: 0.9 }}
			className={`${addClass} flex h-10 w-10 items-center justify-center rounded-full border-2 border-zinc-500 p-2.5 text-lg font-bold  focus:ring-2 focus:ring-current focus:ring-offset-2 dark:border-slate-200`}
		>
			{children}
		</motion.button>
	);
};

export default IconButton;
