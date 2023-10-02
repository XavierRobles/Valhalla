<template>
  <div class="navbar"><img alt="Vue logo" class="logo" src="@/assets/logo.png" width="75" height="75" />

    <ul>
      <li><router-link to="/">Inicio</router-link></li>
      <li><router-link to="/Event">Event</router-link></li>
      <li><router-link to="/Sky">Sky</router-link></li>
      <li><router-link to="/Sea">Sea</router-link></li>
      <li><router-link to="/Dynamis">Dynamis</router-link></li>
      <li><router-link to="/rules">Rules</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>
  </div>
</template>

<script>
import About from "@/components/About.vue";

export default {
  name: 'Navbar',
  components: {About},
};
</script>

<style scoped>
.navbar {
  background-color: #333;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 150px; /* Ancho de la barra de navegación */
  z-index: 999; /* Asegura que esté en la parte superior */
}

.navbar ul {
  list-style-type: none;
  padding: 0;
}

.navbar li {
  margin: 0;
  text-align: center;
}

.navbar a {
  text-decoration: none;
  color: white;
  display: block; /* Muestra los elementos de navegación como bloques */
  padding: 10px; /* Espaciado interno */
  border-bottom: 1px solid #444; /* Línea divisoria entre elementos */
}

.navbar a:hover {
  background-color: #444; /* Cambia el color al pasar el cursor */
}
</style>


