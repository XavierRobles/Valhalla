<template>
  <aside>
    <div></div>
  </aside>
  <ul class="bauble-list" style="text-align: left;">
    <li v-for="(bauble, index) in baubles" :key="index" :style="bauble.style" :class="bauble.class">
      <img :src="bauble.textContent" style="width: 15px; height: 15px;" />
    </li>



  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import icon1 from '@/components/iconffxi/1.png';
import icon2 from '@/components/iconffxi/2.png';
import icon3 from '@/components/iconffxi/3.png';
import icon4 from '@/components/iconffxi/4.png';
import icon5 from '@/components/iconffxi/5.png';
import icon6 from '@/components/iconffxi/6.png';
import icon7 from '@/components/iconffxi/7.png';
import icon8 from '@/components/iconffxi/8.png';
import icon9 from '@/components/iconffxi/9.png';
import icon10 from '@/components/iconffxi/10.png';
import icon11 from '@/components/iconffxi/11.png';
import icon12 from '@/components/iconffxi/12.png';
import icon13 from '@/components/iconffxi/13.png';
import icon14 from '@/components/iconffxi/14.png';
import icon15 from '@/components/iconffxi/15.png';
import icon16 from '@/components/iconffxi/16.png';
import icon17 from '@/components/iconffxi/17.png';
import icon18 from '@/components/iconffxi/18.png';
import icon19 from '@/components/iconffxi/19.webp';
import icon20 from '@/components/iconffxi/20.webp';
import icon21 from '@/components/iconffxi/blm.png';
import icon22 from '@/components/iconffxi/blu.png';
import icon23 from '@/components/iconffxi/brd.png';
import icon24 from '@/components/iconffxi/bst.png';
import icon25 from '@/components/iconffxi/cor.png';
import icon26 from '@/components/iconffxi/dnc.png';
import icon27 from '@/components/iconffxi/drg.png';
import icon28 from '@/components/iconffxi/drk.png';
import icon29 from '@/components/iconffxi/geo.png';
import icon30 from '@/components/iconffxi/mnk.png';
import icon31 from '@/components/iconffxi/nin.png';
import icon32 from '@/components/iconffxi/pld.png';
import icon33 from '@/components/iconffxi/pup.png';
import icon34 from '@/components/iconffxi/rdm.png';
import icon35 from '@/components/iconffxi/rng.png';
import icon36 from '@/components/iconffxi/run.png';
import icon37 from '@/components/iconffxi/sam.png';
import icon38 from '@/components/iconffxi/sch.png';
import icon39 from '@/components/iconffxi/smn.png';
import icon40 from '@/components/iconffxi/thf.png';
import icon41 from '@/components/iconffxi/war.png';
import icon42 from '@/components/iconffxi/whm.png';


const baubles = ref([]);
const maxX = 10;
const maxY = 35;
const baublesLength = 350; // cantidad de objetos

const imagePaths = [
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  icon9,
  icon10,
  icon11,
  icon12,
  icon13,
  icon14,
  icon15,
  icon16,
  icon17,
  icon18,
  icon19,
  icon20,
  icon21,
  icon22,
  icon23,
  icon24,
  icon25,
  icon26,
  icon27,
  icon28,
  icon29,
  icon30,
  icon31,
  icon32,
  icon33,
  icon34,
  icon35,
  icon36,
  icon37,
  icon38,
  icon39,
  icon40,
  icon41,
  icon42
];
onMounted(() => {
  const generatedBaubles = [];
  for (let i = 0; i < baublesLength; i++) {
    const y = Math.pow(i / baublesLength, 0.5) * maxY - maxY;
    const x = Math.pow((maxX * i) / baublesLength, 0.5) * 5.5 * Math.random() * (i % 2 === 0 ? 1 : -1);
    const r = Math.random();
    const n = Math.random();
    const style = {
      '--x': `${x}vmin`,
      '--y': `${y}vmin`,
      '--r': `${r}turn`,
      '--sign': n > 0.5 ? -1 : 1,
      '--s': Math.random() * 0.875 + 0.125,
      '--hue': Math.random() * 360
    };

    const animationDuration = Math.random() * 3 + 1; // Duración de animación aleatoria entre 1 y 4 segundos
    const animationDelay = Math.random() * 3; // Retraso de animación aleatorio entre 0 y 3 segundos
    const randomImagePathIndex = Math.floor(Math.random() * imagePaths.length);
    const textContent = imagePaths[randomImagePathIndex];

    generatedBaubles.push({
      style,
      textContent,
      class: `animate-element-${i}`, // Clase única para cada elemento basada en el índice
      animation: `move-up-down-${i} ${animationDuration}s ease-in-out infinite alternate ${animationDelay}s`, // Aplicar animación individual a cada elemento
    });
  }
  baubles.value = generatedBaubles;
});
</script>



<style scoped>

body {
  height: 100vh;
  height: 100svh;
  display: grid;
  perspective: 150vmin;
  overflow: hidden;
  background: radial-gradient(circle, hsl(203 50% 2%), hsl(203 50% 10%));
  font-family: system-ui, sans-serif;
  font-size: 2.6vmin;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
  display: grid;
  margin: auto;

  animation: display-case 10000ms infinite linear;
  animation-play-state: paused;
  transform-style: preserve-3d;
}

@media (prefers-reduced-motion: no-preference) {
  ul {
    animation-play-state: running;
  }
}

.bauble-list li {
  width: 2vmin;
  height: 2vmin;
  grid-column: 2 / 2;
  grid-row: 1 / 2;
  border: 0.85vmin double currentColor;
  border-width: 0;
  color: hsl(var(--hue, fff), 99%, 50%);
  width: 2vmin;
  height: 2vmin;
  border-radius: 50%;
  transform: translateY(var(--y)) rotateY(var(--r)) translateX(var(--x));
  transform-style: preserve-3d;
  display: grid;
  place-items: center;
  animation: rotate-self 10s linear infinite;


}
@keyframes move-up-down-0 {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-250px);
  }
}
/* Añadir más animaciones según sea necesario para los elementos adicionales */

/* Aplicar las animaciones a los elementos específicos */
li.animate-element-0 {
  animation: move-up-down-0 30s ease-in-out infinite alternate;
}
@keyframes rotate-self {
  from {
    transform: translateY(var(--y)) rotateY(var(--r)) translateX(var(--x)) rotate(0deg);
  }
  to {
    transform: translateY(var(--y)) rotateY(var(--r)) translateX(var(--x)) rotate(360deg);
  }
}
/* li:nth-of-type(even) {
  color: hsl(153 70% 50%);
  color: hsl(calc(133 + mod(var(--hue), 40)) 50% 34%);
} */

@keyframes display-case {
  to {
    transform: rotateY(1turn);
  }
}
aside {
  position: fixed;
  z-index: -1;
  margin: auto;
  inset: 0;
  content: "";
  filter: blur(6vmin);
  height: 70vmin;
  width: 35vmin;
  transform: translateY(5vmin) translateZ(-10vmin);

}
aside div {

}
@keyframes pulse {
  to {
    opacity: 0.2;
  }
}
</style>