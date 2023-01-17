import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { authActions } from '../context/auth-slice';
import { userActions } from '../context/user-slice';

const Profile = () => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
	const user = useSelector((state: any) => state.userData.user);

	const close = () => {
		if (isLoggedIn === true) {
			dispatch(userActions.closeProfile());
		}

		console.log('profile log', isLoggedIn);
	};

	const logout = () => {
		if (isLoggedIn === true) {
			dispatch(authActions.logout());
			dispatch(userActions.closeProfile());
		}

		console.log('profile log', isLoggedIn);
	};
	return (
		<motion.div
			className="w-content fixed top-20 right-0 z-40 mr-0 ml-auto  -mt-20 flex h-fit flex-col rounded-bl-xl bg-slate-100 px-4 pt-24 pb-4"
			initial={{ y: -300, scale: 0.5 }}
			animate={{ y: 0, scale: 1 }}
			exit={{ y: -300, scale: 0.5 }}
		>
			<div className="flex ">
				<h3 className="mr-2 font-bold">Name:</h3>
				<p>{user.displayName}</p>
			</div>
			<div className="flex ">
				<h3 className="mr-2 font-bold">Email:</h3>
				<p>{user.email}</p>
			</div>
			<div className="mt-10 flex">
				<motion.button
					whileTap={{ scaleX: 0.6 }}
					type="button"
					className="rounded-full bg-sky-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg"
					onClick={close}
				>
					Close profile
				</motion.button>
				<motion.button
					whileTap={{ scaleX: 0.6 }}
					type="button"
					className="ml-2 rounded-full bg-pink-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-pink-700 hover:shadow-lg focus:bg-pink-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-800 active:shadow-lg "
					onClick={logout}
				>
					Logout
				</motion.button>
			</div>
		</motion.div>
	);
};

export default Profile;
