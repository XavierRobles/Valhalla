<template>
  <div class="sea-limbus-tabs">

    <div class="tab-links">
      <a
          :class="{ 'active-tab': activeTab === 'sea' }"
          @click="activeTab = 'sea'"
          class="tab-button"
      >
        Sea
      </a>
      <a
          :class="{ 'active-tab': activeTab === 'limbus' }"
          @click="activeTab = 'limbus'"
          class="tab-button"
      >
        Limbus
      </a>
    </div>
    <br>
    <br>
    <div class="tab-content">
      <div v-if="activeTab === 'sea'">
        <Sea></Sea>
      </div>
      <div v-if="activeTab === 'limbus'">
        <Limbus></Limbus>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Sea from "@/components/Sea.vue";
import Limbus from "@/components/Limbus.vue";

const activeTab = ref('sea');

</script>
<style>
.sea-limbus-tabs {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tab-links {
  display: flex;
  justify-content: center;
  background-color: #333;
  padding: 10px 0;
  border-radius: 10px;
}
.tab-links a {
  padding: 10px 20px;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.3s;
}
.tab-button {
  padding: 10px 20px;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.3s;
  border: 1px solid #555;
  border-radius: 10px;
  margin: 5px;
}

.tab-links a:hover {
  background-color: #555;
}

.tab-links .active-tab {
  background-color: #cc0000;
}

.tab-content {

}
</style>
