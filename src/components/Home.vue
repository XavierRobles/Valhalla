<template>
  <div class="home">
    <div class="content">
      <!-- Logo y título -->
      <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="325" height="325" />
      <h3><span class="title">VALHALLA</span></h3>
      <br>

      <!-- User table -->
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Nombre</th>
          <th>Main Job</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.nombre }}</td>
          <td>{{ user.main_job }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref as rtdbRef, get as rtdbGet } from 'firebase/database';
import { firebaseApp } from '@/main';
import { useRouter } from 'vue-router';

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const router = useRouter();

const users = ref([]);

const loadUsers = async () => {
  const userRef = rtdbRef(db, 'user'); //< collecion!
  try {
    const snapshot = await rtdbGet(userRef);
    if (snapshot.exists()) {
      const userList = Object.keys(snapshot.val()).map((userId) => ({
        id: userId,
        ...snapshot.val()[userId],
      }));
      users.value = userList;
    }
  } catch (error) {
    console.error(error.message);
  }
};

onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
/* Estilos para la tabla */
table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid #ccc;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

/* Estilos para el texto plateado y más grueso */
.silver-text {
  color: silver;
  font-weight: bold;
}
</style>
