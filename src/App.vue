<template>
  <v-app>
    <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/GameSource" style="cursor: pointer">
          <img :src="require('./assets/logo.png')" alt="Girl in a jacket" width="50" height="50">
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
            flat
            v-for="item in menuItems"
            :key="item.title"
            :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-title class="hidden-sm-and-u">
        <v-btn style="cursor: pointer" @click="dialog = true">Login
          <v-icon left dark>Login</v-icon>
        </v-btn>
      </v-toolbar-title>
    </v-toolbar>
    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          max-width="100%"
      >
        <v-card>
          <v-card-title >
            <b>Login</b>
          </v-card-title>
          <v-card-title>
            <label class="form-label"> Usuario </label>
          </v-card-title>
          <input
              v-model="userModel.username"
              class="form-input"
              type="text"
              id="name"
              required
              placeholder="Usuario"
          >
          <v-card-title>
            <label class="form-label">Contraseña</label>
          </v-card-title>
          <input
              v-model="userModel.credential"
              class="form-input"
              type="password"
              id="pass"
              placeholder="Contraseña"
          >
          <v-card-actions>
            <v-btn
                color="green darken-1"
                text
                @click="dialog = false">
              Cancelar
            </v-btn>
            <v-btn
                color="green darken-1"
                text
                @click="login">
              Entrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-content>
      <router-view></router-view>
    </v-content>

  </v-app>
</template>
<script>
// import HomeGameSource from './components/HomeGameSource'

import usersApi from '@/api/usersApi'

export default {
  name: 'App',
  data () {
    return {
      userModel: {},
      dialog: false,
      appTitle: 'Game Source Store',
      sidebar: false,
      menuItems: [
        //  { title: 'Iniciar sesión', path: '/login', icon: 'face' },
        { title: 'Registrarse', path: '/Register', icon: 'lock_open' },
        { title: 'Registrar juego', path: '/AddGame', icon: 'home' }
      ]
    }
  },
  methods: {
    async login () {
      try {
        this.loading = true
        const hastPass = this.encrypt(this.userModel.credential)
        console.log(hastPass)
        this.userModel.credential = hastPass
        await usersApi.loginUser(this.userModel)
        this.dialog = false
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
    encrypt (src) {
      const CryptoJS = require('crypto-js')
      const passphrase = '123456'
      return CryptoJS.AES.encrypt(src, passphrase).toString()
    }
    // decrypt (src) {
    //   const CryptoJS = require('crypto-js')
    //   const passphrase = '123456'
    //   const bytes = CryptoJS.AES.decrypt(src, passphrase)
    //   const originalText = bytes.toString(CryptoJS.enc.Utf8)
    //   return originalText
    // }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
body {
  margin: 0;
  padding: 0;
  background: #102a43;
  background-image: url("https://uploads.codesandbox.io/uploads/user/c3fb8e8a-35ea-4232-b5d6-0f3c5373510b/LVs7-dots.png");
  background-size: contain;
}
.footer,
.header {
  padding: 20px 20px;
  color: #f0f4f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1,
  h2,
  h3 {
    color: #f0f4f8;
    padding: 0;
    margin: 0;
  }
  .links {
    display: flex;
    font-family: "Open Sans";
    span {
      padding: 0 10px;
      font-size: 18px;
      border-right: 1px solid #9fb3c8;
      &:last-child {
        border-right: none;
      }
    }
  }
  .version {
    font-family: "Open Sans";
    padding: 0 10px;
    color: #9fb3c8;
    font-size: 12px;
    margin-top: 5px;
  }
}
.header {
  padding: 10px 20px;
  .logo {
    font-family: "Open Sans";
    letter-spacing: 3px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .logo .part-2 {
    color: #d64545;
  }
  .navbar{
    margin-top: 200px;
  }
}
.form-input{
  height: 30px;
}
</style>
