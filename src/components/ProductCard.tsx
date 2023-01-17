import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from './button';
import Link from 'next/link';
import { IData } from '../constants/models';
import { Cart } from '../constants/icons';

const ProductCard = ({ title, description, price, imgURL, category }: IData) => {
	return (
		<Link href="/">
			<div className="group relative z-10 grid  h-max   w-full grid-cols-1 grid-rows-[1fr_0.5fr] overflow-hidden rounded-lg border-gray-700 px-4 text-slate-50 shadow-md transition-all ease-in-out hover:shadow-lg md:grid-cols-2 md:grid-rows-1">
				<p className="absolute  left-4 text-sm tracking-tight text-sky-500 drop-shadow-md  group-hover:tracking-wide dark:text-amber-300">
					{category}
				</p>
				<h5 className="font-effect-3d group-hover:font-effect-3d absolute top-4 left-4  text-lg font-semibold  tracking-tight group-hover:tracking-normal">
					{title}
				</h5>
				<div className="relative col-start-1 col-end-1 row-span-1  h-full min-h-[300px] w-full md:h-full">
					{imgURL && (
						<Image
							className="object-contain object-[center_-20px] pt-14 transition-transform group-hover:scale-105 md:object-cover"
							fill
							src={imgURL}
							alt="product image"
						/>
					)}
				</div>
				<div className="row-ends-2 col-span-1 row-start-2 flex flex-col items-end  gap-1 py-4 pl-2 md:col-start-2 md:row-span-2">
					<p className="my-auto self-end text-right text-base ">{description}</p>

					<p className="justify-self-end  text-2xl font-bold ">$ {price}</p>

					<Button bgColor="bg-pink" addClass="w-full justify-self-end" value="Add to cart" icon={Cart} />
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
