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

export type IContact = {
	id: string;
	name: string;
	email: string;
	msg: string;
};

export type IContactInput = {
	placeholder: string;
	name: string;
	title: string;
	errorText: string;
	textarea?: boolean;
	onChange?: (e: any) => void;
};

export type ItemInput = {
	placeholder: string;
	type: string;
	name: string;

	onChange?: (e: any) => void;
};
