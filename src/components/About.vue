<template>
  <div class="greetings">
    <img src="@/assets/valhalla.png" alt="Fondo de Valhalla" />
    <br />
    <router-link class="back" to="/home">Back</router-link>

    <div class="section">
      <h2 class="section-title">Leadership</h2>
      <p class="info">
        <span class="label">Leaders:</span> <span class="value">Evileye, Honzo</span>
      </p>
      <p class="info">
        <span class="label">Coliders:</span> <span class="value">Waky, Shirro, Sleepygirl, Chevalfou</span>
      </p>
      <p class="info">
        <span class="label">Officials:</span> <span class="value">Capoute, Duraan, Odinpr</span>
      </p>
      <p class="info">
        <span class="label">Community Support:</span> <span class="value">Isthar</span>
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

<style scoped>
.back {
  display: inline-block;
  padding: 10px 20px;
  background-color: #95a4ab;
  color: #000000;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 10px;
  transition: background-color 0.3s, color 0.3s;
  font-weight: bold;
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
