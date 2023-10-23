
<template>
  <div class="greetings">
    <img src="@/assets/valhalla.png" alt="Fondo de Valhalla" />
    <br>
    <router-link class="back" to="/home">Back</router-link>
  </div>

</template>

<script setup>
import {ref} from "vue";

const loading = ref(false);
const dialog = ref(true);
</script>

<style scoped>

.back {
  display: inline-block;
  padding: 5px 10px;
  background-color: #95a4ab;
  color: #000000;
  text-decoration: none;
  border-radius: 5px;
  margin-bottom: 5px;
  transition: background-color 0.3s, color 0.3s; /* Transiciones suaves para color de fondo y texto */
  font-weight: bold;
}

/* Cambia el color de fondo y el texto al pasar el ratón sobre el botón */
.back:hover {
  background-color: #687377;
  color: #e74c3c;
}

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
