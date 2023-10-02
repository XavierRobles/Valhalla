
<template>
  <div class="greetings">
    <img src="@/assets/valhalla.png" alt="Fondo de Valhalla" />
    <router-link to="/home">Back</router-link>
  </div>

</template>

<script>

export default {
  data: () => ({
    loading: false,
    dialog: true
  }),
  methods: {
  }
}
</script>

<style scoped>
.greetings {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
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
