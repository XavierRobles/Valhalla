import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import About from '@/components/About.vue';
import Login from '@/components/Login.vue';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/home',
        component: Home,
        name: 'Home',
    },
    {
        path: '/about',
        component: About,
        name: 'About',
    },
    {
        path: '/login',
        component: Login,
        name: 'Login',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const auth = getAuth();
    const user = await new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user);
        });
    });

    if (to.name !== 'Login' && !user) {

        next({ name: 'Login' });
    } else if (to.name === 'Login' && user) {

        next({ name: 'Home' });
    } else {

        next();
    }
});


export default router;