<template>
  <div>
    <div v-for="user in users" :key="user.id">
      <h2 v-if="shouldShowUser(user)">{{ user.name }}</h2>
      <ul v-if="shouldShowUser(user)">
        <li v-for="(value, key) in filteredInventory(user.inventory)" :key="key">
          {{ key }}: {{ value }}
        </li>
      </ul>
    </div>
  </div>
  <div class="content">
    <div class="left-half">
      <div class="accordion-title" @click="userToggleAccordion">
        <span class="button">User List</span>
        <i class="fas" :class="isOpenUserList ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
      </div>
      <div v-show="isOpenUserList" class="setting-values">
        <ul class="user-list">
          <li v-for="user in sortedUsers" :key="user.id">
            <input type="checkbox" v-model="selectedUsers" :value="user.id" @change="updateSelectedUsersDKP" />
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
        <img src="@/components/icons/stones/Winterstone.webp" alt="img-Winterstone" class="img-stone" />
        <label class="label-total">{{ calculateTotalForItem('Winterstone') }}</label>
        <button @click="decrementValue('Winterstone')">-</button>
        <button @click="incrementValue('Winterstone')">+</button>
        <img src="@/components/icons/stones/Gem_of_the_North.webp" alt="img-Gem-of-the-North" class="img-stone" />
        <label class="label-total">{{ calculateTotalForItem('GemOfTheNorth') }}</label>
        <button @click="decrementValue('GemOfTheNorth')">-</button>
        <button @click="incrementValue('GemOfTheNorth')">+</button>
      </div>
      <!-- Springstone y GemOfTheEast -->
      <div class="user-image">
        <img src="@/components/icons/stones/Springstone.webp" alt="img-Springstone" class="img-stone"/>
        <label class="label-total">{{ calculateTotalForItem('Springstone') }}</label>
        <button @click="decrementValue('Springstone')">-</button>
        <button @click="incrementValue('Springstone')">+</button>
        <img src="@/components/icons/stones/GemOfTheEast.webp" alt="img-GemOfTheEast" class="img-stone"/>
        <label class="label-total">{{ calculateTotalForItem('GemOfTheEast') }}</label>
        <button @click="decrementValue('GemOfTheEast')">-</button>
        <button @click="incrementValue('GemOfTheEast')">+</button>
      </div>

      <!-- Summerstone y GemOfTheSouth -->
      <div class="user-image">
        <img src="@/components/icons/stones/Summerstone.webp" alt="img-Summerstone" class="img-stone"/>
        <label class="label-total">{{ calculateTotalForItem('Summerstone') }}</label>
        <button @click="decrementValue('Summerstone')">-</button>
        <button @click="incrementValue('Summerstone')">+</button>
        <img src="@/components/icons/stones/GemOfTheSouth.webp" alt="img-GemOfTheSouth" class="img-stone"/>
        <label class="label-total">{{ calculateTotalForItem('GemOfTheSouth') }}</label>
        <button @click="decrementValue('GemOfTheSouth')">-</button>
        <button @click="incrementValue('GemOfTheSouth')">+</button>
      </div>

      <!-- Autumnstone y GemOfTheWest -->
      <div class="user-image">
        <img src="@/components/icons/stones/Autumnstone.webp" alt="img-Autumnstone" class="img-stone"/>
        <label class="label-total">{{ calculateTotalForItem('Autumnstone') }}</label>
        <button @click="decrementValue('Autumnstone')">-</button>
        <button @click="incrementValue('Autumnstone')">+</button>
        <img src="@/components/icons/stones/GemOfTheWest.webp" alt="img-GemOfTheWest" class="img-stone"/>
        <label class="label-total">{{ calculateTotalForItem('GemOfTheWest') }}</label>
        <button @click="decrementValue('GemOfTheWest')">-</button>
        <button @click="incrementValue('GemOfTheWest')">+</button>
      </div>
    </div>
    <!--  ######################################################Seal#################################################-->
    <div class="container-seals">
      <div class="vertical-container">
        <!-- SealOfGenbu -->
        <div class="user-image">
          <img src="@/components/icons/stones/SealOfGenbu.webp" alt="img-SealOfGenbu" class="img-stone" />
          <label class="label-total">{{ calculateTotalForItem('SealOfGenbu') }}</label>
          <button @click="decrementValue('SealOfGenbu')">-</button>
          <button @click="incrementValue('SealOfGenbu')">+</button>
        </div>

        <!-- SealOfSeiryu -->
        <div class="user-image">
          <img src="@/components/icons/stones/SealOfSeiryu.png" alt="img-SealOfSeiryu" class="img-stone" />
          <label class="label-total">{{ calculateTotalForItem('SealOfSeiryu') }}</label>
          <button @click="decrementValue('SealOfSeiryu')">-</button>
          <button @click="incrementValue('SealOfSeiryu')">+</button>
        </div>

        <!-- SealOfSuzaku -->
        <div class="user-image">
          <img src="@/components/icons/stones/SealOfSuzaku.webp" alt="img-SealOfSuzaku" class="img-stone" />
          <label class="label-total">{{ calculateTotalForItem('SealOfSuzaku') }}</label>
          <button @click="decrementValue('SealOfSuzaku')">-</button>
          <button @click="incrementValue('SealOfSuzaku')">+</button>
        </div>

        <!-- SealOfByakko -->
        <div class="user-image">
          <img src="@/components/icons/stones/SealOfByakko.webp" alt="img-SealOfByakko" class="img-stone" />
          <label class="label-total">{{ calculateTotalForItem('SealOfByakko') }}</label>
          <button @click="decrementValue('SealOfByakko')">-</button>
          <button @click="incrementValue('SealOfByakko')">+</button>
        </div>
      </div>
      <div class="user-image">
        <img src="@/components/icons/stones/odin.png" alt="img-SealOfByakko" class="img-odin" />
      </div>
    </div>
  </div>
  <!--  ##############################################Set complet####################################################-->
  <div class="gods-set">
    <div class="container-gods-set">
      <!-- Genbu -->
      <div class="user-image">
        <img src="@/components/icons/stones/genbu.png" alt="img-genbu" class="img-godSet"/>
        <label>
          Genbu
          <span>{{ calculateGenbuValue('SealOfGenbu') }}</span>
        </label>
      </div>

      <!-- Seiryu -->
      <div class="user-image">
        <img src="@/components/icons/stones/seiryu.png" alt="img-seiryu" class="img-godSet"/>
        <label>
          Seiryu
          <span>{{ calculateSeiryuValue('SealOfSeiryu') }}</span>
        </label>
      </div>

      <!-- Suzaku -->
      <div class="user-image">
        <img src="@/components/icons/stones/suzaku.png" alt="img-suzaku" class="img-godSet-stone"/>
        <label>
          Suzaku
          <span>{{ calculateSuzakuValue('SealOfSuzaku') }}</span>
        </label>
      </div>

      <!-- Byakko -->
      <div class="user-image">
        <img src="@/components/icons/stones/byakko.webp" alt="img-byakko" class="img-godSet"/>
        <label>
          Byakko
          <span>{{ calculateByakkoValue('SealOfByakko') }}</span>
        </label>
      </div>
    </div>
  </div>
  <!--  ######################################################Sirin#################################################-->
  <!-- Kirin -->
  <div class="kirin">
    <img src="@/components/icons/stones/kirin.webp" alt="img-kirin" class="img-godSet"/>
    <label>
      Kirin
      <span>{{ calculateKirinValue('Kirin') }}</span>
    </label>
  </div>


