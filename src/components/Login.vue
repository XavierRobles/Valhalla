<template>
  <div>
    <NavBar/>
    <div class="login">
      <div class="content-title">
        <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="300" height="300"/>
        <div v-if="!showFields" class="collapsed">
          <h3><span class="title">VALHALLA II</span></h3>
          <br>
          <br>
          <button @click="loginWithGoogle" v-if="!showFields" class="google-login-button">
            <img class="google-logo" src="@/components/icons/logoGoogleLogin.svg" alt="Google Logo"/>
            Sign in with Google
          </button>
          <br>
        </div>
        <div v-if="showFields">
          <h2>Welcome to Valhalla</h2>
          <form @submit.prevent="completeProfile">
            <div class="form-group">
              <label for="name">Player name in game:</label>
              <input v-model="name" type="text" id="name" required class="login-input">
            </div>
            <div>
              <div v-if="showingNotification" class="notification">
                ¡The name is already in use!
              </div>
            </div>
            <div class="form-group">
              <label for="main_job">Main Job:</label>
              <select v-model="main_job" class="login-input">
                <option value="Warrior">Warrior</option>
                <option value="Monk">Monk</option>
                <option value="White Mage">White Mage</option>
                <option value="Black Mage">Black Mage</option>
                <option value="Red Mage">Red Mage</option>
                <option value="Thief">Thief</option>
                <option value="Paladin">Paladin</option>
                <option value="Dark Knight">Dark Knight</option>
                <option value="Beastmaster">Beastmaster</option>
                <option value="Bard">Bard</option>
                <option value="Ranger">Ranger</option>
                <option value="Samurai">Samurai</option>
                <option value="Ninja">Ninja</option>
                <option value="Dragoon">Dragoon</option>
                <option value="Summoner">Summoner</option>
                <option value="Blue Mage" disabled>Blue Mage (Disabled)</option>
                <option value="Corsair" disabled>Corsair (Disabled)</option>
                <option value="Puppetmaster" disabled>Puppetmaster (Disabled)</option>
                <option value="Dancer" disabled>Dancer (Disabled)</option>
                <option value="Scholar" disabled>Scholar (Disabled)</option>
              </select>
            </div>

            <button type="submit">Save Information</button>
          </form>
        </div>
      </div>
    </div>
    <a href="https://www.square-enix-games.com/es_ES/home">
      <img class="logo-square" src="@/components/icons/Square_Enix_logo.png" alt="Valhalla ls"/>
    </a>
    <a href="http://www.playonline.com/">
    <img class="logo-ffxi" src="@/components/icons/ffxi.png" alt="Valhalla ls"/>
    </a>
    <a href="https://horizonxi.com/">
    <img class="logo-horizon" src="@/components/icons/horizonxi.png" alt="Valhalla ls"/>
    </a>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth';
import {getDatabase, ref as rtdbRef, set as rtdbSet, get as rtdbGet} from 'firebase/database';
import {firebaseApp} from "@/main";
import {useRouter} from 'vue-router';


const showFields = ref(false);
const name = ref('');
const main_job = ref('');

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const router = useRouter();

const showingNotification = ref(false);

const showNotification = () => {
  showingNotification.value = true;
  setTimeout(() => {
    showingNotification.value = false;
  }, 3000);
};
const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = rtdbRef(db, 'user/' + user.uid);
    const snapshot = await rtdbGet(userRef);

    if (!snapshot.exists()) {
      showFields.value = true;
    } else {
      await router.push({name: 'Home'});
    }
  } catch (error) {
    console.error(error.message);
  }
};

const completeProfile = async () => {
  try {
    const user = auth.currentUser;

    if (user) {
      const usernameExists = await checkIfUsernameExists(name.value);

      if (usernameExists) {

        showNotification()
        return;
      }

      const userRef = rtdbRef(db, 'user/' + user.uid);
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
      const data = {
        email: user.email,
        name: name.value,
        main_job: main_job.value,
        sub_job: '',
        sub_job_2: '',
        dkp: 0,
        craft: '-',
        craft_level: 0,
        event: 0,
        overall: 0,
        sky: 0,
        sea: 0,
        dynamis: 0,
        total: 0,
        dynamis_dkp: 0,
        rol: 'KARL',
        event_date: formattedDate,
        register_date: formattedDate,
        inventory: {}
      };
      await rtdbSet(userRef, data);
      name.value = '';
      main_job.value = '';
      showFields.value = false;

      await router.push({name: 'Home'});
    }
  } catch (error) {
    console.error(error.message);
  }
};

const checkIfUsernameExists = async (username) => {
  const usersRef = rtdbRef(db, 'user');
  const snapshot = await rtdbGet(usersRef);
  if (snapshot.exists()) {
    const users = snapshot.val();
    return Object.values(users).some(user => user.name.toLowerCase() === username.toLowerCase());
  }
  showNotification()
  return false;
};
onMounted(() => {
  signOut(auth);
  router.push({name: 'Login'});
});
</script>

<style scoped>
.login {
  color: #D9E7E7;
  align-items: center;
}

.content-title {
  text-align: center;
}

.title {
  font-size: 70px;
}

.form-group {
  display: flex;
  align-items: center; /* Centra verticalmente el contenido de cada fila */
  margin-bottom: 5px; /* Espacio entre filas */
}

.form-group label {
  flex-basis: 50%; /* Ancho fijo para las etiquetas */
  margin-right: 10px; /* Espacio entre etiquetas y campos de entrada */
  text-align: right; /* Alinea las etiquetas a la derecha */
}

.notification {
  background-color: #ff0000;
  color: white;
  padding: 5px;
  border-radius: 4px;
  display: inline-block;
  font-size: 12px;
}

.login-input {
  width: 100px; /* Ancho uniforme para todos los campos de entrada */
  background-color: #333; /* Fondo negro/gris */
  color: white; /* Texto blanco */
  border: none; /* Sin bordes */
  padding: 4px; /* Espaciado interno */
  border-radius: 4px; /* Bordes redondeados */
}
.google-login-button {
  //display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  color: #fefefe;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s;
}

.google-login-button:hover {
  background-color: hsl(5, 42%, 31%);
  color: #fff;
  //border: 1px solid #4285f4;
}

/* Estilos para el logotipo de Google */
.google-logo {
  margin-right: 30px;
}

.logo-square,
.logo-ffxi,
.logo-horizon {
  max-width: 15%;
  height: auto;
}

.logo-square {
  position: absolute;
  bottom: 10px;
  right: 80px;
}

.logo-ffxi {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.logo-horizon {
  position: absolute;
  bottom: 10px;
  left: 80px;
}



</style>
