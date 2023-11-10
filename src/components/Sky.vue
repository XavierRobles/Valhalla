<template>
  <div class="content">
    <div class="centered-content">
      <h3><span class="title">SKY</span></h3>
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
              <li v-for="(value, key) in filteredSkyInventory(user.inventory.sky)" :key="key">
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
    <div class="container-stone-gems">
      <div class="user-image">
        <img src="@/components/sky/Winterstone.webp" alt="img-Winterstone" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;&nbsp;{{
            calculateTotalForSkyItem('Winterstone')
          }}&nbsp;&nbsp;&nbsp;</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Winterstone')" class="button">
          -
        </button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Winterstone')" class="button">
          +
        </button>&nbsp;&nbsp;&nbsp;
        <img src="@/components/sky/Gem_of_the_North.webp" alt="img-Gem-of-the-North" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;&nbsp;{{
            calculateTotalForSkyItem('GemOfTheNorth')
          }}&nbsp;&nbsp;&nbsp;</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('GemOfTheNorth')"
                class="button">-
        </button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('GemOfTheNorth')"
                class="button">+
        </button>
      </div>
      <!-- Springstone y GemOfTheEast -->
      <div class="user-image">
        <img src="@/components/sky/Springstone.webp" alt="img-Springstone" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;&nbsp;{{
            calculateTotalForSkyItem('Springstone')
          }}&nbsp;&nbsp;&nbsp;</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Springstone')" class="button">
          -
        </button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Springstone')" class="button">
          +
        </button>&nbsp;&nbsp;&nbsp;
        <img src="@/components/sky/GemOfTheEast.webp" alt="img-GemOfTheEast" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;&nbsp;{{
            calculateTotalForSkyItem('GemOfTheEast')
          }}&nbsp;&nbsp;&nbsp;</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('GemOfTheEast')"
                class="button">-
        </button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('GemOfTheEast')"
                class="button">+
        </button>
      </div>

      <!-- Summerstone y GemOfTheSouth -->
      <div class="user-image">
        <img src="@/components/sky/Summerstone.webp" alt="img-Summerstone" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;&nbsp;{{
            calculateTotalForSkyItem('Summerstone')
          }}&nbsp;&nbsp;&nbsp;</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Summerstone')" class="button">
          -
        </button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Summerstone')" class="button">
          +
        </button>&nbsp;&nbsp;&nbsp;
        <img src="@/components/sky/GemOfTheSouth.webp" alt="img-GemOfTheSouth" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;&nbsp;{{
            calculateTotalForSkyItem('GemOfTheSouth')
          }}&nbsp;&nbsp;&nbsp;</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('GemOfTheSouth')"
                class="button">-
        </button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('GemOfTheSouth')"
                class="button">+
        </button>
      </div>

      <!-- Autumnstone y GemOfTheWest -->
      <div class="user-image">
        <img src="@/components/sky/Autumnstone.webp" alt="img-Autumnstone" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;&nbsp;{{
            calculateTotalForSkyItem('Autumnstone')
          }}&nbsp;&nbsp;&nbsp;</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('Autumnstone')" class="button">
          -
        </button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('Autumnstone')" class="button">
          +
        </button>&nbsp;&nbsp;&nbsp;
        <img src="@/components/sky/GemOfTheWest.webp" alt="img-GemOfTheWest" class="img-sea"/>
        <label class="label-total">&nbsp;&nbsp;&nbsp;{{
            calculateTotalForSkyItem('GemOfTheWest')
          }}&nbsp;&nbsp;&nbsp;</label>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('GemOfTheWest')"
                class="button">-
        </button>
        <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('GemOfTheWest')"
                class="button">+
        </button>
      </div>
    </div>
    <!--  ######################################################Seal#################################################-->
    <div class="container-seals">
      <div class="vertical-container">
        <!-- SealOfGenbu -->
        <div class="user-image">
          <img src="@/components/sky/SealOfGenbu.webp" alt="img-SealOfGenbu" class="img-sea"/>
          <label class="label-total">&nbsp;&nbsp;&nbsp;{{
              calculateTotalForSkyItem('SealOfGenbu')
            }}&nbsp;&nbsp;&nbsp;</label>
          <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('SealOfGenbu')"
                  class="button">-
          </button>
          <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('SealOfGenbu')"
                  class="button">+
          </button>
        </div>

        <!-- SealOfSeiryu -->
        <div class="user-image">
          <img src="@/components/sky/SealOfSeiryu.png" alt="img-SealOfSeiryu" class="img-sea"/>
          <label class="label-total">&nbsp;&nbsp;&nbsp;{{
              calculateTotalForSkyItem('SealOfSeiryu')
            }}&nbsp;&nbsp;&nbsp;</label>
          <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('SealOfSeiryu')"
                  class="button">-
          </button>
          <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('SealOfSeiryu')"
                  class="button">+
          </button>
        </div>

        <!-- SealOfSuzaku -->
        <div class="user-image">
          <img src="@/components/sky/SealOfSuzaku.webp" alt="img-SealOfSuzaku" class="img-sea"/>
          <label class="label-total">&nbsp;&nbsp;&nbsp;{{
              calculateTotalForSkyItem('SealOfSuzaku')
            }}&nbsp;&nbsp;&nbsp;</label>
          <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('SealOfSuzaku')"
                  class="button">-
          </button>
          <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('SealOfSuzaku')"
                  class="button">+
          </button>
        </div>

        <!-- SealOfByakko -->
        <div class="user-image">
          <img src="@/components/sky/SealOfByakko.webp" alt="img-SealOfByakko" class="img-sea"/>
          <label class="label-total">&nbsp;&nbsp;&nbsp;{{
              calculateTotalForSkyItem('SealOfByakko')
            }}&nbsp;&nbsp;&nbsp;</label>
          <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="decrementValue('SealOfByakko')"
                  class="button">-
          </button>
          <button v-if="userRole === 'JARL' || userRole === 'EARL'" @click="incrementValue('SealOfByakko')"
                  class="button">+
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--  ##############################################Set complet####################################################-->
  <div class="gods-set">
    <div class="container-gods-set">
      <!-- Genbu -->
      <div class="stuff-image">
        <img src="@/components/sky/genbu.png" alt="img-genbu" class="img-godSet"/>
        <label class="label-total">
          Genbu:
          <span>{{ calculateGenbuValue() }}</span>
        </label>
      </div>

      <!-- Seiryu -->
      <div class="stuff-image">
        <img src="@/components/sky/seiryu.png" alt="img-seiryu" class="img-godSet"/>
        <label class="label-total">
          Seiryu:
          <span>{{ calculateSeiryuValue() }}</span>
        </label>
      </div>

      <!-- Suzaku -->
      <div class="stuff-image">
        <img src="@/components/sky/suzaku.png" alt="img-suzaku" class="img-godSet-stone"/>
        <label class="label-total">
          Suzaku:
          <span>{{ calculateSuzakuValue() }}</span>
        </label>
      </div>

      <!-- Byakko -->
      <div class="stuff-image">
        <img src="@/components/sky/byakko.webp" alt="img-byakko" class="img-godSet"/>
        <label class="label-total">
          Byakko:
          <span>{{ calculateByakkoValue() }}</span>
        </label>
      </div>
    </div>
  </div>
  <!--  ######################################################Sirin#################################################-->
  <!-- Kirin -->
  <div class="kirin">
    <img src="@/components/sky/kirin.webp" alt="img-kirin" class="img-godSet"/>
    <label class="label-total">
      Kirin:
      <span>{{ calculateKirinValue() }}</span>
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
  sky: {
    Winterstone: 0,
    GemOfTheNorth: 0,
    Springstone: 0,
    GemOfTheEast: 0,
    Summerstone: 0,
    GemOfTheSouth: 0,
    Autumnstone: 0,
    GemOfTheWest: 0,
    SealOfGenbu: 0,
    SealOfSeiryu: 0,
    SealOfSuzaku: 0,
    SealOfByakko: 0,
  },
};
const shouldShowUser = (user) => {
  if (!user.inventory || !user.inventory.sky) {
    return false;
  }
  for (const key in user.inventory.sky) {
    if (user.inventory.sky[key] > 0) {
      return true;
    }
  }
  return false;
};

