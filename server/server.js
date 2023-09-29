const dotenv = require('dotenv')
dotenv.config();

const firebaseapp = require('firebase/app');
const firebaseDatabase= require('firebase/database');

const express = require('express');
const app = express();

const apiKey = process.env.FIREBASE_API_KEY;
const authDomain = process.env.FIREBASE_AUTH_DOMAIN;
const projectId = process.env.FIREBASE_PROJECT_ID;
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;
const appid = process.env.FIREBASE_APP_ID;
const firebaseConfig ={
	apiKey: apiKey,
	authDomain: authDomain,
	projectId: projectId,
	storageBucket: storageBucket,
	messagingSenderId: messagingSenderId,
	appId: appid
}
console.log(firebaseConfig)


const appFirebase = firebaseapp.initializeApp(firebaseConfig);
const db = firebaseDatabase.getDatabase(appFirebase);
const port =  3000;
app.listen(port, () => {
	console.log(`Servidor escuchando en el puerto ${port}`);
});

// Ruta para obtener datos de Firebase
app.get('/get-data', async (req, res) => {
	// Aquí puedes usar las variables de entorno para interactuar con Firebase
	const dbRef = firebaseDatabase.ref(db, "users");

	try {
		const snapshot = await firebaseDatabase.get(dbRef);
		console.log(snapshot)
	} catch (error) {
		throw new Error();
	}
	// Realiza solicitudes a Firebase y responde con los datos
	res.json({message: 'Datos obtenidos de Firebase'});
});



