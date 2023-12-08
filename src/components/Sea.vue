<template>
  <div class="content-title">
    <div class="centered-content">
      <h3><span class="title">SEA</span></h3>
    </div>
  </div>

  <!--  ######################################################Inventory#############################################-->
  <div v-if="userRole === 'JARL' || userRole === 'EARL'">
    <div class="left-half">
      <div class="accordion-title" @click="userToggleAccordionInventory">
        <span class="button">User Inventory</span>
        <i class="fas" :class="isOpenUserListInventory ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
      </div>
      <div v-show="isOpenUserListInventory" class="setting-values">
        <div class="user-list">
          <div class="user" v-for="user in users" :key="user.id">
            <h2 v-if="shouldShowUser(user)">{{ user.name }}</h2>
            <ul v-if="shouldShowUser(user)">
              <li v-for="(value, key) in filteredSeaInventory(user.inventory.sea)" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  ######################################################User list Checkbox#####################################-->
  <div class="content-title" v-if="userRole === 'JARL' || userRole === 'EARL'">
    <div class="left-half">
      <div class="accordion-title" @click="userToggleAccordion">
        <span class="button">User List</span>
        <i class="fas" :class="isOpenUserList ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
      </div>
      <div v-show="isOpenUserList" class="setting-values">
        <ul class="user-list">
          <li v-for="user in sortedUsers" :key="user.id">
            <input type="checkbox" v-model="selectedUsers" :value="user.id" @change="updateSelectedUsersDKP"/>
            {{ user.name }}
          </li>
        </ul>
      </div>
    </div>
    <label class="userCounter" v-if="selectedUsers.length > 0">Total members selected: {{ selectedUsers.length }}</label>
    <br>
    <button class="button" v-if="selectedUsers.length > 0" @click="clearSelection">Clear</button>
    <br>
  </div>
  <!--  ######################################################Gem######################################################-->
  <div class="gods">
    <div class="container-stone">
      <!-- HQPhuabo y DeedOfPlacidity -->
      <div class="stuff-image">
        <img src="@/components/sea/HQPhuabo.webp" alt="img-HQPhuabo" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForSeaItem('HQ_Phuabo_Organ') }}&nbsp;&nbsp;&nbsp</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('HQ_Phuabo_Organ')" class="button">-</button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('HQ_Phuabo_Organ')" class="button">+</button>
        <img src="@/components/sea/DeedOfPlacidity.webp" alt="img-Deed_Of_Placidityh" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForSeaItem('Deed_Of_Placidity') }}&nbsp;&nbsp;&nbsp</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Deed_Of_Placidity')" class="button">-</button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Deed_Of_Placidity')" class="button">+</button>
      </div>
      <!-- HQXzomitOrgan y Deed_of_Moderation -->
      <div class="stuff-image">
        <img src="@/components/sea/HQXzomitOrgan.webp" alt="img-HQ_Xzomit_Organ" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForSeaItem('HQ_Xzomit_Organ') }}&nbsp;&nbsp;&nbsp</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('HQ_Xzomit_Organ')" class="button">-</button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('HQ_Xzomit_Organ')" class="button">+</button>
        <img src="@/components/sea/Deed_of_Moderation.webp" alt="img-Deed_of_Moderation" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForSeaItem('Deed_of_Moderation') }}&nbsp;&nbsp;&nbsp</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Deed_of_Moderation')" class="button">-</button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Deed_of_Moderation')" class="button">+</button>
      </div>

      <!-- HQHpemdeOrgan y Deed_of_Sensibility -->
      <div class="stuff-image">
        <img src="@/components/sea/HQHpemdeOrgan.webp" alt="img-HQHpemdeOrgan" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForSeaItem('HQ_Hpemde_Organ') }}&nbsp;&nbsp;&nbsp</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('HQ_Hpemde_Organ')" class="button">-</button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('HQ_Hpemde_Organ')" class="button">+</button>
        <img src="@/components/sea/Deed_of_Sensibility.webp" alt="img-Deed_of_Sensibility" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForSeaItem('Deed_of_Sensibility') }}&nbsp;&nbsp;&nbsp</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Deed_of_Sensibility')" class="button">-</button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Deed_of_Sensibility')" class="button">+</button>
      </div>

    </div>
    <!--  ######################################################Seal#################################################-->
    <div class="container-seals">
      <div class="stuff-image">
        <!-- First_Virtue -->
        <div class="stuff-image-virtue">
          <img src="@/components/sea/First_Virtue.webp" alt="img-First_Virtue" class="img-sea"/>
          <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForSeaItem('First_Virtue') }}&nbsp;&nbsp;&nbsp</label>
          <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('First_Virtue')" class="button">-</button>
          <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('First_Virtue')" class="button">+</button>
        </div>

        <!-- SecondVirtue -->
        <div class="stuff-image-virtue">
          <img src="@/components/sea/SecondVirtue.webp" alt="img-Second_Virtue" class="img-sea"/>
          <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForSeaItem('Second_Virtue') }}&nbsp;&nbsp;&nbsp</label>
          <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Second_Virtue')" class="button">-</button>
          <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Second_Virtue')" class="button">+</button>
        </div>

        <!-- Third_Virtue -->
        <div class="stuff-image-virtue">
          <img src="@/components/sea/Third_Virtue.webp" alt="img-Third_Virtue" class="img-sea"/>
          <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForSeaItem('Third_Virtue') }}&nbsp;&nbsp;&nbsp</label>
          <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Third_Virtue')" class="button">-</button>
          <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Third_Virtue')" class="button">+</button>
        </div>

      </div>
    </div>
  </div>
  <!--  ##############################################Set complet####################################################-->
  <div class="gods-set">
    <div class="container-gods-set">
      <!-- Jailer of Hope -->
      <div class="stuff-image">
        <img src="@/components/sea/hope.webp" alt="img-hope" class="img-godSet"/>
        <br>
        <label class="label-total">
          Jailer of Hope:
          <span>{{ calculateHopeValue() }}</span>
        </label>
      </div>

      <!-- Jailer of Justice -->
      <div class="stuff-image">
        <img src="@/components/sea/justice.webp" alt="img-justice" class="img-godSet"/>
        <br>
        <label class="label-total">
          Jailer of Justice:
          <span>{{ calculateJusticeValue() }}</span>
        </label>
      </div>

      <!-- Jailer of Prudence -->
      <div class="stuff-image">
        <img src="@/components/sea/prudence.webp" alt="img-prudence" class="img-godSet-stone"/>
        <br>
        <label class="label-total">
          Jailer of Prudence:
          <span>{{ calculatePrudenceValue() }}</span>
        </label>
      </div>
    </div>
  </div>


  <!-- Fourth_Virtue, Fifth_Virtue, Sixth_Virtue -->
  <div class="container-stuff-lastStones">
  <div class="stuff-image">
    <img src="@/components/sea/Fourth_Virtue.webp" alt="img-Fourth_Virtue" class="img-sea"/>
    <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForSeaItem('Fourth_Virtue') }}&nbsp;&nbsp;&nbsp</label>
    <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Fourth_Virtue')" class="button">-</button>
    <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Fourth_Virtue')" class="button">+</button>
    <img src="@/components/sea/FifthVirtue.webp" alt="img-FifthVirtue" class="img-sea"/>
    <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForSeaItem('Fifth_Virtue') }}&nbsp;&nbsp;&nbsp</label>
    <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Fifth_Virtue')" class="button">-</button>
    <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Fifth_Virtue')" class="button">+</button>
    <img src="@/components/sea/Sixth_Virtue.webp" alt="img-Sixth_Virtue" class="img-sea"/>
    <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForSeaItem('Sixth_Virtue') }}&nbsp;&nbsp;&nbsp</label>
    <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Sixth_Virtue')" class="button">-</button>
    <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Sixth_Virtue')" class="button">+</button>
  </div>
  </div>
  <!--  ######################################################Sirin#################################################-->
  <!-- love -->
  <div class="love">
    <img src="@/components/sea/love.webp" alt="img-love" class="img-godSet"/>
    <label class="label-total">
      Jailer of Love:
      <span>{{ calculateKirinValue() }}</span>
    </label>
  </div>
  <div>
    <div>  <button class="button-back" @click="goBack()">Back</button></div>
  </div>

