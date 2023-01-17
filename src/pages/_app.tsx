import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store, persistor } from '../context/store';
import Layout from '../components/Layout';
import { ThemeProvider } from 'next-themes';

import { PersistGate } from 'redux-persist/integration/react';
import Loader from '../components/Loader';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<Provider store={store}>
			<PersistGate loading={<Loader full />} persistor={persistor}>
				<ThemeProvider attribute="class">
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
