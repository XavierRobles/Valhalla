<template>
  <div id="app">
    <header>
      <div class="centered-content">
        <router-view></router-view>
        <NavBar v-if="renderNavBar" />
        <Setting v-if="renderSettings" style="position: absolute; top: 10px; right: 10px;" />
      </div>
    </header>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import LogOut from "@/components/Setting.vue";
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Setting from "@/components/Setting.vue";

export default {
  name: 'App',
  components: {Setting, NavBar, LogOut},
  setup() {
    const renderNavBar = ref(false);
    const renderSettings = ref(false);

    const auth = getAuth();

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        // Renderiza NavBar y setting si hay un usuario autenticado.
        renderNavBar.value = !!user;
        renderSettings.value = !!user;
      });
    });

    return {
      renderNavBar: renderNavBar,
      renderSettings: renderSettings
    };
  },
};
</script>

<style>
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #deecec;
}
/* Resto de tu estilo CSS... */
.centered-content {
  //text-align: center;
  //width: 100%;
}
</style>
