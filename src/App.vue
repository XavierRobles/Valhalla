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
<script setup>
import NavBar from "@/components/NavBar.vue";
import Setting from "@/components/Setting.vue";
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth();

const positionEventNavidad = ref('');
const renderNavBar = ref(false);
const renderSettings = ref(false);
const renderEventNavidad = ref(false);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    // Renderiza NavBar y setting si hay un usuario autenticado.
    renderNavBar.value = !!user;
    renderSettings.value = !!user;
    renderEventNavidad.value = !!user;
    positionEventNavidad.value = 'event-navidad-left';
  });
});

</script>

<style>
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #deecec;
}
.event-navidad-left {
  position: absolute;
  top: 10px; /* Ajusta la posición superior según tu diseño */
  left: 10px; /* Ajusta la posición izquierda según tu diseño */
}

.event-navidad-right {
  position: absolute;
  top: 10px; /* Ajusta la posición superior según tu diseño */
  right: 10px; /* Ajusta la posición derecha según tu diseño */
}
</style>
