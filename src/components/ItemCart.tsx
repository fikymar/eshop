import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { cartActions } from '../context/cart-slice';
import IconButton from './IconButton';
import { CartItem } from '../constants/models';
import { shimmer, toBase64 } from '../utils/placeholderImg';

const ItemCart = (item: any) => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state: any) => state.cartData.items);
	const [error, setError] = useState('');

	const deleteItem = (id: string) => {
		dispatch(cartActions.deleteItemFromCart(id));
		console.log('clear', cartItems);
	};

	const updateQty = (action: string, id: string) => {
		if (action === 'increase') {
			dispatch(cartActions.increaseQtyOfItem(id));
		}

		if (action === 'decrease') {
			dispatch(cartActions.decreaseQtyOfItem(id));
		}

		cartItems.map((item: CartItem) => {
			if (item.id === id) {
				if (item.qty > 10) {
					dispatch(cartActions.setQtyOfItemToMax(id));
					setError('Really that much? Contact our sales team, let´s make a deal :) ');
					setTimeout(() => {
						setError('');
					}, 4000);
				}
				if (item.qty === 0) {
					dispatch(cartActions.setQtyOfItemToMin(id));
					setError('You cant buy less then 1, silly...');
					setTimeout(() => {
						setError('');
					}, 4000);
				}
			}
		});
	};

	return (
		<>
			<div className="grid h-[160px] grid-cols-3 grid-rows-1 items-center justify-between gap-1 rounded-lg border-2 border-transparent bg-slate-100 p-4 transition   hover:shadow-md dark:bg-zinc-500 ">
				{item.item.imgURL && (
					<Image
						src={item.item.imgURL || item.item.img}
						width={100}
						height={110}
						alt="product image"
						className="row-span-2 h-auto object-cover"
						placeholder="blur"
						blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(110, 110))}`}
					/>
				)}
				<h3 className=" md:text-m text-base">{item.item.title}</h3>
				<h3 className="justify-self-end text-lg md:text-xl">{item.item.price * item.item.qty} $</h3>
				<div className="col-span-2 col-start-2 flex items-center  gap-5">
					<IconButton onClick={() => updateQty('decrease', item.item.id)}>-</IconButton>
					<p>{item.item.qty}</p>
					<IconButton onClick={() => updateQty('increase', item.item.id)}>+</IconButton>
					<IconButton onClick={() => deleteItem(item.item.id)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="h-6 w-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
							/>
						</svg>
					</IconButton>
				</div>
			</div>
			{error && <p className="w-full text-center text-red-400"> {error}</p>}
		</>
	);
};

export default ItemCart;