</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import {getAuth} from 'firebase/auth';
import {get as rtdbGet, getDatabase, ref as rtdbRef, set as rtdbSet} from 'firebase/database';
import {firebaseApp} from '@/main';


const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

const users = ref([]);
const isOpenUserList = ref(false);
const selectedUsers = ref([]);
const selectedUsersDKP = ref([]);

const inventory  = {
  'Winterstone': 0,
  'GemOfTheNorth': 0,
  'Springstone': 0,
  'GemOfTheEast': 0,
  'Summerstone': 0,
  'GemOfTheSouth': 0,
  'Autumnstone': 0,
  'GemOfTheWest': 0,
  'SealOfGenbu': 0,
  'SealOfSeiryu': 0,
  'SealOfSuzaku': 0,
  'SealOfByakko': 0,
};
const shouldShowUser = (user) => {
  if (!user.inventory) {
    return false;
  }
  for (const key in user.inventory) {
    if (user.inventory[key] > 0) {
      return true;
    }
  }
  return false;
};

const filteredInventory = (inventory) => {
  const filtered = {};
  for (const key in inventory) {
    if (inventory[key] > 0) {
      filtered[key] = inventory[key];
    }
  }
  return filtered;
};
const calculateTotalForItem = (item) => {
  let total = 0;
  users.value.forEach((user) => {
    if (user.inventory && user.inventory[item]) {
      total += user.inventory[item];
    }
  });
  return total;
};
const decrementValue = (item) => {
  if (item in inventory) {
    inventory[item] = -1;
    updateUserSelection(item, inventory[item]);
  }
};

const incrementValue = (item) => {
  if (item in inventory) {
    inventory[item] = 1;
    updateUserSelection(item, inventory[item]);
  }
};

