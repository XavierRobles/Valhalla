const dotenv = require('dotenv');
dotenv.config();

const firebase = require('firebase/app');
require('firebase/database');

const express = require('express');
const app = express();
const cors = require('cors');
const {getDatabase} = require("firebase/database");
import { firebaseApp } from '@/main';

app.use(cors());

const apiKey = process.env.FIREBASE_API_KEY;
const authDomain = process.env.FIREBASE_AUTH_DOMAIN;
const projectId = process.env.FIREBASE_PROJECT_ID;
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.FIREBASE_APP_ID;

const firebaseConfig = {
	apiKey,
	authDomain,
	projectId,
	storageBucket,
	messagingSenderId,
	appId,
};

const appFirebase = firebase.initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Servidor escuchando en el puerto ${port}`);
});

// Agrega una ruta para verificar el estado del servidor
app.get('/status', (req, res) => {
	res.json({ status: 'Servidor en funcionamiento' });
});

// Ruta para obtener datos de Firebase
app.get('/get-data', async (req, res) => {
	try {
		const snapshot = await db.ref('user').once('value');
		const data = snapshot.val();
		console.log('Datos obtenidos desde Firebase:', data);
		res.json({ message: 'Datos obtenidos de Firebase', data });
	} catch (error) {
		console.error('Error al obtener datos de Firebase:', error);
		res.status(500).json({ error: 'Error al obtener datos de Firebase' });
	}
});
