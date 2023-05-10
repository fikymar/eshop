import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { NextPage } from 'next';
import Head from 'next/head';
import { routes } from '../constants/routes';
import Button from '../components/button';
import { shimmer, toBase64 } from '../utils/placeholderImg';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../context/cart-slice';
import { alertActions } from '../context/alert-slice';
import { alertStatus } from '../constants/enums';

const Home: NextPage = () => {
	const [title, setTitle] = useState('Home');
	const dispatch = useDispatch();
	const msg = useSelector((state: any) => state.alertMsg.msg);

	useEffect(() => {
		document.addEventListener('visibilitychange', (event) => {
			if (document.visibilityState == 'visible') {
				setTitle('We glad you are back');
			} else {
				setTitle('Where are you?');
			}
		});

		// handle redirect back from Stripe Checkout
		const query = new URLSearchParams(window.location.search);
		if (query.get('success')) {
			console.log('Order placed! You will receive an email confirmation.');
			dispatch(cartActions.deleteAllItemsFromCart());
			dispatch(
				alertActions.setMsg({
					text: 'Order placed! You will receive an email confirmation.',
					status: alertStatus.SUCCESS,
				}),
			);
		}

		if (query.get('canceled')) {
			console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
			dispatch(
				alertActions.setMsg({
					text: 'Order canceled -- continue to shop around and checkout when you’re ready.',
					status: alertStatus.DANGER,
				}),
			);
		}
	}, []);

	const closeAlert = () => {
		dispatch(alertActions.deleteMsg());
		console.log('msg', msg);
	};

	return (
		<div>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="Training project" />
			</Head>

			<div className="h-fit  py-4 px-4 md:py-10 xl:mx-2 2xl:rounded-tr-full 2xl:rounded-bl-full 2xl:rounded-tl-lg 2xl:px-20">
				{msg.text && (
					<p
						className={`fixed top-14 left-0 z-50 flex  w-full items-center justify-around p-4 text-left   text-base text-white ${
							msg.status === 'danger' ? 'bg-red-500' : 'bg-green-600'
						}`}
					>
						{msg.text}
						<button
							className="undefined flex  h-8 w-8 items-center justify-center rounded-full border-2 p-2  text-lg font-bold focus:ring-2 focus:ring-current  focus:ring-offset-2 dark:border-slate-200 sm:h-10 sm:w-10"
							onClick={() => closeAlert()}
						>
							X
						</button>
					</p>
				)}
				<section className="container mx-auto mt-10 items-center pb-12 md:px-20 lg:flex xl:mt-20">
					<div className="flex-1 space-y-4 md:text-center lg:text-left 2xl:px-10">
						<h1 className="text-4xl font-bold text-yellow-500">Happy shopping</h1>
						<p className="ml-0 max-w-xl font-medium leading-relaxed">
							This page is for demo purposes, created while learning redux. I am using NEXT js, REDUX
							TOOLKIT for state management, FIRESTORE as backend, payment via STRIPE, TAILWIND CSS for
							fast styling and FRAMER-MOTION for animations. You can login(google) in top right corner.
							Then you will have access to your profile. You can also login via checkout button in cart.
							For testing intentions are all functionalities available WITHOUT need to LOGIN. You can add{' '}
							<Link className="underline transition hover:text-pink-500" href={routes.products}>
								products
							</Link>{' '}
							to the cart. And also add product to the firestore database{' '}
							<Link href={routes.addItem} className="underline hover:text-pink-500">
								here
							</Link>
							. If your eyes feel tired, there is a DARKMODE switch.
						</p>
						<div className="flex justify-start gap-2 md:justify-center lg:justify-start">
							<Link href={routes.addItem}>
								<Button value="Add product" bgColor="bg-yellow-500" color="text-zinc-800" />
							</Link>

							<Link href={routes.products}>
								<Button value="Go shopping" bgColor="bg-pink-500" />
							</Link>
						</div>
					</div>
					<div className="">
						<Image
							src="/imgs/purplelady.webp"
							width={500}
							height={300}
							className="mx-auto mt-6  h-auto w-auto  rounded-tl-full rounded-br-full"
							alt="hero"
							placeholder="blur"
							priority
							blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 300))}`}
						/>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Home;
