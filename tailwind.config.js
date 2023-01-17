/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		typography: (theme) => ({
			dark: {
				css: {
					color: 'white',
				},
			},
		}),
		extend: {
			fontFamily: {
				sans: ['Roboto'],
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
