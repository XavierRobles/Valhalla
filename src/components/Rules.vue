<template>
  <div class="content-title">
    <div class="centered-content">
      <div class="centered-text">
        <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="325" height="325"/>
        <h3><span class="title">VALHALLA II</span></h3>
      </div>

      <div v-if="editing" class="edit-mode">
        <div class="text-area-container">
          <textarea v-model="rules_valhalla" class="editable-textarea resizable" ref="rulesTextarea"></textarea>
        </div>
        <div class="text-area-container">
          <textarea v-model="skyRules" class="editable-textarea resizable" ref="skyRulesTextarea"></textarea>
        </div>
        <div class="text-area-container">
          <textarea v-model="seaRules" class="editable-textarea resizable" ref="seaRulesTextarea"></textarea>
        </div>
        <div>
          <button v-if="userRole === 'JARL' || userRole === 'EARL'" class="button-edit" @click="saveRules">Save</button>
          <button class="button-edit" @click="cancelEditing">Cancel</button>
        </div>
      </div>
      <div v-else class="label-mode">
        <div class="large-text" v-html="rules_valhalla"></div>
        <br>
        <div class="large-text" v-html="skyRules"></div>
        <br>
        <div class="large-text" v-html="seaRules"></div>
        <div class="edit-mode">
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" class="button-edit" @click="startEditing">Edit
        </button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div>
      <button class="button-back" @click="goBack()">Back</button>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {get as rtdbGet, getDatabase, ref as rtdbRef, set as rtdbSet} from "firebase/database";
import {firebaseApp} from "@/main";

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

let userRole = ref('');
const editing = ref(false);
let rules_valhalla = ref('');
let skyRules = ref('');
let seaRules = ref('');
const dataLoaded = ref(false);

const startEditing = () => {
  editing.value = true;
};

const saveRules = () => {
  editing.value = false;
  saveRulesToDatabase(rules_valhalla.value, skyRules.value, seaRules.value);
};
const saveRulesToDatabase = (rulesText, skyRulesText, seaRulesText) => {
  const rulesRef = rtdbRef(db, 'rules_ls/');

  const data = {
    rules_valhalla: rulesText,
    skyRules: skyRulesText,
    seaRules: seaRulesText,
  };

  rtdbSet(rulesRef, data)
      .then(() => {
      })
      .catch((error) => {
        console.error('Error al guardar las reglas:', error);
      });
};
const cancelEditing = () => {
  editing.value = false;
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
      userRole.value = userData[user.uid].rol;
      dataLoaded.value = true;
    } else {
      console.error('User not found');
    }
  } catch (error) {
    console.error('Error loading user:', error);
  }
};
const loadRules = async () => {
  const rulesRef = rtdbRef(db, 'rules_ls/');

  const snapshot = await rtdbGet(rulesRef);
  try {
    if (snapshot.exists()) {
      const rulesData = snapshot.val();
      rules_valhalla.value = rulesData.rules_valhalla;
      skyRules.value = rulesData.skyRules;
      seaRules.value = rulesData.seaRules;
    } else {
      console.error('Rules not found');
    }
  } catch (error) {
    console.error('Error loading rules:', error);
  }
};
import {useRouter} from 'vue-router';

const router = useRouter();
const goBack = () => {
  router.go(-1); // Retrocede un paso en el historial del router (-1)
};

onMounted(async () => {
  await loadUser();
  await loadRules();
});
</script>

<style scoped>
.content-title {
  text-align: left; /* Alinea el contenido a la izquierda */
  margin: 0 200px;
}

.centered-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.centered-text {
  text-align: center; /* Centra el texto e imagen */
}

.edit-mode {
  text-align: center;
  margin-top: 10px;
}

.editable-textarea {
  border: 1px solid #ccc;
  padding: 5px;
  width: 100%;
  min-height: 100px;
  resize: both;
  overflow: auto;
  font-size: 16px;
  background-color: #979d9b;
}

.resizable {
  min-height: 200px;
  min-width: 800px;
}

.label-mode {
  text-align: left;
  margin-top: 10px;
}

.large-text {
  font-size: 18px;
  word-wrap: break-word;
  margin-bottom: 20px;
}

.text-area-container {
  margin-bottom: 20px;
}

.text-area-container button {
  margin-top: 5px;
  cursor: pointer;
}

.button-edit {
  display: inline-block;
  padding: 5px 10px;
  background-color: #95a4ab;
  color: #000000;
  text-decoration: none;
  border-radius: 5px;
  margin-bottom: 5px;
  transition: background-color 0.3s, color 0.3s;
  font-weight: bold;
}

.button-edit:hover {
  background-color: #687377;
  color: #e74c3c;
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
</style>
