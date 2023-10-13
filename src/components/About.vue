
<template>
  <div class="greetings">
    <img src="@/assets/valhalla.png" alt="Fondo de Valhalla" />
    <router-link to="/home">Back</router-link>
  </div>

</template>

<script setup>
import {ref} from "vue";

const loading = ref(false);
const dialog = ref(true);
</script>

<style scoped>
.greetings {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
}

/* Estilo para el enlace "Volver" */
.router-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
  margin-top: 20px;
}

.router-link:hover {
  text-decoration: underline;
}
</style>
