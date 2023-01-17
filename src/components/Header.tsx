import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';
import { authActions } from '../context/auth-slice';
import { userActions } from '../context/user-slice';
import Profile from './Profile';
import { useTheme } from 'next-themes';
import { routes } from '../constants/routes';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Logo, Sun, Moon, Search, Cart } from '../constants/icons.js';
import { cartActions } from '../context/cart-slice';
import IconButton from './IconButton';

const Header = () => {
	const [isEnabled, setIsEnabled] = useState(false);
	const { scrollY } = useScroll();
	const firebaseAuth = getAuth(app);
	const provider = new GoogleAuthProvider();
	const dispatch = useDispatch();
	const { theme, setTheme } = useTheme();
	const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
	const user = useSelector((state: any) => state.userData.user);
	const cartItems = useSelector((state: any) => state.cartData.items);
	const open = useSelector((state: any) => state.userData.open);
	const showCart = useSelector((state: any) => state.cartData.cartShow);
	const router = useRouter();

	useEffect(() => {
		console.log('length', cartItems.length);
	}, [cartItems]);

	// useEffect(function () {
	// 	console.log(window.localStorage);
	// }, []);

	const login = async () => {
		if (!isLoggedIn && !open) {
			const { user } = await signInWithPopup(firebaseAuth, provider);
			console.log(user);
			dispatch(userActions.setUser(user));
			dispatch(authActions.login());
		}
		if (isLoggedIn && !open) {
			dispatch(userActions.openProfile());
			if (showCart) {
				dispatch(cartActions.closeCart());
			}
		} else return;
		console.log('header log', isLoggedIn);
		console.log('user log open', open);
	};

	const showCartModal = () => {
		if (!showCart) {
			if (open) {
				dispatch(userActions.closeProfile());
			}
			dispatch(cartActions.openCart());
		} else dispatch(cartActions.closeCart());
	};

	const MenuItems = [
		{ title: 'Add New Item', link: routes.addItem },
		{ title: 'Products', link: routes.products },
		{ title: 'Third', link: '/' },
	];

	return (
		<>
			<motion.header
				className={`sticky top-0 z-50 flex items-center justify-between px-8 pb-2 pt-3 backdrop-blur-sm `}
			>
				{/* mobile nav */}
				<div className="md:hidden">
					<button className="group relative">
						<div className="relative flex h-[50px] w-[50px] transform items-center justify-center overflow-hidden rounded-full bg-pink-500 shadow-md ring-0 ring-gray-300 ring-opacity-30 transition-all duration-200 hover:ring-8 group-focus:ring-4">
							<div className="flex h-[20px] w-[20px] origin-center transform flex-col justify-between overflow-hidden transition-all duration-300">
								<div className="h-[2px] w-7 origin-left transform bg-white transition-all duration-300 group-focus:translate-x-10"></div>
								<div className="h-[2px] w-7 transform rounded bg-white transition-all delay-75 duration-300 group-focus:translate-x-10"></div>
								<div className="h-[2px] w-7 origin-left transform bg-white transition-all delay-150 duration-300 group-focus:translate-x-10"></div>

								<div className="absolute top-2.5 flex w-0 -translate-x-10 transform items-center justify-between transition-all duration-500 group-focus:w-12 group-focus:translate-x-0">
									<div className="absolute h-[2px] w-5 rotate-0 transform bg-white transition-all delay-300 duration-500 group-focus:rotate-45"></div>
									<div className="absolute h-[2px] w-5 -rotate-0 transform bg-white transition-all delay-300 duration-500 group-focus:-rotate-45"></div>
								</div>
							</div>
						</div>
					</button>
				</div>

				{/* logo */}
				<div className="">
					<Link href={routes.home}>{Logo}</Link>
				</div>

				<nav className="nav font-effect-3d hidden text-lg font-semibold md:flex ">
					<ul className="flex items-center">
						{MenuItems.map((item) => {
							return (
								<li
									key={item.title}
									className="active cursor-pointerflex group  flex-col border-pink-500 border-opacity-0 p-4  duration-200  dark:text-white "
								>
									<Link href={item.link}>{item.title}</Link>
									<p
										className={`underline-h ${
											router.pathname === item.link ? 'w-[2ch]' : 'w-0'
										} group-hover:w-full`}
									></p>
								</li>
							);
						})}
					</ul>
				</nav>

				<div
					className={`md:justify-endgap-2 flex flex-wrap items-center justify-center  ${
						(showCart || open) && theme === 'light' ? 'text-zinc-500' : 'text-zinc-500 dark:text-slate-200'
					}`}
				>
					{showCart && (
						<IconButton
							initial={{ x: 300, scale: 0.5 }}
							animate={{ x: 0, scale: 1 }}
							exit={{ x: 300, scale: 0.5 }}
							onClick={showCartModal}
						>
							X
						</IconButton>
					)}
					<IconButton
						id="theme-toggle"
						addClass="border-none focus:ring-current focus:ring-2"
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
					>
						{theme === 'light' ? Sun : Moon}
					</IconButton>
					{/* <Link href="">
						<div className="relative h-6 md:h-8">{Search}</div>
					</Link> */}

					<IconButton addClass={`relative  border-none `} onClick={showCartModal}>
						{cartItems.length > 0 && (
							<div className=" absolute -top-2 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 md:h-5 md:w-5">
								<p className="text-[10px] font-bold text-white md:text-xs"> {cartItems.length}</p>
							</div>
						)}
						{Cart}
					</IconButton>

					{isLoggedIn ? (
						<motion.img
							whileTap={{ scale: 0.6 }}
							src={user && user.photoURL ? `${user.photoURL}` : '/imgs/avatar.png'}
							className="ml-2 h-7 w-7 cursor-pointer rounded-full drop-shadow md:h-9 md:w-9"
							alt="userprofile"
							onClick={login}
						/>
					) : (
						<motion.button whileTap={{ scale: 0.6 }} className="ml-2 whitespace-nowrap" onClick={login}>
							Login !
						</motion.button>
					)}
				</div>
			</motion.header>
			<AnimatePresence mode="wait">{open && <Profile />}</AnimatePresence>
		</>
	);
};

export default Header;
