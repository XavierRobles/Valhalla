import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router/router";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/router/firebaseConfig';

const app = createApp(App);

//DatabaseRealTime
export const firebaseApp = initializeApp(firebaseConfig);
app.config.globalProperties.$firebaseApp = firebaseApp;
app.use(router);

app.mount('#app');
