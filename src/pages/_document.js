import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
					<link rel="icon" type="image/png" sizes="32x32" href="/assets/imgs/logo.png"></link>

					<link href="https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap" rel="stylesheet" />
					<link
						href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Sigmar+One&display=swap"
						rel="stylesheet"
					></link>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
