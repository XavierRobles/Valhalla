<template>
  <div id="app">
    <header>
      <div class="centered-content">
        <router-view></router-view>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'App',
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
