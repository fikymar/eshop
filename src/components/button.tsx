import React from 'react';
import { motion } from 'framer-motion';

type IButton = {
	bgColor?: string;
	addClass?: string;
	value: any;
	icon?: any;
	onClick?: () => void;
};

const Button = ({ bgColor, addClass, value, onClick, icon }: IButton) => {
	return (
		<motion.button
			whileTap={{ scaleX: 0.9 }}
			whileHover={{ scaleX: 0.9 }}
			type="button"
			className={`${addClass}  ml-2 items-center justify-center gap-2 px-6 py-2.5 focus:ring-2 focus:ring-current focus:ring-offset-2 ${bgColor}-500 rounded-full text-xs font-medium uppercase leading-tight tracking-wide text-slate-200 shadow-md  hover:${bgColor}-500-700 hover:shadow-lg focus:${bgColor}-700 focus:shadow-lg focus:outline-none focus:ring-0 active:${bgColor}-800 flex transition duration-150 ease-in-out active:shadow-lg `}
			onClick={onClick}
		>
			{value}
			{icon && <span className="h-5 w-5">{icon}</span>}
		</motion.button>
	);
};

export default Button;
