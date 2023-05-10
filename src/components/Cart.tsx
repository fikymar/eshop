import React, { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../firebase.config';
import { userActions } from '../context/user-slice';
import { authActions } from '../context/auth-slice';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { motion } from 'framer-motion';
import Button from './button';
import { CartItem } from '../constants/models';
import ItemCart from './ItemCart';

const CartContainer = () => {
	const [total, setTotal] = useState();
	const [disableBtn, setDisableBtn] = useState(false);
	const dispatch = useDispatch();
	const cartItems = useSelector((state: any) => state.cartData.items);
	const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
	const firebaseAuth = getAuth(app);
	const provider = new GoogleAuthProvider();

	const handleCheckout = async () => {
		setDisableBtn(true);
		const response = await fetch('/api/stripe', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(cartItems),
		});

		// if (response.statusCode === 500) return;

		const data = await response.json();
		window.location.href = data.url;
		setDisableBtn(false);
	};

	useEffect(() => {
		let totalPrice = cartItems.reduce(function (acc: number, item: CartItem) {
			return acc + item.qty * parseInt(item.price);
		}, 0);
		setTotal(totalPrice);
	}, [total, cartItems]);

	const login = async () => {
		if (!isLoggedIn) {
			setDisableBtn(true);
			const { user } = await signInWithPopup(firebaseAuth, provider);
			dispatch(userActions.setUser(user));
			dispatch(authActions.login());
			setDisableBtn(false);
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
			className="fixed top-0 right-0 z-40 h-auto min-h-screen w-full bg-sky-100 px-2 pt-[6rem] shadow-md  dark:bg-yellow-500   md:h-screen md:w-1/2 xl:w-4/12 2xl:w-3/12"
		>
			{cartItems.length > 0 ? (
				<>
					<div className="scrollbar-hide h-[60vh] overflow-y-scroll py-5 shadow-inner">
						<div className="grid h-full w-full gap-2 p-4 ">
							{cartItems.map((item: any) => {
								return <ItemCart item={item} key={item.id} />;
							})}
						</div>
					</div>
				</>
			) : (
				<div className="h-full w-full">
					<h2 className="absolute top-[8rem] left-5 z-50 text-xl text-zinc-500">
						Let´s add something in here!
					</h2>
					<Image
						src="/imgs/emptycart.webp"
						fill
						className="z-0 object-cover object-[center_top]"
						alt="empty cart"
						priority
					/>
				</div>
			)}
			<div className="my-4 flex items-center justify-between text-xl font-bold ">
				<h4 className="">Total</h4>
				<p className="">$ {total}</p>
			</div>
			<div className="flex w-full justify-center">
				<Button
					value={!isLoggedIn ? 'Login to checkout' : 'Checkout'}
					bgColor={!isLoggedIn ? 'bg-sky-500' : 'bg-pink-500'}
					onClick={!isLoggedIn ? login : handleCheckout}
					addClass={`my-4 ${disableBtn ? 'cursor-not-allowed' : 'cursor-pointer'} `}
					disabled={disableBtn ? true : false}
				/>
			</div>
			{!isLoggedIn && (
				<div className="flex w-full justify-center">
					<Button
						value="Checkout Without Login"
						bgColor="bg-pink-500"
						onClick={handleCheckout}
						addClass={`my-4 ${disableBtn ? 'cursor-not-allowed' : 'cursor-pointer'} `}
						disabled={disableBtn ? true : false}
					/>
				</div>
			)}
		</motion.div>
	);
};

export default CartContainer;