const filteredSkyInventory = (sky) => {
  const filtered = {};
  for (const key in sky) {
    if (sky[key] > 0) {
      filtered[key] = sky[key];
    }
  }
  return filtered;
};
const calculateTotalForSkyItem = (item) => {
  let total = 0;
  users.value.forEach((user) => {
    if (user.inventory && user.inventory.sky && user.inventory.sky[item]) {
      total += user.inventory.sky[item];
    }
  });
  return total;
};

const decrementValue = (item) => {


  selectedUsersDKP.value.forEach((userId) => {
    const userRef = rtdbRef(db, `user/${userId}`);
    rtdbGet(userRef)
        .then((snapshot) => {
          const currentItemValue = snapshot.val().inventory.sky;
          if (currentItemValue[item] > 0) {
            if (item in inventory.sky) {
              inventory.sky[item] = Math.max(0, inventory.sky[item] - 1);
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
    if (item in inventory.sky) {
      inventory.sky[item]++;
      updateUserSelection(item, 1, userId);
    }
  });


};

const calculateGenbuValue = () => {
  const winterstoneCount = calculateTotalForSkyItem('Winterstone');
  const gemOfTheNorthCount = calculateTotalForSkyItem('GemOfTheNorth');

  const genbuValue = Math.min(winterstoneCount, gemOfTheNorthCount);

  return Math.floor(genbuValue);
};
const calculateSeiryuValue = () => {
  const springstoneCount = calculateTotalForSkyItem('Springstone');
  const gemOfTheEastCount = calculateTotalForSkyItem('GemOfTheEast');

  const seiryuValue = Math.min(springstoneCount, gemOfTheEastCount);

  return Math.floor(seiryuValue);
};
const calculateSuzakuValue = () => {
  const summerstoneCount = calculateTotalForSkyItem('Summerstone');
  const gemOfTheSouthCount = calculateTotalForSkyItem('GemOfTheSouth');

  const suzakuValue = Math.min(summerstoneCount, gemOfTheSouthCount);

  return Math.floor(suzakuValue);
};
const calculateByakkoValue = () => {
  const autumnstoneCount = calculateTotalForSkyItem('Autumnstone');
  const gemOfTheWestCount = calculateTotalForSkyItem('GemOfTheWest');

  const byakkoValue = Math.min(autumnstoneCount, gemOfTheWestCount);

  return Math.floor(byakkoValue);
};

const calculateKirinValue = () => {
  const SealOfGenbu = calculateTotalForSkyItem('SealOfGenbu');
  const SealOfSeiryu = calculateTotalForSkyItem('SealOfSeiryu');
  const SealOfSuzaku = calculateTotalForSkyItem('SealOfSuzaku');
  const SealOfByakko = calculateTotalForSkyItem('SealOfByakko');

  return Math.min(SealOfGenbu, SealOfSeiryu, SealOfSuzaku, SealOfByakko);
};


const updateUserSelection = (item, value, userId) => {
  const userRef = rtdbRef(db, `user/${userId}`);

  rtdbGet(userRef)
      .then((snapshot) => {
        const userData = snapshot.val();

        if (userData) {
          if (!userData.inventory) {
            userData.inventory = {
              sky: {
                [item]: 0,
              },
            };
          } else if (!userData.inventory.sky) {
            userData.inventory.sky = {
              [item]: 0,
            };
          }

          userData.inventory.sky[item] = (userData.inventory.sky[item] || 0) + value;

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

.button {
  cursor: pointer;
  align-items: center;
  color: #000000; /* Cambia el color del texto al blanco */
  font-weight: bold;
  background: linear-gradient(to bottom, #99a0a0, #8c9696); /* Fondo degradado */
  border: 1px solid #b9c0c0; /* Borde con color similar al fondo */
  border-bottom: 1px solid #8c9696; /* Borde inferior más oscuro para dar relieve */
  border-radius: 5px; /* Bordes redondeados */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Sombra para resaltar */
  transition: background 0.2s, transform 0.2s; /* Transiciones suaves */
}

.button:hover {
  background: linear-gradient(to bottom, #70332e, #70332e); /* Cambia el fondo al pasar el mouse */
  transform: translateY(-2px); /* Efecto de elevación al pasar el mouse */
}

/* Estilo cuando se pasa el mouse por encima */
.button:hover {
  background-color: hsl(5, 42%, 31%); /* Cambia el color de fondo cuando se pasa el mouse */
}

input:checked {
  background-color: hsl(5, 42%, 31%); /* Cambia el color de fondo cuando se selecciona */
  color: #95a4ab; /* Cambia el color del texto cuando se selecciona */
}

.gods {
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
}

.container-stone-gems {

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


.gods-set {
  text-align: center;

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

.kirin {
  width: 400px; /* Establece el ancho deseado, por ejemplo, 80px */
  height: auto; /* Mantiene la proporción original de la imagen */
  display: block; /* Hace que la imagen sea un bloque para poder centrarla */
  margin: 0 auto; /* Centra la imagen horizontalmente */

}

.label-total {
  width: 30px;
  font-weight: bold;
  color: gold ;
}

.user-list {
  display: flex; /* Cambia la dirección de visualización a horizontal */
  flex-wrap: wrap; /* Permite que los elementos se envuelvan si no caben en una sola línea */
  list-style: none;
  padding: 0;
  font-size: 12px;
}

.user {
  margin-right: 10px; /* Espacio entre los elementos */
}

.user-image:last-child {
  margin-bottom: 0;

}


.centered-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
  font-size: 40px;
}

.user-image .button {
  margin-bottom: 10px; /* Ajusta el valor del margen según tus preferencias */
  margin-top: 10px; /* Ajusta el valor del margen según tus preferencias */
  width: 30px;
}

.title {
  font-size: 46px; /* Tamaño de fuente más grande */
  font-weight: bold; /* Texto en negrita */
  color: gold; /* Color del texto (puedes cambiarlo según tus preferencias) */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Sombra de texto (opcional) */
}
</style>