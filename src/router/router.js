import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import UserProfile from "@/components/UserProfile.vue";
import AccessDenied from '@/components/Login.vue';
import SystemManager from "@/components/SystemManager.vue";
import VersionHistory from "@/components/VersionHistory.vue";
import Event from "@/components/Event.vue";
import Sky from "@/components/Sky.vue";
import Sea from "@/components/Sea.vue";
import Dynamis from "@/components/Dynamis.vue";
import Rules from "@/components/Rules.vue";
import About from '@/components/About.vue';


import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getDatabase, ref as rtdbRef, get as rtdbGet} from 'firebase/database';
import {firebaseApp} from "@/main";




/*
Roles:
    leader: 'JARL',
    official: 'EARL',
    member: 'KARL'
    applicant 'WORM'
 */


const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        component: Login,
        name: 'Login',
    },
    {
        path: '/home',
        component: Home,
        name: 'Home',
        meta: {requiresAuth: true, roles: ['JARL', 'EARL', 'KARL']},
    },
    {
        path: '/event',
        component: Event,
        name: 'Event',
        meta: {requiresAuth: true, roles: ['JARL', 'EARL', 'KARL']},
    },
    {
        path: '/sky',
        component: Sky,
        name: 'Sky',
        meta: {requiresAuth: true, roles: ['JARL', 'EARL', 'KARL']},
    },
    {
        path: '/sea',
        component: Sea,
        name: 'Sea',
        meta: {requiresAuth: true, roles: ['JARL', 'EARL', 'KARL']},
    },
    {
        path: '/dynamis',
        component: Dynamis,
        name: 'Dynamis',
        meta: {requiresAuth: true, roles: ['JARL', 'EARL', 'KARL']},
    },
    {
        path: '/SystemManager',
        component: SystemManager,
        name: 'SystemManager',
        meta: {requiresAuth: true, roles: ['JARL']},
    },
    {
        path: '/UserProfile/:name',
        component: UserProfile,
        name: 'UserProfile',
        meta: { requiresAuth: true, roles: ['JARL', 'EARL', 'KARL'] },
        props: true,
    },
    {
        path: '/VersionHistory',
        component: VersionHistory,
        name: 'VersionHistory',
        meta: { requiresAuth: true, roles: ['JARL', 'EARL', 'KARL'] },
        props: true,
    },
    {
        path: '/rules',
        component: Rules,
        name: 'Rules',
        meta: {requiresAuth: true, roles: ['JARL', 'EARL', 'KARL']},
    },
    {
        path: '/about',
        component: About,
        name: 'About',
        meta: {requiresAuth: true, roles: ['JARL', 'EARL', 'KARL']},
    },
    {
        path: '/access-denied',
        component: AccessDenied,
        name: 'AccessDenied',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const auth = getAuth();
    const db = getDatabase(firebaseApp);
    const user = await new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user);
        });
    });

    if (to.meta.requiresAuth) {
        if (!user) {
            next({name: 'Login'});
        } else {
            const userRole = await getUserRoleFromDatabase(user.uid, db);
            if (userRole && hasAccess(userRole, to.meta.roles)) {
                next();
            } else {
                next({name: 'AccessDenied'});
            }
        }
    } else {
        next();
    }
});

async function getUserRoleFromDatabase(userId, db) {
    try {
        const userRef = rtdbRef(db, 'user/');
        const snapshot = await rtdbGet(userRef);
        const userData = snapshot.val();

        return userData ? userData[userId].rol : null;
    } catch (error) {
        console.error('Error al obtener el rol del usuario:', error);
        return null;
    }
}

function hasAccess(userRole, requiredRoles) {
    return requiredRoles.includes(userRole);
}

export default router;