</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {get as rtdbGet, getDatabase, ref as rtdbRef, set as rtdbSet} from 'firebase/database';
import {firebaseApp} from '@/main';


const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

const users = ref([]);
const isOpenUserList = ref(false);
const isOpenUserListInventory = ref(false);
const selectedUsers = ref([]);
const selectedUsersDKP = ref([]);
const clearSelection = () => {
  selectedUsers.value = [];
};
const inventory = {
  sea: {
    HQ_Phuabo_Organ: 0,
    Deed_Of_Placidity: 0,
    HQ_Xzomit_Organ: 0,
    Deed_of_Moderation: 0,
    HQ_Hpemde_Organ: 0,
    Deed_of_Sensibility: 0,
    First_Virtue: 0,
    Second_Virtue: 0,
    Third_Virtue: 0,
    Fourth_Virtue: 0,
    Fifth_Virtue: 0,
    Sixth_Virtue: 0,
  },
};

const shouldShowUser = (user) => {
  if (!user.inventory || !user.inventory.sea) {
    return false;
  }
  for (const key in user.inventory.sea) {
    if (user.inventory.sea[key] > 0) {
      return true;
    }
  }
  return false;
};

const filteredSeaInventory = (sea) => {
  const filtered = {};
  for (const key in sea) {
    if (sea[key] > 0) {
      filtered[key] = sea[key];
    }
  }
  return filtered;
};
const calculateTotalForSeaItem = (item) => {
  let total = 0;
  users.value.forEach((user) => {
    if (user.inventory && user.inventory.sea && user.inventory.sea[item]) {
      total += user.inventory.sea[item];
    }
  });
  return total;
};

