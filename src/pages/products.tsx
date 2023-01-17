import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { NextPage } from 'next';
import Head from 'next/head';
import Tilt from 'react-parallax-tilt';
import { getItems } from '../utils/firebaseFunctions';
import { productsActions } from '../context/products-slice';
import { useStateValue } from '../context/StateProvider';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';
import { routes } from '../constants/routes';
import { Female, Kid, Male } from '../constants/icons';
import Button from '../components/button';
import Footer from '../components/Footer';

const Products: NextPage = () => {
	const [title, setTitle] = useState('Products');
	const [filter, setFilter] = useState('');
	const dispatch = useDispatch();
	const products = useSelector((state: any) => state.productsData);
	// const [{ products }, dispatch] = useStateValue();

	const fetchProducts = async () => {
		await getItems().then((items) => {
			dispatch(productsActions.setProducts(items));
			console.log(products);
		});
	};
	// console.log(products);
	console.log('products', products);

	useEffect(() => {
		// window.onblur = function () {
		// 	setTitle("Where are you?");
		// };

		// window.onfocus = function () {
		// 	setTitle("Focus");
		// };

		fetchProducts();

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
			<div className="mx-10 grid place-items-center">
				<div className="relative z-10 h-full w-full items-center justify-center overflow-auto">
					<div className="relative z-20 grid h-full w-full grid-cols-1 gap-4  p-4 md:grid-cols-2 md:grid-rows-4 lg:grid-cols-3 xl:grid-cols-4 ">
						{/* {products.products.filter((product) => product.category === 'men').map((product: any) => {
							return (
								<ProductCard
									key={product.id}
									title={product.title}
									category={product.category}
									description={product.description}
									imgURL={product.imgURL}
									price={product.price}
								/>
							)
						)}} */}
						<Tilt
							className="relative flex h-40 w-40 flex-col items-center justify-between self-center justify-self-center rounded-xl bg-pink-500 text-white dark:bg-zinc-600 md:h-80 md:w-80 "
							tiltReverse={true}
							glareColor="white"
							perspective={500}
							glareEnable={true}
							glareMaxOpacity={0.45}
							scale={1.02}
							glarePosition="top"
						>
							<button onClick={() => setFilter('')} className="mt-2 font-bold  md:mt-5">
								All
							</button>
							<button onClick={() => setFilter('men')} className="absolute top-1/2 left-2  md:left-5">
								{Male}
							</button>
							<button className="absolute top-1/2 right-2 md:right-5" onClick={() => setFilter('women')}>
								{Female}
							</button>
							<button className="mb-2 md:mb-5" onClick={() => setFilter('kids')}>
								{Kid}
							</button>
						</Tilt>
						{filter !== ''
							? products.products
									.filter((product) => product.category === filter)
									.map((product: any) => {
										return (
											<ProductCard
												key={product.id}
												title={product.title}
												category={product.category}
												description={product.description}
												imgURL={product.imgURL}
												price={product.price}
											/>
										);
									})
							: products.products.map((product: any) => {
									return (
										<ProductCard
											key={product.id}
											title={product.title}
											category={product.category}
											description={product.description}
											imgURL={product.imgURL}
											price={product.price}
										/>
									);
							  })}
					</div>

					<div
						className="fixed inset-0 z-0 h-screen bg-cover bg-center"
						// style={{ backgroundImage: "url('/imgs/bgrgrey.jpg')" }}
					></div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Products;
