import './assets/main.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router/router";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/router/firebaseConfig';

import NavBar from '@/components/NavBar.vue';
import LogOut from '@/components/LogOut.vue';

const app = createApp(App);

//DatabaseRealTime
export const firebaseApp = initializeApp(firebaseConfig);


app.component('NavBar', NavBar);
app.component('LogOut', LogOut);

app.use(router);

app.mount('#app');