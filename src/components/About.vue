<template>
  <div class="greetings">
    <img src="@/assets/valhalla.png" alt="Fondo de Valhalla" />
    <br />
    <button class="button-back" @click="goBack()">Back</button>

    <div class="section">
      <h2 class="section-title">Leadership</h2>
      <p class="info">
        <span class="label">Leader:</span> <span class="value">Waky</span>
      </p>
      <p class="info">
        <span class="label">Officers:</span> <span class="value">Shirro, Sleepygirl, Duraan</span>
      </p>
      <p class="info">
        <span class="label">Public Relations:</span> <span class="value">Pauwilla</span>
      </p>
    </div>

    <div class="section">
      <h2 class="section-title">Development and Testing</h2>
      <p class="info">
        <span class="label">Developers:</span> <span class="value developer-name">Waky, Jballes</span>
      </p>
      <p class="info">
        <span class="label">Tester:</span> <span class="value tester-name">Pauwilla</span>
      </p>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1); // Retrocede un paso en el historial del router (-1)
};
</script>

<style scoped>
.button-back {
    /* Propiedades para centrar horizontalmente */
    margin: 20px auto; /* Margen superior e inferior de 20px y centrado horizontalmente */
    display: block; /* Convertir el botón en un bloque para aplicar márgenes y centrado */

    /* Estilos restantes del botón (los que ya están presentes) */
    cursor: pointer;
    align-items: center;
    color: #000000;
    font-weight: bold;
    padding: 7px 15px;
    background: linear-gradient(to bottom, #99a0a0, #8c9696);
    border: 1px solid #b9c0c0;
    border-bottom: 1px solid #8c9696;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: background 0.2s, transform 0.2s;
  }
  .button-back:hover {
    background: linear-gradient(to bottom, #70332e, #70332e); /* Cambia el fondo al pasar el mouse */
    transform: translateY(-2px); /* Efecto de elevación al pasar el mouse */
  }

  /* Estilo cuando se pasa el mouse por encima */
  .button-back:hover {
    background-color: hsl(5, 42%, 31%); /* Cambia el color de fondo cuando se pasa el mouse */
  }

.back:hover {
  background-color: #687377;
  color: #e74c3c;
}

.greetings {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
}

.section {
  margin-top: 20px;
}

.section-title {
  font-size: 24px;
  color: #e74c3c;
  margin-bottom: 10px;
}

.info {
  color: white;
  text-align: center;
  font-size: 16px;
  margin-bottom: 8px;
}

.label {
  font-weight: bold;
  color: #e74c3c;
  margin-right: 5px;
}

.value {
  font-weight: bold;
  color: #ffffff;
}

.developer-name {
  color: #4caf50; /* Cambiado a verde (#4caf50) */
}

.tester-name {
  color: #933fd7;
}
</style>
