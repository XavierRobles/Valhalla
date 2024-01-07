<template>
  <div class="container">
    <div v-if="loading">
      Loading...
    </div>
    <div class="image-container">
      <div class="editable-label" >
        <span class="current-gil-title">Current Gil </span>
        <img src="@/components/bank/gilgold.png" alt="Gil Image" class="gil-image" width="17" height="16">
        <div v-if="userRole === 'JARL' && isEditing" class="input-wrapper">
          <input type="number" v-model="currentGil" class="input-gil" />
        </div>
        <div v-else class="gil-wrapper">
          <span class="current-gil-value">{{ formatGil(currentGil) }}</span>
          <span class="currency">G</span>
        </div>
      </div>
      <div v-if="userRole === 'JARL'">
        <button class="button-back" @click="toggleEditMode">{{ isEditing ? 'close' : 'Add Gil' }}</button>
        <div v-if="isEditing">
          <input type="number" v-model="adjustValue" placeholder="Enter value to add/subtract" class="input-gil" />
          <button class="button-back" @click="adjustGil()">Apply</button>
          <button class="button-back" @click="saveCurrentGil()">Save to Database</button>
        </div>
      </div>
    </div>
    <div class="button-container">
      <button class="button-back" @click="goBack()">Back</button>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {get as rtdbGet, getDatabase, ref as rtdbRef, set as rtdbSet} from "firebase/database";
import {firebaseApp} from "@/main";
import Pollito from "@/components/Pollito.vue";
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

const router = useRouter();

const isEditing = ref(false); // Variable para controlar si se está editando el valor

const currentGil = ref(0); // Valor editable simulado
const adjustValue = ref(0);
const loading = ref(true);
const formatGil = (amount) => {
  const formattedAmount = parseFloat(amount).toFixed(0);
  const formattedNumber = Number(formattedAmount).toLocaleString('es-ES', { minimumFractionDigits: 0 });
  return formattedNumber.replace(/\./g, ','); // Reemplazar puntos por comas
};

const saveCurrentGil= async () => {
  try {
    const user = await new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(user);
      });
    });

    if (user) {
      const lsBankRef = rtdbRef(db, `ls_bank/current_gil`);
      await rtdbSet(lsBankRef, currentGil.value);
      console.log('Current Gil saved to database successfully!');
    } else {
      console.error('User not found');
    }
    disableEditMode();
  } catch (error) {
    console.error('Error saving current Gil to database:', error);
  }
};
let userRole = ref('')
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
const adjustGil = () => {
  currentGil.value = parseInt(currentGil.value) + parseInt(adjustValue.value);
  adjustValue.value = 0; // Resetear el valor de ajuste
};
const goBack = () => {
  router.go(-1);
};

const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
};

const disableEditMode = () => {
  isEditing.value = false;
};
const loadCurrenGil = async () => {
  try {
    const user = await new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(user);
      });
    });

    if (user) {
      const lsBankRef = rtdbRef(db, `ls_bank/current_gil`);
      const snapshot = await rtdbGet(lsBankRef);

      if (snapshot.exists()) {
        currentGil.value = snapshot.val();
      } else {
        console.error('Current Gil not found in database');
      }
    } else {
      console.error('User not found');
    }

    loading.value = false;
  } catch (error) {
    console.error('Error loading current Gil from database:', error);
  }
};

onMounted(async () => {
  await loadUser();
  await loadCurrenGil();
  loading.value = false;
});


</script>

<style scoped>


.user-list li {
  margin-right: 10px; /* Espacio entre los elementos */
}

.button-back {
  /* Propiedades para centrar horizontalmente */
  margin: 20px auto; /* Margen superior e inferior de 20px y centrado horizontalmente */
  display: block; /* Convertir el botón en un bloque para aplicar márgenes y centrado */

  /* Estilos restantes del botón (los que ya están presentes) */
  cursor: pointer;
  align-items: center;
  color: #000000;
  font-weight: bold;
  padding: 5px 10px;
  background: linear-gradient(to bottom, #99a0a0, #8c9696);
  border: 1px solid #b9c0c0;
  border-bottom: 1px solid #8c9696;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background 0.2s, transform 0.2s;
}

.button-back:hover {
  background: linear-gradient(to bottom, #70332e, #70332e); /* Cambia el fondo al pasar el mouse */
  transform: translateY(-2px); /* Efecto de elevación al pasar el mouse */
}

/* Estilo cuando se pasa el mouse por encima */
.button-back:hover {
  background-color: hsl(5, 42%, 31%); /* Cambia el color de fondo cuando se pasa el mouse */
}

.current-gil-title {
  font-size: 16px;
  font-weight: bold;
}

.gil-wrapper {
  display: flex;
  justify-content: flex-end;
  font-weight: bold;

}

.current-gil-value {
  font-size: 1.0em;
  margin-right: 5px; /* Ajusta el margen derecho según sea necesario */
  /* Otros estilos según sea necesario */
}

.currency {
  font-size: 1.0em; /* Ajusta el tamaño de la G si es necesario */
  margin-right: -30px; /* Ajusta el margen entre el valor y la G */
  font-weight: bold;
}
.active-tab {
  background-color: #cc0000;
}
.button-container {
  margin-top: 100%; /* Ajusta el espacio entre el contenido y el botón "Back" */
  text-align: center; /* Centra el botón horizontalmente */
}

</style>
