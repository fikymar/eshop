import React from 'react';
import Image from 'next/image';
import Button from './button';
import Link from 'next/link';
import { IData } from '../constants/models';
import { Cart } from '../constants/icons';
import { motion } from 'framer-motion';

const CartContainer = ({}: IData) => {
	return (
		<motion.div
			initial={{ x: 1000, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 1000, opacity: 0 }}
			className="fixed top-0 right-0 z-40 h-[100vh] w-full bg-slate-100 px-4 pt-[6rem]  shadow-md dark:bg-zinc-500 md:w-1/3 xl:w-3/12"
		>
			<div className="flex w-full items-center justify-between ">cart</div>
			<div className="h-full w-full ">
				{/* <Image src={} width={100} height={100} alt="" /> */}
				<p>5</p>
			</div>
		</motion.div>
	);
};

export default CartContainer;
