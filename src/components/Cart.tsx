import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../firebase.config';
import { userActions } from '../context/user-slice';
import { authActions } from '../context/auth-slice';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { motion } from 'framer-motion';
import { cartActions } from '../context/cart-slice';
import Button from './button';
import { CartItem } from '../constants/models';
import ItemCart from './ItemCart';

const CartContainer = () => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state: any) => state.cartData.items);
	const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
	const firebaseAuth = getAuth(app);
	const provider = new GoogleAuthProvider();
	const [total, setTotal] = useState();

	const clearCart = () => {
		dispatch(cartActions.clearCartItems);
		console.log('delete itemr', cartItems);
	};

	useEffect(() => {
		let totalPrice = cartItems.reduce(function (acc: number, item: CartItem) {
			return acc + item.qty * parseInt(item.price);
		}, 0);
		setTotal(totalPrice);

		console.log(total);
	}, [total, cartItems]);

	const login = async () => {
		if (!isLoggedIn) {
			const { user } = await signInWithPopup(firebaseAuth, provider);
			console.log(user);
			dispatch(userActions.setUser(user));
			dispatch(authActions.login());
		} else return;
	};

	return (
		<motion.div
			initial={{ x: 1000 }}
			animate={{ x: 0 }}
			exit={{ x: 1000 }}
			transition={{
				type: 'spring',
				stiffness: 260,
				damping: 20,
			}}
			className="fixed top-0 right-0 z-40 h-screen min-h-screen w-full bg-sky-100 px-2  pt-[6rem]  shadow-md dark:bg-yellow-500 md:w-1/2 xl:w-4/12 2xl:w-3/12"
		>
			{cartItems.length > 0 ? (
				<>
					<button onClick={() => clearCart()}>clear cart</button>
					<div className="scrollbar-hide h-[60vh] overflow-y-scroll py-5 shadow-inner">
						<div className="grid h-full w-full gap-2 p-4 ">
							{cartItems.map((item: any) => {
								return <ItemCart item={item} key={item.id} />;
							})}
						</div>
					</div>
				</>
			) : (
				<>
					<h2 className="absolute top-[8rem] left-5 z-50 text-xl text-zinc-500">
						Let´s add something in here!
					</h2>
					<Image
						src="/imgs/emptycart.jpg"
						fill
						className="z-0 object-cover object-[center_top]"
						alt="empty cart"
					/>
				</>
			)}
			<div className="my-4 flex items-center justify-between text-xl font-bold ">
				<h4 className="">Total</h4>
				<p className="">$ {total}</p>
			</div>
			<div className="flex w-full justify-center">
				<Button
					value={!isLoggedIn ? 'Login to checkout' : 'Checkout'}
					bgColor={!isLoggedIn ? 'bg-zinc-400' : 'bg-pink-500'}
					onClick={login}
					addClass="my-4"
				/>
			</div>
		</motion.div>
	);
};

export default CartContainer;