const decrementValue = (item) => {


  selectedUsersDKP.value.forEach((userId) => {
    const userRef = rtdbRef(db, `user/${userId}`);
    rtdbGet(userRef)
        .then((snapshot) => {
          const currentItemValue = snapshot.val().inventory.sea;
          if (currentItemValue[item] > 0) {
            if (item in inventory.sea) {
              inventory.sea[item] = Math.max(0, inventory.sea[item] - 1);
              updateUserSelection(item, -1, userId);
            }
          }
        })
        .catch((error) => {
          console.error(`Error al obtener el valor actual desde la base de datos para ${item} del usuario con ID ${userId}`, error);
        });
  });
};

const incrementValue = (item) => {
  selectedUsersDKP.value.forEach((userId) => {
    if (item in inventory.sea) {
      inventory.sea[item]++;
      updateUserSelection(item, 1, userId);
    }
  });


};

const calculateHopeValue = () => {
  const HQPhuaboCount = calculateTotalForSeaItem('HQ_Phuabo_Organ');
  const DeedOfPlacidityCount = calculateTotalForSeaItem('Deed_Of_Placidity');
  const FirstVirtueCount = calculateTotalForSeaItem('First_Virtue');

  const hopeValue = Math.min(HQPhuaboCount, DeedOfPlacidityCount, FirstVirtueCount);

  return Math.floor(hopeValue);
};

const calculateJusticeValue = () => {
  const HQXzomitOrganCount = calculateTotalForSeaItem('HQ_Xzomit_Organ');
  const deedModerationCount = calculateTotalForSeaItem('Deed_of_Moderation');
  const secondVirtue = calculateTotalForSeaItem('Second_Virtue');

  const justiceValue = Math.min(HQXzomitOrganCount, deedModerationCount, secondVirtue);

  return Math.floor(justiceValue);
};

