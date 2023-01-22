export type IData = {
	id?: string;
	title: string;
	imgURL?: any;
	category: string;
	description: string;
	price: any;
};

export type CartItem = {
	id: string;
	title: string;
	imgURL?: any;
	qty: number;
	price: any;
};
