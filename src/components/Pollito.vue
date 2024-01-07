<template>
  <div class="move-images">
    <transition-group name="slide">
      <img
          v-for="(image, index) in images"
          :key="index"
          :ref="`movingImage${index}`"
          :class="'moving-image image-' + index"
          src="@/components/bank/pollito.gif"
          alt="Imagen"
          :style="{ transform: `translateX(${image.position}px) scaleX(${image.direction}) scale(0.5)` }"
      />
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const images = ref([]);
let moveIntervals = [];

onMounted(() => {
  generateImages();
  images.value.forEach((img, index) => {
    const image = document.querySelector(`.image-${index}`);
    moveImage(image, index);
  });
});

onUnmounted(() => {
  moveIntervals.forEach(interval => clearInterval(interval));
});

function generateImages() {
  for (let i = 0; i < 4; i++) {
    images.value.push({
      position: Math.floor(Math.random() * (window.innerWidth * 0.1)) - window.innerWidth * 0.05,
      direction: Math.random() > 0.5 ? 1 : -1
    });
  }
}

function moveImage(image, index) {
  const moveInterval = setInterval(() => {
    images.value[index].position += 2 * images.value[index].direction;

    if (images.value[index].position >= window.innerWidth * 0.05 || images.value[index].position <= -window.innerWidth * 0.15) {
      images.value[index].direction = -images.value[index].direction;
    }

    image.style.transform = `translateX(${images.value[index].position}px) scaleX(${images.value[index].direction}) scale(0.5)`;
  }, 30); // Ajusta la velocidad del intervalo aquí
  moveIntervals.push(moveInterval);
}
</script>

<style>
.move-images {
  position: relative;
  width: 100%;
  height: 300px; /* Ajusta la altura según tus necesidades */
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 2s; /* Ajusta la duración de la transición */
}
</style>
