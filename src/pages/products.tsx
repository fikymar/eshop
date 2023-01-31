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
import Loader from '../components/Loader';

const Products: NextPage = () => {
	const [title, setTitle] = useState('Products');
	const [filter, setFilter] = useState('');
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const products = useSelector((state: any) => state.productsData);

	const fetchProducts = async () => {
		setLoading(true);
		await getItems().then((items) => {
			dispatch(productsActions.setProducts(items));
		});
		setLoading(false);
	};

	useEffect(() => {
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
			{loading ? (
				<Loader full />
			) : (
				<>
					<div className="grid place-items-center">
						<div className="relative z-10 h-full w-full items-center justify-center overflow-auto">
							<div className="relative z-20 grid h-full w-full grid-cols-1 gap-4 p-2 md:grid-cols-2 md:grid-rows-4 md:p-4 lg:grid-cols-3 xl:grid-cols-4 ">
								<Tilt
									className="relative flex h-40 w-40 flex-col items-center justify-between self-center justify-self-center rounded-xl bg-sky-500 text-white dark:bg-yellow-600 md:h-80 md:w-80 "
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
									<button
										onClick={() => setFilter('men')}
										className="absolute top-1/2 left-2  md:left-5"
									>
										{Male}
									</button>
									<button
										className="absolute top-1/2 right-2 md:right-5"
										onClick={() => setFilter('women')}
									>
										{Female}
									</button>
									<button className="mb-2 md:mb-5" onClick={() => setFilter('kids')}>
										{Kid}
									</button>
								</Tilt>
								{filter !== ''
									? products.products
											.filter((product: any) => product.category === filter)
											.map((product: any) => {
												return (
													<ProductCard
														key={product.id}
														title={product.title}
														category={product.category}
														description={product.description}
														imgURL={product.imgURL}
														price={product.price}
														id={product.id}
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
													id={product.id}
												/>
											);
									  })}
							</div>
						</div>
					</div>
					<Footer />
				</>
			)}
		</div>
	);
};

export default Products;
