<template>
  <div class="container">
    <div class="content-title">
      <h3><span class="title">Members of Valhalla</span></h3>
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else class="container-users">
      <div class="icon-container">
        <img :src="randomIcon" alt="pic" class="icon">
      </div>
      <div class="online-characters">
        <h2>Online characters:</h2>
        <div v-for="char in onlineCharacters" :key="char.charname" class="character-item">
          <span class="online-dot"></span>
          <span :class="{'blue-text': char.jobString === '? / ?', 'black-text': char.jobString !== '? / ?'}">
            {{ char.charname }}
            </span>
          <span class="seacom">&nbsp;&nbsp;→ &nbsp;Job:&nbsp;
          {{ char.jobString === '? / ?' ? 'Hidden ' : char.jobString }}
          </span>
          <template v-if="char.seacom_message !== null && char.seacom_message !== undefined">
            &nbsp;&nbsp;→ &nbsp;
            <span class="seacom">Seacom: </span><span v-html="highlightSpecialCharacters(char.seacom_message)"></span>
          </template>
        </div>
      </div>
      <div class="offline-characters">
        <h2>Offline characters:</h2>
        <div v-for="user in offlineUsers" :key="user.id" class="character-item">
          <span v-if="!user.isOnline" class="offline-dot"></span>{{ user.name }}
        </div>
        <p v-if="offlineUsers.length === 0">There are no offline users.</p>
      </div>
    </div>
    <button class="button" @click="goBack()">Back</button>
  </div>
</template>
<script setup>
import {computed, onMounted, reactive, ref} from 'vue';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {get as rtdbGet, getDatabase, ref as rtdbRef} from 'firebase/database';
import {firebaseApp} from '@/main';
import {useRouter} from 'vue-router';
import icon1 from '@/components/icons/img/img_member/Behemoth.webp';
import icon2 from '@/components/icons/img/img_member/DFF2015.webp';
import icon3 from '@/components/icons/img/img_member/DRG_Wyvern.webp';
import icon4 from '@/components/icons/img/img_member/Odin.webp';
import icon5 from '@/components/icons/img/img_member/Shinryu_29.webp';
import icon6 from '@/components/icons/img/img_member/WoFF_Odin.webp';
import icon7 from '@/components/icons/img/img_member/Wyvern.webp';

const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7];
const randomIndex = Math.floor(Math.random() * icons.length);
const randomIcon = icons[randomIndex];
const loading = ref(true);
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const router = useRouter();
let userRole = ref('')

const users = ref([]);

let filteredCharacters = reactive([]);
// Define una referencia reactiva para los personajes de la API
const apiCharacters = reactive({
  total: 0,
  chars: []
});
const onlineCharacters = computed(() => filteredCharacters.filter(char => char.isOnline));
const offlineUsers = computed(() => users.value.filter(user => !filteredCharacters.some(char => char.charname === user.name)));

// Función para obtener los datos de la API y filtrarlos
const fetchAndFilterCharacters = async () => {
  try {
    const response = await fetch('https://api.horizonxi.com/api/v1/chars');
    if (response.ok) {
      const data = await response.json();
      apiCharacters.total = data.total;
      apiCharacters.chars = data.chars;

      // Obtener los nombres de los personajes presentes en tu base de datos local
      const characterNamesInDatabase = users.value.map(user => user.name);

      // Filtrar y mapear los personajes de la API que coinciden con los de tu base de datos local
      filteredCharacters = apiCharacters.chars.filter(apiChar => {
        return characterNamesInDatabase.includes(apiChar.charname);
      }).map(filteredChar => {
        const matchingUser = users.value.find(user => user.name === filteredChar.charname);
        return {
          ...filteredChar,
          seacom_messages: matchingUser ? matchingUser.seacom_messages || null : null,
          jobString: filteredChar.jobString || null
        };
      });

    } else {
      console.error('Error al obtener datos de la API');
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
  }
};


const loadUsers = async () => {
  const userRef = rtdbRef(db, 'user');
  try {
    const snapshot = await rtdbGet(userRef);
    if (snapshot.exists()) {
      users.value = Object.keys(snapshot.val()).map((userId) => ({
        id: userId,
        ...snapshot.val()[userId],
      }));
    }
    await fetchAndFilterCharacters();
    loading.value = false;
  } catch (error) {
    console.error(error.message);
  }
};
const loadUser = async () => {
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
      userRole = userData[user.uid].rol
    } else {
      console.error('User not found');
    }
  } catch (error) {
    console.error('Error loading user:', error);
  }
};

function highlightSpecialCharacters(text) {
  const regex = /«(.*?)»/g;
  return text.replace(regex, '<span style="color: green;">❪</span><span>$1</span><span style="color: red;">❫</span>');
}
const goBack = () => {
  router.go(-1); // Retrocede un paso en el historial del router (-1)
};

onMounted(async () => {
  await loadUser();
  await loadUsers();
});
</script>

<style scoped>
.container {
  margin: 0px 50px  0px 100px; /* Centrar el contenedor horizontalmente */
  padding: 0 10px; /* Reducir el espacio de los márgenes laterales */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-items: center;

}
.icon-container {
  position: absolute;
  top: 100px; /* Ajusta el valor para mover la imagen más arriba */
  left: 50%;
  transform: translateX(-50%);
  z-index: 1; /* Asegura que la imagen esté por encima */
}
.content-title {
  text-align: center;
  width: 100%; /* Ajusta el ancho según tus necesidades */
}

.title {
  font-size: 40px;
  color: #0026ff;
  font-weight: bold;
}

.container-users {
  display: flex;
}

/* Estilos para la columna de personajes en línea */
.online-characters {
  flex: 8; /* 70% del espacio disponible */
  margin-top: 250px;
}

.offline-characters {
  margin-top: 250px;
  flex: 2; /* 30% del espacio disponible */
}

/* Estilos para el contenedor de personajes */
.character-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px; /* Espacio entre cada personaje */
  font-weight: bold;
}

/* Estilos para la bolita de usuarios fuera de línea */
.offline-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: red; /* Cambia el color a rojo */
  margin-right: 5px;
}

/* Estilos para la bolita de usuarios en línea */
.online-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: green;
  margin-right: 5px;
}

.seacom {
  font-weight: bold;
}

.blue-text {
  color: #2d88e5;
  font-weight: bold;
}

.black-text {
  color: #ffffff;
  font-weight: bold;
}


.icon {
  width: 300px; /* Ancho deseado para las imágenes */
  height: 300px; /* Altura deseada para las imágenes */
  object-fit: contain;
}
.button {
  /* Propiedades para centrar horizontalmente */
  margin: 20px auto; /* Margen superior e inferior de 20px y centrado horizontalmente */
  display: block; /* Convertir el botón en un bloque para aplicar márgenes y centrado */

  /* Estilos restantes del botón (los que ya están presentes) */
  cursor: pointer;
  align-items: center;
  color: #000000;
  font-weight: bold;
  padding: 5px;
  background: linear-gradient(to bottom, #99a0a0, #8c9696);
  border: 1px solid #b9c0c0;
  border-bottom: 1px solid #8c9696;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background 0.2s, transform 0.2s;
  width: 100px;
}

.button:hover {
  background: linear-gradient(to bottom, #70332e, #70332e); /* Cambia el fondo al pasar el mouse */
  transform: translateY(-2px); /* Efecto de elevación al pasar el mouse */
}

/* Estilo cuando se pasa el mouse por encima */
.button:hover {
  background-color: hsl(5, 42%, 31%); /* Cambia el color de fondo cuando se pasa el mouse */
}
</style>