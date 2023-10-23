<template>
  <div>
    <div v-if="user">
      <div class="user-name">
        <h2>{{ user.name }}</h2>
        <label for="rol" class="field-label">Rol:</label>
        <span class="field-label">{{ user.rol }}</span>
        <div>
          <label for="email" class="field-label">Email:</label>
          <span class="field-label">{{ user.email }}</span>
        </div>
        <button class="edit-button" @click="toggleEditing">{{ isEditing ? 'Save' : 'Edit Profile' }}</button>
        <br>
        <img :src="randomIcon" alt="pic" class="icon" style="width: 250px; height: 250px;">
      </div>
      <div class="group">
        <div class="parameters">
          <div>
            <label for="main-job" class="field-label">Main Job:</label>
            <span v-if="isEditing"><select v-model="user.main_job" class="login-input">
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
              </select></span>
            <span v-else class="editable-value">{{ user.main_job }}</span>
          </div>
          <div>
            <label for="sub-job" class="field-label">Sub Job:</label>
            <span v-if="isEditing"><select v-model="user.sub_job" class="login-input">
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
              </select></span>
            <span v-else class="editable-value">{{ user.sub_job }}</span>
          </div>
          <div>
            <label for="sub-job-2" class="field-label">Sub Job 2:</label>
            <span v-if="isEditing"><select v-model="user.sub_job_2" class="login-input">
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
              </select></span>
            <span v-else class="editable-value">{{ user.sub_job_2 }}</span>
          </div>
          <div>
            <label for="craft" class="field-label">Craft:</label>
            <span v-if="isEditing">
              <select v-model="user.craft" class="login-input">
                <option value="Alchemy">Alchemy</option>
                <option value="Bonecraft">Bonecraft</option>
                <option value="Clothcraft">Clothcraft</option>
                <option value="Cooking">Cooking</option>
                <option value="Fishing">Fishing</option>
                <option value="Goldsmithing">Goldsmithing</option>
                <option value="Leathercraft">Leathercraft</option>
                <option value="Smithing">Smithing</option>
                <option value="Woodworking">Woodworking</option>
                <option value="Synergy" disabled>Synergy (Disabled)</option>
              </select>
              <select v-model="user.craft_level" class="login-input">
                  <option v-for="i in 100" :value="i">{{ i }}</option>
              </select>
            </span>
            <span v-else class="editable-value">{{ user.craft }}:
              <span class="editable-value">{{ user.craft_level }}</span>
            </span>
          </div>
          <div>
            <label for="sky" class="field-label">Sky:</label>
            <span class="editable-value">{{ user.sky }}</span>
          </div>
          <div>
            <label for="sea" class="field-label">Sea:</label>
            <span class="editable-value">{{ user.sea }}</span>
          </div>
          <div>
            <label for="dynamis" class="field-label">Dynamis:</label>
            <span class="editable-value">{{ user.dynamis }}</span>
          </div>
          <div>
            <div>
              <label for="event" class="field-label">Events:</label>
              <span class="editable-value">{{ user.event }}</span>
            </div>
            <label for="overall" class="field-label">Overall:</label>
            <span class="editable-value">{{ user.overall }} %</span>
          </div>
        </div>
        <div class="dkp">
          <div class="dkp2">
<!--            <img src="@/components/icons/hammer.png" alt="Ícono de dragón" class="icon">-->
            <label for="dkp" class="field-label-dkp">DKP:</label>
            <span class="field-label-dkp field-dkp">{{ user.dkp }}</span>
          </div>
        </div>
        <div class="dynamis_dkp">
          <div class="dynamis_dkp2">
            <label for="dynamis_dkp" class="field-label-dkp">DKP Dynamis:</label>
            <span class="field-label-dkp field-dkp">{{ user.dynamis_dkp }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="user-not-found">User not found.</p>
    </div>
    <div class="back-button">
      <router-link class="back-button edit-button" to="/home">Back</router-link>
    </div>
  </div>
</template>
<script setup>
import {ref, onMounted, watch} from 'vue';
import {getDatabase, ref as dbRef, get, ref as rtdbRef, set as rtdbSet} from 'firebase/database';
import {firebaseApp} from '@/router/firebaseConfig';
import icon1 from '@/components/icons/img/ffxi-pri.png';
import icon2 from '@/components/icons/img/tarugirl.png';
import icon3 from '@/components/icons/img/wormAby.png';
import icon4 from '@/components/icons/img/fafnir.png';
import icon5 from '@/components/icons/img/vtra.png';
import icon6 from '@/components/icons/img/cat.png';
import icon7 from '@/components/icons/img/odin.png';
import icon8 from '@/components/icons/img/puk.png';
import icon9 from '@/components/icons/img/bahamut.png';
const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9];
const randomIndex = Math.floor(Math.random() * icons.length);
const randomIcon = icons[randomIndex];

