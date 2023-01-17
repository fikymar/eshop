import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	products: [],
};

export const productsSlice = createSlice({
	name: 'productsData',
	initialState,
	reducers: {
		setProducts(state, action) {
			state.products = action.payload;
		},
	},
});

export const productsActions = productsSlice.actions;

export default productsSlice;
