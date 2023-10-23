<template>
  <div class="menu-container">
    <div class="dropdown">
      <button class="dropdown-button">☰</button>
      <div class="dropdown-content">
        <button @click="loadUser">Profile</button>
        <button @click="goToVersionHistory">Version History</button>
        <button @click="logout">Log Out</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { getDatabase, ref as rtdbRef, get as rtdbGet } from 'firebase/database';
import { firebaseApp } from "@/main";
import { onMounted } from "vue";

const router = useRouter();
const auth = getAuth();

const logout = async () => {
  try {
    await signOut(auth);
    await router.push({name: 'Login'});
    window.location.reload();
  } catch (error) {
    console.error(error.message);
  }
};
const goToProfile = async (name) => {
  try {
    await router.push({name: 'UserProfile', params: {name: name}});
  } catch (error) {
    console.error(error.message);
  }
};
const goToVersionHistory = async (name) => {
  try {
    await router.push({name: 'VersionHistory'});
  } catch (error) {
    console.error(error.message);
  }
};
const loadUser = async () => {
  const auth = getAuth();
  const db = getDatabase(firebaseApp);
  const user = await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
  const userRef = rtdbRef(db, 'user/');
  const snapshot = await rtdbGet(userRef);
  try {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      localStorage.setItem('userId', user.uid);
      await goToProfile(userData[user.uid].name);
    } else {
      console.error('User not found');
    }
  } catch (error) {
    console.error('Error loading user:', error);
  }
};
onMounted(() => {

});
</script>

<style scoped>
.menu-container {
  position: fixed;
  top: 10px; /* Ajusta la distancia desde la parte superior */
  right: 10px; /* Ajusta la distancia desde la derecha */
  width: 10%; /* Ajusta el ancho del menú */
  z-index: 1000; /* Asegura que esté por encima del contenido */
}
.dropdown {
  position: fixed;
  right: 10px;

}

.dropdown-button {
  background-color: #95a4ab;
  color: black;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  width: 100px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #95a4ab;
  min-width: 100px;
  z-index: 1;
  right: 0;
}

/* Estilos para alinear los botones horizontalmente */
.dropdown-content button,
.dropdown-content a {
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px;
  text-decoration: none;
  color: black;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: bold;
}

.dropdown-content button:hover,
.dropdown-button:hover {
  background-color: hsl(5, 42%, 31%);
  color: #000000; /* Cambia el color del texto al pasar el cursor */
}
.dropdown-content button:nth-child(1):hover {
  background-color: hsl(5, 42%, 31%); /* Cambia el color de fondo al pasar el cursor */
  color: black; /* Cambia el color del texto al pasar el cursor */
}

/* Estilos para el botón "Log Out" */
.dropdown-content button:nth-child(2):hover {
  background-color: hsl(5, 42%, 31%); /* Cambia el color de fondo al pasar el cursor */
  color: black; /* Cambia el color del texto al pasar el cursor */
}

.dropdown:hover .dropdown-content {
  display: block;
}
.button {
  font-weight: bold;
}
</style>
