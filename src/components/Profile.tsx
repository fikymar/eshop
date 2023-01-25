import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { authActions } from '../context/auth-slice';
import { userActions } from '../context/user-slice';
import Button from './button';

const Profile = () => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
	const user = useSelector((state: any) => state.userData.user);

	const close = () => {
		if (isLoggedIn === true) {
			dispatch(userActions.closeProfile());
		}

		// console.log('profile log', isLoggedIn);
	};

	const logout = () => {
		if (isLoggedIn === true) {
			dispatch(authActions.logout());
			dispatch(userActions.closeProfile());
		}

		// console.log('profile log', isLoggedIn);
	};

	return (
		<motion.div
			className="fixed top-20 right-0 z-40 mr-0 ml-auto  -mt-20 flex h-fit flex-col rounded-bl-xl bg-slate-100 px-4 pt-24 pb-4 dark:bg-zinc-600"
			initial={{ y: -300, scale: 0.5 }}
			animate={{ y: 0, scale: 1 }}
			exit={{ y: -300, scale: 0.5 }}
		>
			<div className="flex">
				<h3 className="mr-2 font-bold">Name:</h3>
				<p>{user.displayName}</p>
			</div>
			<div className="flex ">
				<h3 className="mr-2 font-bold">Email:</h3>
				<p>{user.email}</p>
			</div>
			<div className="mt-10 flex gap-2 ">
				<Button bgColor="bg-yellow-500" addClass="" value="Close profile" onClick={close} />

				<Button value="Logout" bgColor="bg-pink-500" onClick={logout} />
			</div>
		</motion.div>
	);
};

export default Profile;