const calculatePrudenceValue = () => {
  const HQHpemdeOrgan = calculateTotalForSeaItem('HQ_Hpemde_Organ');
  const deedSensibility = calculateTotalForSeaItem('Deed_of_Sensibility');
  const third_VirtueCount = calculateTotalForSeaItem('Third_Virtue');

  const suzakuValue = Math.min(HQHpemdeOrgan, deedSensibility, third_VirtueCount);

  return Math.floor(suzakuValue);
};

const calculateKirinValue = () => {
  const fourthVirtueValue = calculateTotalForSeaItem('Fourth_Virtue');
  const fifthVirtueValue = calculateTotalForSeaItem('Fifth_Virtue');
  const sixthVirtueValue = calculateTotalForSeaItem('Sixth_Virtue');

  return Math.min(fourthVirtueValue, fifthVirtueValue, sixthVirtueValue);
};

const updateUserSelection = (item, value, userId) => {
  const userRef = rtdbRef(db, `user/${userId}`);

  rtdbGet(userRef)
      .then((snapshot) => {
        const userData = snapshot.val();

        if (userData) {
          if (!userData.inventory) {
            userData.inventory = {
              sea: {
                [item]: 0,
              },
            };
          } else if (!userData.inventory.sea) {
            userData.inventory.sea = {
              [item]: 0,
            };
          }

          userData.inventory.sea[item] = (userData.inventory.sea[item] || 0) + value;

          rtdbSet(userRef, userData)
              .then(() => {
                loadUsers();
              })
              .catch((error) => {
                console.error("Error al guardar datos en la base de datos: ", error);
              });
        } else {
          console.error("El usuario no existe.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos del usuario: ", error);
      });
};


const userToggleAccordion = () => {
  isOpenUserList.value = !isOpenUserList.value;
}
const userToggleAccordionInventory = () => {
  isOpenUserListInventory.value = !isOpenUserListInventory.value;
}
const updateSelectedUsersDKP = () => {
  selectedUsersDKP.value = selectedUsers.value;
};

let sortColumn = ref('name');
let sortDirection = ref('asc');
const sortTable = (column) => {
  if (column === sortColumn.value) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortDirection.value = 'asc';
    sortColumn.value = column;
  }
};
const sortedUsers = computed(() => {
  const sorted = [...users.value];
  sorted.sort((a, b) => {
    const aValue = a[sortColumn.value];
    const bValue = b[sortColumn.value];

    if (sortDirection.value === 'asc') {
      if (!isNaN(aValue) && !isNaN(bValue)) {
        return parseFloat(aValue) - parseFloat(bValue);
      } else {
        return aValue.localeCompare(bValue);
      }
    } else {
      if (!isNaN(aValue) && !isNaN(bValue)) {
        return parseFloat(bValue) - parseFloat(aValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    }
  });
  return sorted;
});
const loadUsers = async () => {
  const userRef = rtdbRef(db, 'user/');
  try {
    const snapshot = await rtdbGet(userRef);
    if (snapshot.exists()) {
      users.value = Object.keys(snapshot.val()).map((userId) => ({
        id: userId,
        ...snapshot.val()[userId],
      }));
    }
  } catch (error) {
    console.error(error.message);
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
import { useRouter } from 'vue-router';

const router = useRouter();
const goBack = () => {
  router.go(-1); // Retrocede un paso en el historial del router (-1)
};
onMounted(async () => {
  await loadUser();
  await loadUsers();
});
</script>
<style scoped>
.content-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}


.button-container {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
  color: #000000; /* Cambia el color del texto al blanco */
  font-weight: bold;
  background: linear-gradient(to bottom, #99a0a0, #8c9696); /* Fondo degradado */
  border: 1px solid #357ebd; /* Borde con color similar al fondo */
  border-bottom: 1px solid #1f4f7d; /* Borde inferior más oscuro para dar relieve */
  width: 150px;
  border-radius: 5px; /* Bordes redondeados */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Sombra para resaltar */
  transition: background 0.2s, transform 0.2s; /* Transiciones suaves */
}

/* Estilo al pasar el mouse por encima */
.button-container:hover {
  background: linear-gradient(to bottom, #70332e, #70332e); /* Cambia el fondo al pasar el mouse */
  transform: translateY(-2px); /* Efecto de elevación al pasar el mouse */
}

.setting-values {
  text-align: right;
  padding: 20px;
  display: block;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.user-list {
  display: flex; /* Cambia la dirección de visualización a horizontal */
  flex-wrap: wrap; /* Permite que los elementos se envuelvan si no caben en una sola línea */
  list-style: none;
  padding: 0;
}

.user-list li {
  margin-right: 10px; /* Espacio entre los elementos */
}

input:checked {
  background-color: hsl(5, 42%, 31%); /* Cambia el color de fondo cuando se selecciona */
  color: #95a4ab; /* Cambia el color del texto cuando se selecciona */
}

.gods {
  display: flex;
  justify-content: center;

}

.container-stuff {
  text-align: center;
  justify-content: space-between;
}
.container-stuff-lastStones {
  margin-top: 90px;
  text-align: center;
  justify-content: space-between;
}

.container-seals {
  display: flex;
  margin-left: 50px
}

.vertical-container {
  display: flex;
  flex-direction: column;
}

.stuff-image {


}
.stuff-image-virtue {
  vertical-align: bottom;
  height: 120px;


}

.stuff-image:last-child {
  margin-bottom: 0;

}

.img-sea {
  max-width: 100%;
  margin-right: 5px;
  margin-left: 10px;

}

.gods-set {
  max-width: 100%;
  padding-left: 50px;
}

.container-gods-set {
  display: flex;
  justify-content: space-between; /* Espacia los elementos equitativamente dentro del contenedor */
  align-items: center; /* Centra verticalmente los elementos dentro del contenedor */

}

.img-godSet {
  max-width: 100%;
  /* Quita el margen de las imágenes individuales */
}

.love {
  width:100%; /* Establece el ancho deseado, por ejemplo, 80px */
text-align: center;
  margin-top: 50px;


}

.label-total {
  font-weight: bold;
  color: #c7213f ;

}

.user-list {
  display: flex; /* Cambia la dirección de visualización a horizontal */
  flex-wrap: wrap; /* Permite que los elementos se envuelvan si no caben en una sola línea */
  list-style: none;
  padding: 0;
  font-size: 12px;
}

.button {
  cursor: pointer;
  align-items: center;
  color: #000000; /* Cambia el color del texto al blanco */
  font-weight: bold;
  background: linear-gradient(to bottom, #99a0a0, #8c9696); /* Fondo degradado */
  border: 1px solid #99a0a0; /* Borde con color similar al fondo */
  border-bottom: 1px solid #8c9696; /* Borde inferior más oscuro para dar relieve */
  border-radius: 5px; /* Bordes redondeados */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Sombra para resaltar */
  transition: background 0.2s, transform 0.2s; /* Transiciones suaves */
}
.button:hover {
  background: linear-gradient(to bottom, #70332e, #70332e); /* Cambia el fondo al pasar el mouse */
  transform: translateY(-2px); /* Efecto de elevación al pasar el mouse */
}
.title {
  font-size: 46px; /* Tamaño de fuente más grande */
  font-weight: bold; /* Texto en negrita */
  color: #c7213f; /* Color del texto (puedes cambiarlo según tus preferencias) */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Sombra de texto (opcional) */
}
.accordion-title {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  color: #687377;
  border-bottom: 1px solid #333;
}
.userCounter {
  font-size: 16px;
  color: #079009;
  font-weight: bold;
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