import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productsActions } from '../context/products-slice';
import { useRouter } from 'next/dist/client/router';
import Footer from './Footer';
import Header from './Header';
import { routes } from '../constants/routes';
import CartContainer from './Cart';
import { AnimatePresence } from 'framer-motion';
import { cartActions } from '../context/cart-slice';

const Layout = ({ children }: any) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const products = useSelector((state: any) => state.productsData);
	const cartShow = useSelector((state: any) => state.cartData.cartShow);
	const cartItems = useSelector((state: any) => state.cartData);

	useEffect(() => {
		console.log('cartItems', cartItems);
	}, [cartShow, cartItems]);

	return (
		<div className="relative grid min-h-screen  auto-rows-auto bg-slate-100  text-zinc-800  dark:bg-zinc-500 dark:text-zinc-100">
			<Header />
			{children}

			<AnimatePresence mode="wait"> {cartShow && <CartContainer />}</AnimatePresence>
			{router.pathname !== routes.products && <Footer />}
		</div>
	);
};

export default Layout;
