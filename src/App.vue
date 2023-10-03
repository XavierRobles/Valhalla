<template>
  <div id="app">
    <header>
      <div class="centered-content">
        <router-view></router-view>
        <NavBar v-if="shouldRenderNavBar" />
        <LogOut v-if="shouldRenderLogOut" style="position: absolute; top: 10px; right: 10px;" />
      </div>
    </header>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import LogOut from "@/components/LogOut.vue";
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'App',
  components: {NavBar, LogOut},
  setup() {
    const shouldRenderNavBar = ref(false);
    const shouldRenderLogOut = ref(false);

    const auth = getAuth();

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        // Renderiza NavBar y el logOut si hay un usuario autenticado.
        shouldRenderNavBar.value = !!user;
        shouldRenderLogOut.value = !!user;
      });
    });

    return {
      shouldRenderNavBar,
      shouldRenderLogOut
    };
  },
};
</script>

<style>
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* Resto de tu estilo CSS... */
.centered-content {
  text-align: center;
  width: 100%;
}
</style>
