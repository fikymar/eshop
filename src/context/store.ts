import { configureStore, combineReducers, Action, ThunkAction } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import authSlice from './auth-slice';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import userSlice from './user-slice';
import productsSlice from './products-slice';
import cartSlice from './cart-slice';

const persistConfig = {
	key: 'root',
	storage,
};

const rootReducer = combineReducers({
	auth: authSlice.reducer,
	cartData: cartSlice.reducer,
	userData: userSlice.reducer,
	productsData: productsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	middleware: [thunk],
});

export const persistor = persistStore(store);
