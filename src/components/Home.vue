<template>
  <div class="home">
    <div class="content">
      <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />
      <h3><span class="title">VALHALLA</span></h3>
      <router-link to="/">Login</router-link>
      <br>
      <router-link to="/about">Acerca de</router-link>
    </div>
  </div>
</template>

<script setup>

import { listarUsuarios} from "@/api/apiFirebase";
listarUsuarios();
defineProps({
  msg: {
    type: String,
    required: true
  }
})

</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  color: #D9E7E7;
}

.content {
  text-align: center;
}
</style>
