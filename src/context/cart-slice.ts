import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
		setCartItems(state, action) {
			state.items = action.payload;
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;
