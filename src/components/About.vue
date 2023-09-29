<template>
  <div class="greetings">
  </div>
  <router-link to="/home">Volver</router-link>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    userRegisterDialogVisible: true,
    gameRegisterInvalidForm: false,
    gamesRegisterValidationRules: false,
    dialog: true
  }),
  methods: {
  }
}
</script>

<style scoped>
.greetings {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Asegura que el componente tenga al menos el alto de la ventana */
  background-image: url('@/assets/valhalla.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.content {
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8); /* Agrega un fondo semi-transparente al contenido */
  padding: 20px; /* Añade espacio alrededor del contenido para mayor legibilidad */
}
</style>
