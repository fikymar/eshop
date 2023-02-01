import React from 'react';
import { motion } from 'framer-motion';

type IButton = {
	bgColor?: string;
	color?: string;
	addClass?: string;
	value: any;
	icon?: any;
	onClick?: () => void;
	disabled?: boolean;
};

const Button = ({ bgColor, color, addClass, value, onClick, icon, disabled }: IButton) => {
	return (
		<motion.button
			whileTap={{ scaleX: 0.9 }}
			whileHover={{ scaleX: 0.9 }}
			type="button"
			className={`${addClass}  ${
				color ? color : 'text-slate-200'
			} items-center justify-center gap-2 px-6 py-2.5 focus:ring-2 focus:ring-current focus:ring-offset-2 ${bgColor} rounded-full text-xs font-medium uppercase leading-tight tracking-wide shadow-md  hover:${bgColor}-500-700 hover:shadow-lg focus:${bgColor}-700 focus:shadow-lg focus:outline-none focus:ring-0 active:${bgColor}-800 flex transition duration-150 ease-in-out active:shadow-lg `}
			onClick={onClick}
			disabled={disabled}
		>
			{value}
			{icon && <span className="h-5 w-5">{icon}</span>}
		</motion.button>
	);
};

export default Button;
