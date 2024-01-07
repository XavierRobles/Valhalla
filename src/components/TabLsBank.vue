<template>
  <div class="ls-bank-tab">
    <img alt="Vue logo" class="logo" src="@/components/bank/logogold.png" width="150" height="200" />
    <br>

    <div class="tab-links-Bank">
      <a
          :class="{ 'active-tab': activeTab === 'bank' }"
          @click="activeTab = 'bank'"
          class="tab-button"
      >
        Bank
      </a>
      <a
          :class="{ 'active-tab': activeTab === 'dynamis' }"
          @click="activeTab = 'dynamis'"
          class="tab-button"
      >
        Dynamis
      </a>
    </div>
    <br>
    <br>
    <div class="tab-content">
      <div v-if="activeTab === 'bank'">
        <LsBank></LsBank>
      </div>
      <div v-if="activeTab === 'dynamis'">
        <Dynamis></Dynamis>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import LsBank from "@/components/LsBank.vue";
import Dynamis from "@/components/Dynamis.vue";

const activeTab = ref('bank');

</script>
<style>
.ls-bank-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tab-links-Bank {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  border-radius: 10px;
}
.tab-links-Bank a {
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

.tab-links-Bank a:hover {
  background-color: #555;
}

.tab-links-Bank .active-tab {
  background-color: #cc0000;
}

.tab-content {

}
</style>
