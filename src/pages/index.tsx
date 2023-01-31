import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { NextPage } from 'next';
import Head from 'next/head';
import { routes } from '../constants/routes';
import Button from '../components/button';
import { shimmer, toBase64 } from '../utils/placeholderImg';

const Home: NextPage = () => {
	const [title, setTitle] = useState('Home');

	useEffect(() => {
		document.addEventListener('visibilitychange', (event) => {
			if (document.visibilityState == 'visible') {
				setTitle('We glad you are back');
			} else {
				setTitle('Where are you?');
			}
		});
	}, []);

	return (
		<div>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="h-fit bg-zinc-600 py-4 px-4 md:py-10 xl:mx-2 2xl:rounded-tr-full 2xl:rounded-bl-full 2xl:rounded-tl-lg 2xl:px-20">
				<section className="container mx-auto mt-10 items-center pb-12 md:px-20 lg:flex xl:mt-20">
					<div className="flex-1 space-y-4 md:text-center lg:text-left 2xl:px-10">
						<h1 className="text-4xl font-bold text-yellow-500">Happy shopping</h1>
						<p className="ml-0 max-w-xl leading-relaxed text-gray-300 ">
							This page is for demo purposes, created while learning redux. I am using next js, redux
							toolkit for state management, firestore as backend, tailwind for fast styling and
							framer-motion for animations. You can login(google) in top right corner. Then you will have
							access to your profile. You can also login via checkout button in cart. You can add{' '}
							<Link className="underline transition hover:text-pink-500" href={routes.products}>
								products
							</Link>{' '}
							to the cart. And also add product to the firestore database{' '}
							<Link href={routes.addItem} className="underline hover:text-pink-500">
								here
							</Link>
							. And if your eyes feel tired, you can switch to darkmode.
						</p>
						<div className="flex justify-start gap-2 md:justify-center lg:justify-start">
							<Link href={routes.addItem}>
								<Button value="Add product" bgColor="bg-yellow-500" />
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
