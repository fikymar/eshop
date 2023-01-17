import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCLdATnC06-wZtODhIejGU5u9qGj55AGQo',
	authDomain: 'eshop-project-2c38e.firebaseapp.com',
	databaseURL: 'https://eshop-project-2c38e-default-rtdb.firebaseio.com',
	projectId: 'eshop-project-2c38e',
	storageBucket: 'eshop-project-2c38e.appspot.com',
	messagingSenderId: '634124005340',
	appId: '1:634124005340:web:fe8e7cbaaa3f44600ba919',
	measurementId: 'G-9R12EGSBH0',
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
