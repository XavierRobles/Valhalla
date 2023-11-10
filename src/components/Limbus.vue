<template>
  <div class="content">
    <div class="centered-content">
      <h3><span class="title">Limbus</span></h3>
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
              <li v-for="(value, key) in filteredLimbusInventory(user.inventory.limbus)" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  ######################################################User list Checkbox#####################################-->
  <div class="content" v-if="userRole === 'JARL' || userRole === 'EARL'">
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
  </div>
  <!--  ######################################################Gem######################################################-->
  <div class="gods">
    <div class="container-stone">
      <!-- Charcoal_chip y Magenta_chip -->
      <div class="stuff-image">
        <img src="@/components/sea/Charcoal_chip.webp" alt="img-Charcoal_chip" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForLimbusItem('Charcoal_chip') }}&nbsp;&nbsp;&nbsp</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Charcoal_chip')" class="button">-</button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Charcoal_chip')" class="button">+</button>
        <img src="@/components/sea/Magenta_chip.webp" alt="img-Magenta_chip" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForLimbusItem('Magenta_chip') }}&nbsp;&nbsp;&nbsp</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Magenta_chip')" class="button">-</button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Magenta_chip')" class="button">+</button>
      </div>
      <!-- Smalt_chip y Smoky_chip -->
      <div class="stuff-image">
        <img src="@/components/sea/Smalt_chip.webp" alt="img-Smalt_chip" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForLimbusItem('Smalt_chip') }}&nbsp;&nbsp;&nbsp</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Smalt_chip')" class="button">-</button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Smalt_chip')" class="button">+</button>
        <img src="@/components/sea/Smoky_chip.webp" alt="img-Smoky_chip" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForLimbusItem('Smoky_chip') }}&nbsp;&nbsp;&nbsp</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Smoky_chip')" class="button">-</button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Smoky_chip')" class="button">+</button>
      </div>

    </div>
  </div>
  <!--  ##############################################Set complet####################################################-->
  <div class="gods-set">
    <div class="container-gods-set">
      <!-- Omega -->
      <div class="stuff-image">
        <img src="@/components/sea/Omega.webp" alt="img-Omega" class="img-godSet"/>
        <br>
        <label class="label-total">
          Omega:
          <span>{{ calculateOmegaValue() }}</span>
        </label>
      </div>
      <div class="stuff-image">
        <img src="@/components/sea/Metal_chip.webp" alt="img-Metal_chip" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForLimbusItem('Metal_chip') }}&nbsp;&nbsp;&nbsp</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Metal_chip')" class="button">-</button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Metal_chip')" class="button">+</button>
      </div>

    </div>
  </div>

  <!-- Emerald_Chip, Scarlet_Chip, Ivory_Chip -->
  <div class="container-stuff-lastStones">
  <div class="stuff-image">
    <img src="@/components/sea/Emerald_Chip.webp" alt="img-Emerald_Chip" class="img-sea"/>
    <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForLimbusItem('Emerald_Chip') }}&nbsp;&nbsp;&nbsp</label>
    <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Emerald_Chip')" class="button">-</button>
    <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Emerald_Chip')" class="button">+</button>
    <img src="@/components/sea/Scarlet_Chip.webp" alt="img-Scarlet_Chip" class="img-sea"/>
    <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForLimbusItem('Scarlet_Chip') }}&nbsp;&nbsp;&nbsp</label>
    <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Scarlet_Chip')" class="button">-</button>
    <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Scarlet_Chip')" class="button">+</button>
    <img src="@/components/sea/Ivory_Chip.webp" alt="img-Ivory_Chip" class="img-sea"/>
    <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForLimbusItem('Ivory_Chip') }}&nbsp;&nbsp;&nbsp</label>
    <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Ivory_Chip')" class="button">-</button>
    <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Ivory_Chip')" class="button">+</button>
  </div>
    <!-- Orchid_Chip, Cerulean_Chip, Silver_chip -->
    <div class="stuff-image">
      <img src="@/components/sea/Orchid_Chip.webp" alt="img-Orchid_Chip" class="img-sea"/>
      <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForLimbusItem('Orchid_Chip') }}&nbsp;&nbsp;&nbsp</label>
      <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Orchid_Chip')" class="button">-</button>
      <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Orchid_Chip')" class="button">+</button>
      <img src="@/components/sea/Cerulean_Chip.webp" alt="img-Cerulean_Chip" class="img-sea"/>
      <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForLimbusItem('Cerulean_Chip') }}&nbsp;&nbsp;&nbsp</label>
      <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Cerulean_Chip')" class="button">-</button>
      <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Cerulean_Chip')" class="button">+</button>
      <img src="@/components/sea/Silver_chip.webp" alt="img-Silver_chip" class="img-sea"/>
      <label class="label-total">&nbsp;&nbsp;{{ calculateTotalForLimbusItem('Silver_chip') }}&nbsp;&nbsp;&nbsp</label>
      <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Silver_chip')" class="button">-</button>
      <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Silver_chip')" class="button">+</button>
    </div>
  </div>
  <!--  ######################################################Ultima#################################################-->
  <!-- Ultima -->
  <div class="love">
    <img src="@/components/sea/Ultima.webp" alt="img-love" class="img-godSet"/>
    <label class="label-total">
      Ultima:
      <span>{{ calculateUltimaValue() }}</span>
    </label>
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