const userId = ref(localStorage.getItem('userId'));
const user = ref({
  name: '',
  rol: '',
  email: '',
  main_job: '',
  sub_job: '',
  sub_job_2: '',
  craft: '',
  craft_level: '',
  sky: '',
  sea: '',
  dynamis: '',
  dkp: '',
  dynamis_dkp: '',
  event: '',
  overall: '',


  // Agregar más campos editables aquí
});
const isEditing = ref(false);
const saveUserData = (userToUpdate) => {
  try {
    const editedMainJob = user.value.main_job;
    const editedSubJob = user.value.sub_job;
    const editedSubJob2 = user.value.sub_job_2;

    // Si se han realizado cambios, actualiza los campos correspondientes
    if (editedMainJob !== "" && editedMainJob !== user.value.main_job) {
      user.value.main_job = editedMainJob;
    }
    if (editedSubJob !== "" && editedSubJob !== user.value.sub_job) {
      user.value.sub_job = editedSubJob;
    }
    if (editedSubJob2 !== "" && editedSubJob2 !== user.value.sub_job_2) {
      user.value.sub_job_2 = editedSubJob2;
    }
    // Actualiza los campos del objeto user con los valores editados

    user.value.overall = userToUpdate.overall;
    user.value.event = userToUpdate.event;
    user.value.dkp = userToUpdate.dkp;
    user.value.sky = userToUpdate.sky;
    user.value.sea = userToUpdate.sea;
    user.value.dynamis = userToUpdate.dynamis;
    user.value.dynamis_dkp = userToUpdate.dynamis_dkp;
    user.value.craft = userToUpdate.craft;

    // Obtiene una referencia al nodo del usuario en Firebase Realtime Database
    const db = getDatabase(firebaseApp);
    const userRef = dbRef(db, `user/${userId.value}`);

    // Guarda los datos actualizados en Firebase Realtime Database
    rtdbSet(userRef, user.value);
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};
const searchUser = async () => {
  try {
    if (!userId.value) {
      return;
    }
    const db = getDatabase(firebaseApp);
    const userRef = dbRef(db, `user/${userId.value}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      for (const field in user.value) {
        if (userData[field] !== undefined) {
          user.value[field] = userData[field];
        }
      }
    } else {
      console.log('User does not exist.');
    }
  } catch (error) {
    console.error('Error searching for the user:', error);
  }
};

const toggleEditing = () => {
  if (isEditing.value) {
    // Si está en modo edición, guarda los datos
    saveUserData(user.value);
  }
  isEditing.value = !isEditing.value;
};

onMounted(() => {
  searchUser();
});

watch(userId, searchUser);
</script>
<style scoped>
.user-details-title {

}

.field-label {
  font-weight: bold; /* Texto en negrita */
  color: #687377; /* Color de texto plateado */
  font-size: 18px; /* Tamaño de fuente ligeramente más grande */
  margin-right: 10px; /* Agrega espacio en la parte inferior de los labels */
}

.group {
  display: flex;
}

.parameters {
  width: 30%;
}

.dkp {
  width: 33%;
}

.dynamis_dkp {
  width: 33%;
}

.user-name {
  text-align: center;
  font-weight: bold;
  color: #deecec; /* Cambiar el color del nombre del usuario */
  font-size: 38px;
}

.field-label {
  font-weight: bold; /* Texto en negrita */
  color: #95a4ab; /* Color de texto plateado */
  font-size: 18px; /* Tamaño de fuente ligeramente más grande */
  margin-right: 10px; /* Agrega espacio en la parte inferior de los labels */
}


/* Estilo adicional para valores no editables */
.editable-value {
  color: #ebf4ff; /* Color de texto plateado */
  font-weight: bold;
}

.edit-button {
  display: inline-block;
  padding: 5px 10px;
  background-color: #95a4ab;
  color: #000000;
  text-decoration: none;
  border-radius: 5px;
  margin-bottom: 5px;
  transition: background-color 0.3s, color 0.3s; /* Transiciones suaves para color de fondo y texto */
  font-weight: bold;
}

/* Cambia el color de fondo y el texto al pasar el ratón sobre el botón */
.edit-button:hover {
  background-color: #deecec;
  color: #e74c3c;
}

.back-button {
  text-align: center;
}
.field-label-dkp{
  //display: flex;
  text-align: center;
  font-weight: bold; /* Texto en negrita */
  color: #ebf4ff; /* Color de texto plateado */
  font-size: 20px; /* Tamaño de fuente ligeramente más grande */
  margin-right: 10px; /* Agrega espacio en la parte inferior de los labels */
}
.field-dkp {
  animation: glowing 1s infinite;
}

@keyframes glowing {
  0% {
    text-shadow: 0 0 5px #ff0000;
  }
    10% {
    text-shadow: 0 0 10px #ff0000;
  }
    20% {
    text-shadow: 0 0 20px #ff0000;
  }
    30% {
    text-shadow: 0 0 30px #ff0000;
  }
    40% {
    text-shadow: 0 0 40px #ff0000;
  }
      50% {
    text-shadow: 0 0 50px #ff0000;
  }
      60% {
    text-shadow: 0 0 60px #ff0000;
  }
      70% {
    text-shadow: 0 0 70px #ff0000;
  }
      840% {
    text-shadow: 0 0 80px #ff0000;
  }
      90% {
    text-shadow: 0 0 90px #ff0000;
  }
      100% {
    text-shadow: 0 0 100px #ff0000;
  }
}
</style>