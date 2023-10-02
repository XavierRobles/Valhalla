<template>
  <button class="logout-button" @click="logout">Log Out</button>
</template>

<script setup>
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = getAuth();

const logout = async () => {
  try {
    await signOut(auth);
    router.push({ name: 'Login' });
  } catch (error) {
    console.error(error.message);
  }
};
</script>

<style scoped>
.logout-button {
  background-color: silver;
  color: black;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 12px;
}
.logout-button {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: silver;
  color: black;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 12px;
  z-index: 999;
}

.logout-button:hover {
  background-color: #dcdcdc;
}
</style>