const inventory = {
  limbus: {
    Charcoal_chip: 0,
    Magenta_chip: 0,
    Smalt_chip: 0,
    Smoky_chip: 0,
    Emerald_Chip: 0,
    Scarlet_Chip: 0,
    Ivory_Chip: 0,
    Orchid_Chip: 0,
    Cerulean_Chip: 0,
    Silver_chip: 0,
    Metal_chip: 0,
  },
};

const shouldShowUser = (user) => {
  if (!user.inventory || !user.inventory.limbus) {
    return false;
  }
  for (const key in user.inventory.limbus) {
    if (user.inventory.limbus[key] > 0) {
      return true;
    }
  }
  return false;
};

const filteredLimbusInventory = (limbus) => {
  const filtered = {};
  for (const key in limbus) {
    if (limbus[key] > 0) {
      filtered[key] = limbus[key];
    }
  }
  return filtered;
};
const calculateTotalForLimbusItem = item => {
  let total = 0;
  users.value.forEach((user) => {
    if (user.inventory && user.inventory.limbus && user.inventory.limbus[item]) {
      total += user.inventory.limbus[item];
    }
  });
  return total;
};

const decrementValue = (item) => {


  selectedUsersDKP.value.forEach((userId) => {
    const userRef = rtdbRef(db, `user/${userId}`);
    rtdbGet(userRef)
        .then((snapshot) => {
          const currentItemValue = snapshot.val().inventory.limbus;
          if (currentItemValue[item] > 0) {
            if (item in inventory.limbus) {
              inventory.limbus[item] = Math.max(0, inventory.limbus[item] - 1);
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
    if (item in inventory.limbus) {
      inventory.limbus[item]++;
      updateUserSelection(item, 1, userId);
    }
  });


};

const calculateOmegaValue = () => {
  const charcoal_chipCount = calculateTotalForLimbusItem('Charcoal_chip');
  const magenta_chipCount = calculateTotalForLimbusItem('Magenta_chip');
  const smalt_chipCount = calculateTotalForLimbusItem('Smalt_chip');
  const smoky_chipCount = calculateTotalForLimbusItem('Smoky_chip');

  const omegaValue = Math.min(charcoal_chipCount, magenta_chipCount, smalt_chipCount, smoky_chipCount);

  return Math.floor(omegaValue);
};

const calculateJusticeValue = () => {
  const HQXzomitOrganCount = calculateTotalForLimbusItem('HQ_Xzomit_Organ');
  const deedModerationCount = calculateTotalForLimbusItem('Deed_of_Moderation');
  const secondVirtue = calculateTotalForLimbusItem('Second_Virtue');

  const justiceValue = Math.min(HQXzomitOrganCount, deedModerationCount, secondVirtue);

  return Math.floor(justiceValue);
};

const calculatePrudenceValue = () => {
  const HQHpemdeOrgan = calculateTotalForLimbusItem('HQ_Hpemde_Organ');
  const deedSensibility = calculateTotalForLimbusItem('Deed_of_Sensibility');
  const third_VirtueCount = calculateTotalForLimbusItem('Third_Virtue');

  const suzakuValue = Math.min(HQHpemdeOrgan, deedSensibility, third_VirtueCount);

  return Math.floor(suzakuValue);
};

const calculateUltimaValue = () => {
  const orchid_ChipValue = calculateTotalForLimbusItem('Orchid_Chip');
  const serulean_ChipValue = calculateTotalForLimbusItem('Cerulean_Chip');
  const silver_chipValue = calculateTotalForLimbusItem('Silver_chip');

  return Math.min(orchid_ChipValue, serulean_ChipValue, silver_chipValue);
};

const updateUserSelection = (item, value, userId) => {
  const userRef = rtdbRef(db, `user/${userId}`);

  rtdbGet(userRef)
      .then((snapshot) => {
        const userData = snapshot.val();

        if (userData) {
          if (!userData.inventory) {
            userData.inventory = {
              limbus: {
                [item]: 0,
              },
            };
          } else if (!userData.inventory.limbus) {
            userData.inventory.limbus = {
              [item]: 0,
            };
          }

          userData.inventory.limbus[item] = (userData.inventory.limbus[item] || 0) + value;

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
onMounted(async () => {
  await loadUser();
  await loadUsers();
});
</script>
<style scoped>
.content {
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
</style>