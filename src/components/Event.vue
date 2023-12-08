<template>
  <div class="content-title">
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="325" height="325" />
    <h3>
      <span class="title">VALHALLA</span>
    </h3>
  </div>
  <div class="centered-content">
    <p class="construction-text">WORKING IN PROGRESS</p>
    <img alt="Under Construction" class="construction-image" src="@/components/icons/img/alljobs.png" />
  </div>
</template>

<style scoped>
.content-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.centered-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
}

.construction-image {
  width: 100%; /* Ajusta el tamaño de la imagen según tus necesidades */
  height: auto;
}

.construction-text {
  font-size: 24px; /* Ajusta el tamaño de fuente según tus necesidades */
  color: yellow;
  margin-top: 10px;
}
</style>
<script setup>
</script>