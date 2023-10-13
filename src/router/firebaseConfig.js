import { initializeApp } from 'firebase/app';
export const firebaseConfig = {
    apiKey: "AIzaSyB9rNMwnVpxvxO6fypjnWhyKvU5f2uautI",
    authDomain: "valhalla-ffxi.firebaseapp.com",
    projectId: "valhalla-ffx",
    storageBucket: "valhalla-ffxi.appspot.com",
    messagingSenderId: "440427974024",
    appId: "1:440427974024:web:0345b6d039775cb744fe3d",
    databaseURL: "https://valhalla-ffxi-default-rtdb.europe-west1.firebasedatabase.app/",
};
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
