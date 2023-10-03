<template>
  <div>
    <NavBar />
    <LogOut style="position: absolute; top: 10px; right: 10px;" />
    <div class="home">
      <div class="content">
        <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="325" height="325" />
        <h3><span class="title">VALHALLA</span></h3>
        <button @click="loginWithGoogle">Iniciar Sesión con Google</button>
        <br>
        <div>
          <div v-if="showFields">
            <h2>Welcome to Valhalla</h2>
            <form @submit.prevent="completeProfile">
              <label for="name">Player Name:</label>
              <input v-model="name" type="text" id="name" required><br>

              <label for="main_job">Main Job:</label>
              <input v-model="main_job" type="text" id="main_job" required><br>

              <button type="submit">Guardar Información</button>
            </form>
          </div>

          <!-- Mensaje de confirmación de inicio de sesión -->
          <div v-if="loginOk">
            <h2>Login OK</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref as rtdbRef, set as rtdbSet, get as rtdbGet } from 'firebase/database';
import { firebaseApp } from "@/main";
import { listarUsuarios } from "@/api/apiFirebase";
import { useRouter } from 'vue-router';

const showFields = ref(false);
const name = ref('');
const main_job = ref('');
const loginOk = ref(false);

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const router = useRouter();

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Verifica si el usuario existe en la base de datos
    const userRef = rtdbRef(db, 'user/' + user.uid); // Usamos el UID como el ID
    const snapshot = await rtdbGet(userRef);

    if (!snapshot.exists()) {
      // El usuario no existe, muestra los campos de nombre y trabajo
      showFields.value = true;
    } else {
      // El usuario ya existe en la base de datos
      loginOk.value = true;

      // Redirige al usuario a la página de inicio automáticamente
      await router.push({ name: 'Home' });
    }
  } catch (error) {
    console.error(error.message);
  }
};

const completeProfile = async () => {
  try {
    // Obtiene el usuario actualmente autenticado
    const user = auth.currentUser;

    if (user) {
      // Guarda los datos en Firebase Realtime Database con el UID como el ID
      const userRef = rtdbRef(db, 'user/' + user.uid);
      const data = {
        email: user.email,
        nombre: name.value,
        main_job: main_job.value
      };
      await rtdbSet(userRef, data);

      // Limpia los campos y establece el estado de login
      name.value = '';
      main_job.value = '';
      showFields.value = false;
      loginOk.value = true;

      // Redirige al usuario a la página de inicio automáticamente
      await router.push({ name: 'Home' });
    }
  } catch (error) {
    console.error(error.message);
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-height: 100vh;
  color: #D9E7E7;
}
.title {
  font-size: 80px;
}

.content {
  text-align: center;
}


</style>
