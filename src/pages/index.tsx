import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
	const [title, setTitle] = useState('first option');

	useEffect(() => {
		// window.onblur = function () {
		// 	setTitle("Where are you?");
		// };

		// window.onfocus = function () {
		// 	setTitle("Focus");
		// };

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

			<div>Home</div>
		</div>
	);
};

export default Home;
