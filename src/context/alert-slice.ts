import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type AlertState = {
	msg: {};
};

const initialState: AlertState = {
	msg: { text: '', status: '' },
};

export const alertSlice = createSlice({
	name: 'alertMsg',
	initialState,
	reducers: {
		setMsg(state, { payload }) {
			state.msg = { text: payload.text, status: payload.status };
		},
		deleteMsg(state) {
			state.msg = { text: '', status: '' };
		},
	},
});

export const alertActions = alertSlice.actions;

export default alertSlice;
