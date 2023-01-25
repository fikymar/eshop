import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../constants/models';
import { getItems } from '../utils/firebaseFunctions';

type CartState = {
	cartShow: boolean;
	items: CartItem[];
};

const initialState: CartState = {
	cartShow: false,
	items: [],
};

export const cartSlice = createSlice({
	name: 'cartData',
	initialState,
	reducers: {
		openCart(state) {
			state.cartShow = true;
		},
		closeCart(state) {
			state.cartShow = false;
		},
		setCartItems(state, { payload }) {
			if (state.items.length < 1) {
				state.items.push({ ...payload, qty: 1 });
				return;
			} else {
				const isInCart = state.items.find((item) => item.id === payload.id);
				if (isInCart) {
					isInCart.qty++;
				} else state.items.push({ ...payload, qty: 1 });
			}
		},
		deleteItemFromCart(state, { payload }) {
			state.items = state.items.filter(({ id }) => id != payload);
		},
		increaseQtyOfItem(state, { payload }) {
			state.items.map((item) => {
				if (item.id === payload) {
					item.qty += 1;
				}
			});
		},
		decreaseQtyOfItem(state, { payload }) {
			state.items.map((item) => {
				if (item.id === payload) {
					item.qty -= 1;
				}
			});
		},
		setQtyOfItemToMin(state, { payload }) {
			state.items.map((item) => {
				if (item.id === payload) {
					item.qty = 1;
				}
			});
		},
		setQtyOfItemToMax(state, { payload }) {
			state.items.map((item) => {
				if (item.id === payload) {
					item.qty = 10;
				}
			});
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;
