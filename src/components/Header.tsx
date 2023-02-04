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
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon, Cart } from '../constants/icons.js';
import { cartActions } from '../context/cart-slice';
import IconButton from './IconButton';

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
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

	const login = async () => {
		if (!isLoggedIn && !open) {
			const { user } = await signInWithPopup(firebaseAuth, provider);
			// console.log(user);
			dispatch(userActions.setUser(user));
			dispatch(authActions.login());
		}
		if (isLoggedIn && !open) {
			dispatch(userActions.openProfile());
			if (showCart) {
				dispatch(cartActions.closeCart());
			}
		} else return;
	};

	const showCartModal = () => {
		if (!showCart) {
			if (open) {
				dispatch(userActions.closeProfile());
			}
			dispatch(cartActions.openCart());
		} else dispatch(cartActions.closeCart());
	};

	const showMenu = () => {
		if (!menuOpen) {
			setMenuOpen(true);
		} else setMenuOpen(false);
	};

	const MenuItems = [
		{ title: 'Home', link: routes.home },
		{ title: 'Add New Item', link: routes.addItem },
		{ title: 'Products', link: routes.products },
	];

	return (
		<>
			<motion.header className="backdrop--sm sticky top-0 z-50 flex h-fit w-full items-center justify-between p-2 md:px-4">
				{/* mobile nav */}
				<div className="z-50 md:hidden">
					<button className="group relative" onClick={showMenu}>
						<div className="relative flex h-[50px] w-[50px] transform items-center justify-center overflow-hidden rounded-full bg-pink-500 shadow-md ring-0 ring-gray-300 ring-opacity-30 transition-all duration-200 hover:ring-8 group-focus:ring-4">
							<div className="flex h-[20px] w-[20px] origin-center transform flex-col justify-between overflow-hidden transition-all duration-300">
								<div
									className={`h-[2px] w-7 origin-left transform bg-white transition-all duration-300 ${
										menuOpen && 'translate-x-10'
									}`}
								></div>
								<div
									className={`h-[2px] w-7 transform rounded bg-white transition-all delay-75 duration-300 ${
										menuOpen && 'translate-x-10'
									}`}
								></div>
								<div
									className={`h-[2px] w-7 origin-left transform bg-white transition-all delay-150 duration-300 ${
										menuOpen && 'translate-x-10'
									}`}
								></div>
								<div
									className={`absolute top-2.5 flex w-0  transform items-center justify-between transition-all duration-500 ${
										menuOpen ? 'w-12 translate-x-0' : '-translate-x-10'
									}`}
								>
									<div
										className={`absolute h-[2px] w-5  transform bg-white transition-all delay-300 duration-500 ${
											menuOpen ? 'rotate-45' : 'rotate-0'
										}`}
									></div>
									<div
										className={`${menuOpen ? '-rotate-45' : '-rotate-0'} absolute h-[2px] w-5
											 transform bg-white transition-all 
											delay-300
										duration-500`}
									></div>
								</div>
							</div>
						</div>
					</button>
				</div>

				<AnimatePresence>
					{menuOpen && (
						<motion.div
							className="fixed top-0 left-0 z-10 h-screen w-screen bg-yellow-500"
							initial={{ x: -1000 }}
							animate={{ x: 0 }}
							exit={{ x: -1000 }}
							transition={{
								type: 'spring',
								stiffness: 300,
								damping: 20,
							}}
						>
							<nav className="w-full text-lg font-semibold">
								<ul className="items-left mt-20 flex w-fit flex-col">
									{MenuItems.map((item) => {
										return (
											<li
												key={item.title}
												className="active group flex cursor-pointer  flex-col  border-opacity-0 p-4  duration-200  dark:text-white "
											>
												<Link href={item.link}>{item.title}</Link>
												<p
													className={`underline-h ${
														router.pathname === item.link ? 'w-[1ch]' : 'w-0'
													} group-hover:w-full`}
												></p>
											</li>
										);
									})}
								</ul>
							</nav>
						</motion.div>
					)}
				</AnimatePresence>

				{/* logo */}

				<Link
					className="font-sigmarone group flex items-start justify-center text-xl  md:text-2xl"
					href={routes.home}
				>
					Shopi
					<span className="text-yellow-500  group-hover:text-sky-500">ik</span>
					<span className="ml-0.5 flex h-5 w-5  rounded-full border border-zinc-500 stroke-2 p-1 text-yellow-500 group-hover:text-sky-500 dark:border-slate-300">
						{Cart}
					</span>
				</Link>

				{/* dektop nav */}
				<nav className="nav  hidden text-lg font-semibold md:flex ">
					<ul className="flex items-center">
						{MenuItems.map((item) => {
							return (
								<li
									key={item.title}
									className="active group flex cursor-pointer  flex-col  border-opacity-0 p-4  duration-200  dark:text-white "
								>
									<Link href={item.link}>{item.title}</Link>
									<p
										className={`underline-h ${
											router.pathname === item.link ? 'w-[1ch]' : 'w-0'
										} group-hover:w-full`}
									></p>
								</li>
							);
						})}
					</ul>
				</nav>

				<div
					className={`flex flex-wrap items-center justify-center gap-2 md:justify-end  ${
						showCart && cartItems.length === 0 ? 'text-zinc-500' : 'text-zinc-500 dark:text-slate-200'
					}`}
				>
					<AnimatePresence>
						{showCart && (
							<IconButton
								initial={{ x: 1000 }}
								animate={{ x: 0 }}
								exit={{ x: 1000 }}
								transition={{
									type: 'spring',
									stiffness: 300,
									damping: 20,
								}}
								onClick={showCartModal}
							>
								X
							</IconButton>
						)}
					</AnimatePresence>
					<IconButton
						id="theme-toggle"
						addClass="border-none focus:ring-current focus:ring-2 items-stretch p-2"
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
					>
						{theme === 'light' ? Sun : Moon}
					</IconButton>

					{/* TODO search function */}
					{/* <Link href="">
						<div className="relative h-6 md:h-8">{Search}</div>
					</Link> */}

					<IconButton addClass=" relative items-stretch p-2 border-none" onClick={showCartModal}>
						{cartItems.length > 0 ? (
							<div className="absolute -top-2 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 md:h-5 md:w-5">
								<p className="text-[10px] font-bold text-white md:text-xs"> {cartItems.length}</p>
							</div>
						) : null}
						{Cart}
					</IconButton>

					{isLoggedIn ? (
						<motion.img
							whileTap={{ scale: 0.6 }}
							src={user && user.photoURL ? `${user.photoURL}` : '/imgs/avatar.webp'}
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
