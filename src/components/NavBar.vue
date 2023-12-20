<template>
  <div class="navbar" :class="{ 'expanded': isExpanded }" @mouseover="expandNavbar" @mouseleave="collapseNavbar">
    <br>
    <div class="logo-container" :style="{ marginLeft: isExpanded ? '0' : '-8px' }">
      <router-link to="/home" class="logo-link">
        <img alt="Vue logo" class="logo" src="@/assets/logo.png" :style="{ transform: isExpanded ? 'scale(1.7)' : 'scale(1)' }" />
      </router-link>
    </div>

<br>
    <ul>
      <li>
        <router-link to="/Home">
          <div class="nav-item-container">
            <div class="nav-item">
              <img v-if="!isExpanded" src="@/components/icons/home.png" height="50" width="52" alt="" />
              <span class="nav-text">Inicio</span>
            </div>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/members">
          <div class="nav-item-container">
            <div class="nav-item">
              <img v-if="!isExpanded" src="@/components/icons/vikingo.png" height="50" width="52" alt="" />
              <span class="nav-text">Members</span>
            </div>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/Event">
          <div class="nav-item-container">
            <div class="nav-item">
              <img v-if="!isExpanded" src="@/components/icons/event.png" height="50" width="52" alt="" />
              <span class="nav-text">Event</span>
            </div>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/Sky">
          <div class="nav-item-container">
            <div class="nav-item">
              <img v-if="!isExpanded" src="@/components/icons/sky.png" height="50" width="52" alt="" />
              <span class="nav-text">Sky</span>
            </div>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/Sea">
          <div class="nav-item-container">
            <div class="nav-item">
              <img v-if="!isExpanded" src="@/components/icons/sea.png" height="50" width="52" alt="" />
              <span class="nav-text">Sea</span>
            </div>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/Dynamis">
          <div class="nav-item-container">
            <div class="nav-item">
              <img v-if="!isExpanded" src="@/components/icons/dynamis.png" height="50" width="52" alt="" />
              <span class="nav-text">Dynamis</span>
            </div>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/rules">
          <div class="nav-item-container">
            <div class="nav-item">
              <img v-if="!isExpanded" src="@/components/icons/rules.png" height="50" width="52" alt="" />
              <span class="nav-text">Rules</span>
            </div>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/about">
          <div class="nav-item-container">
            <div class="nav-item">
              <img v-if="!isExpanded" src="@/components/icons/about.png" height="50" width="52" alt="" />
              <span class="nav-text">About</span>
            </div>
          </div>
        </router-link>
        <!-- Nuevo div para el texto de la versión -->
        <div class="version-text">V. 1.0.7</div>
        <a href="https://discord.gg/cGQe6vkw4u" target="_blank" class="discord-icon">
          <img v-if="!isExpanded" src="@/components/icons/discord.png" alt="Discord Icon" height="28" width="35" />
          <img v-else src="@/components/icons/discord.svg" alt="Discord Icon" class="discord-img" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref} from "vue";

const isExpanded = ref(false);

const expandNavbar = () => {
  isExpanded.value = true;
};

const collapseNavbar = () => {
  isExpanded.value = false;
};
</script>

<style scoped>
/* Estilo para el contenedor del logo */
.logo-container {
  text-align: center;
  padding: 5px 0;
}

/* Estilo para el logo */
.logo {
  width: 75px; /* Ancho inicial del logo */
  height: 75px; /* Altura inicial del logo */
  transition: transform 0.3s; /* Agrega una transición suave para la transformación */
}

.navbar.expanded .logo {
  transform: scale(1); /* Escala completa del logo cuando está expandida */
}

.navbar {
  background-color: #333;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 78px; /* Ancho de la barra de navegación */
  z-index: 999; /* Asegura que esté en la parte superior */
  overflow: hidden; /* Oculta cualquier contenido que se desborde */
  transition: width 0.3s; /* Agrega una transición suave para el ancho */
}

.navbar.expanded {
  width: 280px; /* Ancho expandido de la barra de navegación */
}

.navbar ul {
  list-style-type: none;
  padding: 0;
}

.navbar li {
  margin: 0;
  text-align: center;
  position: relative; /* Agrega posición relativa para permitir superposición */
  transition: height 0.3s, padding 0.3s; /* Agregar transición suave para la altura y el padding */
  height: 80px; /* Altura inicial de los elementos li */
  box-sizing: border-box; /* Asegura que el padding se incluya en la altura total */
}

/* Aumenta la altura de los elementos li cuando el navbar está expandido */
.navbar.expanded li {
  height: 80px; /* Cambia la altura deseada cuando está expandido */
  padding: 5px 0; /* Ajusta el padding vertical y horizontal según tus necesidades */
}

.navbar a {
  text-decoration: none;
  color: white;
  display: block; /* Muestra los elementos de navegación como bloques */
  padding: 10px; /* Espaciado interno */
  border-bottom: 1px solid #444; /* Línea divisoria entre elementos */
}

/* Aumenta el padding de los elementos a cuando el navbar está expandido */
.navbar.expanded a {
  padding: 16px; /* Ajusta el padding deseado cuando está expandido */
}

.navbar .nav-link {
  display: block;
  text-decoration: none;
  color: white;
  padding: 15px 10px; /* Ajusta el padding vertical y horizontal según tus necesidades */
  border-bottom: 1px solid #444; /* Línea divisoria entre elementos */
  position: relative; /* Agrega posición relativa para permitir superposición */
}

/* Aumenta el padding de los elementos .nav-link cuando el navbar está expandido */
.navbar.expanded .nav-link {
  padding: 20px 10px; /* Ajusta el padding deseado cuando está expandido */
}

.nav-text {
  display: none; /* Oculta los textos de navegación inicialmente */
  font-weight: bold;
  color: #ebf4ff;
}

.navbar.expanded .nav-text {
  display: inline; /* Muestra los textos de navegación cuando está expandida */
}

/* Establece el estilo para la superposición de fondo en el hover */
.navbar .nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(68, 68, 68, 0); /* Fondo transparente por defecto */
  transition: background-color 0.3s; /* Transición suave para el fondo */
}

/* Cambia el fondo al pasar el cursor */
.navbar .nav-link:hover::before {
  background-color: rgba(68, 68, 68, 0.3); /* Color de fondo al pasar el cursor */
}
.version-text {
  font-size: 12px;
  margin-top: 15px;
  font-weight: bold;
  color: #ebf4ff;
}
.discord-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #ebf4ff;
  margin-top: 5px;
}

.discord-icon img {
  margin-right: 5px;
}
.discord-img {
  width:80px;
  height: 50px;
}
</style>

