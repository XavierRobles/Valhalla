import { createRouter, createWebHistory } from 'vue-router'
import HomeGameSource from '@/components/HomeGameSource.vue'
import LoginComponent from '@/components/LoginComponent.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import RegisterUserComponent from '@/components/RegisterUserComponent.vue'
import GameDetail from '@/components/GameDetail.vue'
import AddGame from '@/components/AddGame.vue'

const routes = [
  // {
  //   path: '/GameSource',
  //   name: 'HomeGameSource',
  //   component: HomeGameSource,
  //   redirect: { name: 'HomeGameSource' },
  //   meta: {
  //     private: true,
  //     breadcrumbTextKey: 'GameSource'
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'Home',
  //       component: HomeGameSource
  //     }
  //   ]
  // },
  {
    path: '/GameSource',
    name: 'GameSource',
    component: HomeView,
    redirect: { name: 'HomeGameSource' },
    meta: {
      private: true,
      breadcrumbTextKey: 'GameSource'
    },
    children: [
      {
        path: '',
        name: 'GameSource',
        component: HomeGameSource
      },
      {
        path: ':gameName',
        name: 'GameDetail',
        component: GameDetail,
        meta: {
          private: true,
          breadcrumbTextKey: 'GameDetail'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent,
    redirect: { name: 'LoginComponent' },
    meta: {
      private: true,
      breadcrumbTextKey: 'login'
    },
    children: [
      {
        path: '',
        name: 'login-form',
        component: LoginView
      }
    ]
  },
  {
    path: '/Register',
    name: 'Register',
    component: RegisterUserComponent,
    redirect: { name: 'RegisterComponent' },
    meta: {
      private: true,
      breadcrumbTextKey: 'Registrarse'
    },
    children: [
      {
        path: '',
        name: 'Register',
        component: LoginView
      }
    ]
  },
  {
    path: '/AddGame',
    name: 'AddGame',
    component: AddGame,
    redirect: { name: 'AddGame' },
    meta: {
      private: true,
      breadcrumbTextKey: 'Registrar juego'
    },
    children: [
      {
        path: '',
        name: 'AddGame',
        component: LoginView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.breadcrumbTextKey
  next()
})
export default router
