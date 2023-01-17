import { setDoc, doc, getDocs, query, orderBy, collection } from 'firebase/firestore';
import { IData } from '../constants/models';
import { firestore } from '../firebase.config';

export const saveItem = async (data: IData) => {
	await setDoc(doc(firestore, 'items', `${Date.now()}`), data, { merge: true });
};

export const saveUser = async (user: any) => {
	await setDoc(doc(firestore, 'users', `${Date.now()}`), user, { merge: true });
};

export const getItems = async () => {
	const items = await getDocs(query(collection(firestore, 'items'), orderBy('id', 'desc')));

	return items.docs.map((doc) => doc.data());
};
