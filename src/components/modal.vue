<template>
  <div class="popup" v-if="showPopup">
    <div class="popup-content">
      <span class="close" @click="closePopup">&times;</span>
      <h2>Mi Popup</h2>
      <p>Contenido del popup</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const { showPopup } = defineProps(['showPopup']);
const { closePopup } = defineEmits(['closePopup']);
</script>

<style scoped>
.popup {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 50%;
  text-align: center;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
  cursor: pointer;
}
</style>