const calculateGenbuValue = () => {
  const winterstoneCount = calculateTotalForItem('Winterstone');
  const gemOfTheNorthCount = calculateTotalForItem('GemOfTheNorth');

  // Calcula Genbu basado en la cantidad de Winterstone y GemOfTheNorth
  const genbuValue = Math.min(winterstoneCount, gemOfTheNorthCount);

  return Math.floor(genbuValue);
};
const calculateSeiryuValue = () => {
  const springstoneCount = calculateTotalForItem('Springstone');
  const gemOfTheEastCount = calculateTotalForItem('GemOfTheEast');

  // Calcula Seiryu basado en la cantidad de Springstone y GemOfTheEast
  const seiryuValue = Math.min(springstoneCount, gemOfTheEastCount);

  return Math.floor(seiryuValue);
};
const calculateSuzakuValue = () => {
  const summerstoneCount = calculateTotalForItem('Summerstone');
  const gemOfTheSouthCount = calculateTotalForItem('GemOfTheSouth');

  // Calcula Suzaku basado en la cantidad de Summerstone y GemOfTheSouth
  const suzakuValue = Math.min(summerstoneCount, gemOfTheSouthCount);

  return Math.floor(suzakuValue);
};
const calculateByakkoValue = () => {
  const autumnstoneCount = calculateTotalForItem('Autumnstone');
  const gemOfTheWestCount = calculateTotalForItem('GemOfTheWest');

  // Calcula Byakko basado en la cantidad de Autumnstone y GemOfTheWest
  const byakkoValue = Math.min(autumnstoneCount, gemOfTheWestCount);

  return Math.floor(byakkoValue);
};

const calculateKirinValue = () => {
  const SealOfGenbu = calculateTotalForItem('SealOfGenbu');
  const SealOfSeiryu = calculateTotalForItem('SealOfSeiryu');
  const SealOfSuzaku = calculateTotalForItem('SealOfSuzaku');
  const SealOfByakko = calculateTotalForItem('SealOfByakko');
  console.log('SealOfGenbu '+ SealOfGenbu)
  console.log('SealOfSeiryu '+ SealOfSeiryu)
  console.log('SealOfSuzaku '+ SealOfSuzaku)
  console.log('SealOfByakko '+ SealOfByakko)

  // La cantidad de Kirin Sets es el mínimo de los totales de sellos de cada tipo
  const minCount = Math.min(SealOfGenbu, SealOfSeiryu, SealOfSuzaku, SealOfByakko);

  return minCount;
};


const updateUserSelection = (item, value) => {
  selectedUsersDKP.value.forEach((userId) => {
    const userRef = rtdbRef(db, `user/${userId}`);

    rtdbGet(userRef)
        .then((snapshot) => {
          const userData = snapshot.val();

          if (userData) {
            if (!userData.inventory) {
              // Si el usuario no tiene un objeto 'inventory', créalo.
              userData.inventory = {};
            }

            const updatedInventory = {
              ...userData.inventory,
              [item]: (userData.inventory[item] || 0) + value,
            };

            const updatedUserData = {
              ...userData,
              inventory: updatedInventory,
            };

            rtdbSet(userRef, updatedUserData)
                .then(() => {
                  // Después de guardar los cambios en la base de datos, recarga los datos de los usuarios
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
  });
};


const userToggleAccordion = () => {
  isOpenUserList.value = !isOpenUserList.value;
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
onMounted(() => {
  loadUsers();
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
//display: inline-block; padding: 0px 5px; /* Ajusta el espaciado interno según sea necesario */ background-color: #deecec; /* Color de fondo del botón */ color: #000000; /* Color del texto */ border: none; /* Sin borde */ border-radius: 4px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor al pasar por encima */
  text-align: center; /* Centra el texto horizontalmente */
  text-decoration: none; /* Quita la subraya predeterminada para que parezca un botón */
  font-weight: bold;
  font-size: 12px;
  background-color: #95a4ab;
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
  margin-right: -70px;

}
.container-stone-gems {

  background-color: #3d54ca;
  text-align: center;
  justify-content: space-between;
}


.container-seals {
  display: flex;
  margin-left:50px
}

.vertical-container {
  display: flex;
  flex-direction: column;
}

.user-image {
  background-color: #ca473d;
  text-align: left;
  margin-bottom: 10px;
  display: flex;

}

.user-image:last-child {
  margin-bottom: 0;
}

/* Estilo para la imagen de Odin */
.img-odin {
  max-width: 50%; /* Ajusta el tamaño según tus preferencias */
  margin-left: 50px
}

.img-stone {
  max-width: 100%;
  margin-right: 5px;
  margin-left: 10px;

}

.image-input-short {
  width: 30px;
  margin-left: 0px;
  margin-right: 0px;
}

.gods-set {
  text-align: center;
}

.container-gods-set {
  display: flex;
  justify-content: space-between; /* Espacia los elementos equitativamente dentro del contenedor */
  align-items: center; /* Centra verticalmente los elementos dentro del contenedor */
  background-color: #3d54ca;
}

.img-godSet {
  max-width: 100%;
  /* Quita el margen de las imágenes individuales */
}
.kirin {
  text-align: center;
}

.label-total {
width: 100px;
}
</style>