<template>
  <div class="content">
    <div class="centered-content">
      <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="325" height="325" />
      <h3><span class="title">VALHALLA</span></h3>

      <div v-if="editing" class="edit-mode">
        <div class="text-area-container">
          <textarea v-model="rules" class="editable-textarea resizable" ref="rulesTextarea"></textarea>
        </div>
        <div class="text-area-container">
          <textarea v-model="skyRules" class="editable-textarea resizable" ref="skyRulesTextarea"></textarea>
        </div>
        <div class="text-area-container">
          <textarea v-model="seaRules" class="editable-textarea resizable" ref="seaRulesTextarea"></textarea>
        </div>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" class="button-edit" @click="saveRules">Save</button>
      </div>
      <div v-else class="label-mode">
        <div class="large-text" v-html="rules"></div>
        <br>
        <div class="large-text" v-html="skyRules"></div>
        <br>
        <div class="large-text" v-html="seaRules"></div>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" class="button-edit" @click="startEditing">Edit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { get as rtdbGet, getDatabase, ref as rtdbRef, set as rtdbSet } from "firebase/database";
import { firebaseApp } from "@/main";
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

let userRole = ref('');
const editing = ref(false);
let rules = ref('');
let skyRules = ref('');
let seaRules = ref('');
const dataLoaded = ref(false);

const startEditing = () => {
  editing.value = true;
};

const saveRules = () => {
  editing.value = false;
  saveRulesToDatabase(rules.value, skyRules.value, seaRules.value);
};
const saveRulesToDatabase = (rulesText, skyRulesText, seaRulesText) => {
  const rulesRef = rtdbRef(db, 'rules');

  const data = {
    rules: rulesText,
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
  const rulesRef = rtdbRef(db, 'rules');

  const snapshot = await rtdbGet(rulesRef);
  try {
    if (snapshot.exists()) {
      const rulesData = snapshot.val();
      rules.value = rulesData.rules;
      skyRules.value = rulesData.skyRules;
      seaRules.value = rulesData.seaRules;
    } else {
      console.error('Rules not found');
    }
  } catch (error) {
    console.error('Error loading rules:', error);
  }
};

onMounted(async () => {
  await loadUser();
  await loadRules();
});
</script>

<style scoped>
.centered-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
}

.resizable {
  min-height: 200px;
  min-width: 800px;
}

.label-mode {
  text-align: center;
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
</style>
