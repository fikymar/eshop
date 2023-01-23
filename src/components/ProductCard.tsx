import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from './button';
import Link from 'next/link';
import { IData } from '../constants/models';
import { Cart } from '../constants/icons';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../context/cart-slice';
import { shimmer, toBase64 } from '../utils/placeholderImg';

const ProductCard = ({ title, description, price, imgURL, category, id }: IData) => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state: any) => state.cartData.items);
	const productObject = { title, description, price, imgURL, category, id };

	type ProductInCart = {
		title: string;
		price: any;
		imgURL?: any;
		id?: string;
	};

	const addToCart = (productObject: ProductInCart) => {
		dispatch(cartActions.setCartItems(productObject));
	};

	return (
		<div className="hover:dark-bg-yellow-100 group relative z-10 grid h-max w-full grid-cols-1 grid-rows-[1fr_0.5fr] gap-2 overflow-hidden rounded-lg border-gray-700  px-4 shadow-md transition-all duration-500 ease-in-out hover:bg-sky-200 hover:bg-opacity-10 hover:shadow-lg hover:brightness-[1.1] md:grid-cols-2 md:grid-rows-1 2xl:gap-3">
			<p className="absolute left-4  text-sm text-sky-500  drop-shadow-md dark:text-yellow-500">{category}</p>
			<h5 className=" absolute top-4 left-4  text-lg font-semibold ">{title}</h5>
			<div className="relative col-start-1 col-end-1 row-span-1  h-full min-h-[300px] w-full md:h-full">
				{imgURL && (
					<Image
						className="object-contain object-[center_-20px] pt-14 transition-transform duration-500  group-hover:scale-105 md:object-cover"
						fill
						src={imgURL}
						alt="product image"
						placeholder="blur"
						blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
					/>
				)}
			</div>
			<div className="row-ends-2 col-span-1 row-start-2 flex flex-col items-end  gap-1 py-4 pl-2 md:col-start-2 md:row-span-2">
				<p className="my-auto self-end text-right text-base capitalize">{description}</p>
				<p className="my-2  justify-self-end text-2xl font-bold ">$ {price}</p>
				<Button
					bgColor="bg-pink-500"
					addClass="w-full md:justify-self-end  max-w-[200px] justify-self-center"
					value="Add to cart"
					icon={Cart}
					onClick={() => addToCart(productObject)}
				/>
			</div>
		</div>
	);
};

export default ProductCard;
