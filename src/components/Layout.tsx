import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productsActions } from '../context/products-slice';
import { useRouter } from 'next/dist/client/router';
import Footer from './Footer';
import Header from './Header';
import { routes } from '../constants/routes';
import CartContainer from './Cart';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm';

const Layout = ({ children }: any) => {
	const router = useRouter();
	const cartShow = useSelector((state: any) => state.cartData.cartShow);

	return (
		<motion.div
			initial={{ opacity: 0, x: -200, y: 0 }}
			animate={{ opacity: 1, x: 0, y: 0 }}
			exit={{ opacity: 0, x: 0, y: -100 }}
			transition={{
				type: 'spring',
				stiffness: 260,
				damping: 20,
			}}
			className="relative grid min-h-screen  auto-rows-auto bg-slate-100  text-zinc-800  dark:bg-zinc-500 dark:text-zinc-100"
		>
			<Header />
			{children}

			<AnimatePresence mode="wait"> {cartShow && <CartContainer />}</AnimatePresence>
			<ContactForm />
			{router.pathname !== routes.products && <Footer />}
		</motion.div>
	);
};

export default Layout;
