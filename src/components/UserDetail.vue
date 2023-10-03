<template>
  <div class="UserDetail">
    <div class="content">
      <!-- Logo y título -->
      <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="325" height="325" />
      <h3><span class="title">{{ auth.currentUser.displayName }}</span></h3>
      <br>

      <!-- User table -->
      <table class="silver-text">
        <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Nombre</th>
          <th>Main Job</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ auth.currentUser.uid }}</td>
          <td>>{{ auth.currentUser.email }}</td>
          <td>{{ auth.currentUser.displayName }}</td>
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
console.log(auth.currentUser.email)
let user = {};

const loadUsers = async () => {
  const userRef = rtdbRef(db, 'user'); //< collecion!
  try {
    const snapshot = await rtdbGet(userRef);
    if (snapshot.exists()) {
      user = snapshot.child(auth.currentUser.uid).val();
      console.log(user)
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
  border: none;
  padding: 8px;
}

th {
  color: #2a2a2a;
  background-color: #a4a4a4;
}

/* Estilos para el texto plateado y más grueso */
.silver-text {
  color: silver;
  font-weight: bold;
}
.title{
  color: silver;
  font-size: large;
}

.logo{
  width: 50px;
  height: 50px;
}
</style>
