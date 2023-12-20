<template>
  <div class="container">
    <div class="content-title">
      <div class="centered-content">
        <h3><span class="title">Dynamis</span></h3>
      </div>
      <img src="@/components/dynamis/coffergil-ffxi.webp" alt="Coffer Gil Image" width="225" height="225">
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div class="content-title" v-if="userRole === 'JARL' || userRole === 'EARL'">
      <button class="button" @click="toggleEditing">{{ isEditing ? 'Close' : 'Add Dynamis' }}</button>
    </div>
    <br>
    <div class="content-title" v-if="isEditing && 'JARL' || userRole === 'EARL'">
      <h1>Dynamis Distribution</h1>
      <br>
      <label for="main-job" class="field-label">Total Amount to Distribute</label>
      <span v-if="isEditing"><input type="number" v-model="totalGil" min="1" @input="calculateDistribution"/></span>
      <span v-else class="editable-value">{{ dynamis.value.gil }}</span>
      {{formatGil(totalGil) }}
      <div>
        <br>
        <label for="sub-job" class="field-label">Date:</label>
        <label for="dynamis-date" class="field-label">Select Date:</label>
        <span v-if="isEditing">
  <input type="date" id="dynamis-date" v-model="dynamis.date" @input="validateDate"></span>
        <span v-else class="editable-value">{{ dynamis.date || getCurrentDate }}</span>
        <br>
        <br>
        <label for="sub-job" class="field-label">Dynamis:</label>
        <span v-if="isEditing"><select v-model="dynamis.name" class="login-input" id="dynamis-select">
                <option value="Dynamis - San d'Oria">Dynamis - San d'Oria</option>
                <option value="Dynamis - Windurst">Dynamis - Windurst</option>
                <option value="Dynamis - Bastok">Dynamis - Bastok</option>
                <option value="Dynamis - Jeuno">Dynamis - Jeuno</option>
                <option value="Dynamis - Beaucedine">Dynamis - Beaucedine</option>
                <option value="Dynamis - Xarcabard">Dynamis - Xarcabard</option>
                <option value="Dynamis - Valkurm">Dynamis - Valkurm</option>
                <option value="Dynamis - Buburimu">Dynamis - Buburimu</option>
                <option value="Dynamis - Qufim">Dynamis - Qufim</option>
                <option value="Dynamis - Tavnazia">Dynamis - Tavnazia</option>
              </select></span>
        <span v-else class="editable-value"> {{ dynamis.name }} </span>
      </div>
      <br>
      <!--  ######################################################User list Checkbox#####################################-->
      <div v-if="isEditing" class="left-half">
        <div class="setting-values">
          <input type="checkbox" id="selectAll" @change="selectAllUsers" v-model="allUsersSelected">
          <label for="selectAll">Select All</label>
          <ul class="user-list">
            <li v-for="(user, index) in sortedUsers" :key="user.userId">
              <label class="selectable-label" @click="toggleCheckbox(user.userId)">
                <input type="checkbox" :id="'user' + user.userId" :value="{ index, user }" v-model="selectedUsersIDs">
                {{ user.name }} &nbsp;&nbsp;
              </label>
            </li>
          </ul>
        </div>
      </div>
      <label class="userCounter" v-if="selectedUsersIDs.length >0">Total members: {{ selectedUsersIDs.length }}</label>
      <br>
      <div v-if="selectedUsersIDs.length >0 && isEditing">
        <button class="button" @click="clearSelection">Clear</button>
        <button class="button apply" @click="applyChanges">Apply</button>
      </div>
      <br>
    </div>
    <div v-if="isEditing" class="userSelected">
      <div v-for="(user, index) in usersDynamis" :key="index">
        <p v-if="usersHalfIDs.includes(index)">
          {{ user.name }} Receives (50%): {{ formatGil(user.amount) }} Gil.
          <input type="checkbox" :id="'user-mitad-' + index" :value="index" v-model="usersHalfIDs">
        </p>
        <p v-else-if="selectedUsersIDs.some(selected => selected.index === index)">
          {{ user.name }} Receives: {{ formatGil(user.amount) }} Gil. &nbsp;&nbsp;
          <input type="checkbox" :id="'user-half-' + index" :value="index" v-model="usersHalfIDs">
          <label :for="'user-half-' + index">50%</label>
        </p>
      </div>
    </div>
    <div class="centered-row">
      <table class="data-table">
        <thead>
        <tr>
          <th @click="sortByColumn('dynamisName')" class="sortable-header">Dynamis Name
          </th>
          <th @click="sortByColumn('date')" class="sortable-header">Date</th>
          <th @click="sortByColumn('totalGil')" class="sortable-header">
            Total Gil
            <img src="@/components/dynamis/gil.png" alt="Gil Image" class="gil-header-image" width="15" height="15">
          </th>
          <th class="sortable-header" @click="sortByColumn('totalUsers')">Total Users
            <img src="@/components/dynamis/user.webp" alt="Gil Image" class="gil-header-image" width="20" height="20">
          </th>
          <th v-if="userRole === 'JARL'" class="sortable-header">Delete</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(dynamisData, index) in sortedDynamisCollection"
            :key="index"
            :class="{ 'highlighted-row': index === highlightedRowIndex }"
            @mouseover="highlightRow(index)"
            @mouseout="unhighlightRow()"
            @click="toggleDetails(index)"
        >
          <td>{{ dynamisData.dynamisName }}</td>
          <td>{{ dynamisData.date }}</td>
          <td>{{ dynamisData.totalGil === 0 ? 'processing' : formatGil(dynamisData.totalGil) }}</td>
          <td>{{ dynamisData.totalUsers }}</td>
          <td v-if="userRole === 'JARL'">
            <button @click="deleteDynamis(index)">Delete</button>
          </td>
        </tr>
        <tr v-if="expandedIndex !== null">
          <td colspan="4">
            <br>
            <div class="centered-row" @click="toggleDetails(expandedIndex)">
              <img src="@/components/dynamis/Dynamis_Statues.png" alt="Statue Image" class="statue-image"  width="70" height="60">
            </div>
            <h2 class="title-dynamis" @click="toggleDetails(expandedIndex)">
              <span style="color: green; font-size: 28px">❪</span>{{ expandedDynamisName }}<span style="color: red; font-size: 28px;">❫</span>
            </h2>
            <table class="data-table">
              <thead>
              <tr>
                <th class="sortable-header">Name</th>
                <th class="sortable-header">Amount</th>
                <th class="sortable-header">%</th>
                <th class="sortable-header" v-if="userRole === 'JARL'">Paid</th>
                <th class="sortable-header" v-else>Paid</th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="(user, username) in dynamisCollection[expandedIndex].usersDetails"
                  :key="username"
                  :class="{ 'highlighted-row': username === highlightedRowIndex }"
                  @mouseover="highlightRow(username)"
                  @mouseout="unhighlightRow()">

                <td>{{ user.nombre }}</td>
                <td>{{ user.amount }} Gil</td>
                <td v-if="user.itsHalf">50%</td>
                <td v-else>100%</td>
                <td v-if="userRole === 'JARL'">
                  <input type="checkbox" :id="'paid-' + username" v-model="user.paid" @change="updatePayment(user)">
                  <label :for="'paid-' + username">Paid</label>
                </td>
                <td v-else>
                  <span v-if="user.paid">Yes</span>
                  <span v-else>No</span>
                </td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
      <div>  <button class="button-back" @click="goBack()">Back</button></div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {get as rtdbGet, getDatabase, ref as rtdbRef, set as rtdbSet, remove } from 'firebase/database';
import {firebaseApp} from '@/main';

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const loading = ref(true);

const users = ref([]);
const isEditing = ref(false);
const expandedIndex = ref(null);
const expandedDynamisName = ref('');

const dynamis = ref({
  name: '',
  gil: 0, //en k
  date: '',
});

const allUsersSelected = ref(false);
function selectAllUsers() {
  if (allUsersSelected.value) {
    selectedUsersIDs.value = sortedUsers.value.map((user, index) => ({ index, user }));
  } else {
    selectedUsersIDs.value = [];
  }
}
const toggleCheckbox = (userId) => {
  const checkbox = document.getElementById('user' + userId);
  checkbox.checked = !checkbox.checked;
};
const toggleDetails = (index) => {
  expandedIndex.value = expandedIndex.value === index ? null : index;
  if (expandedIndex.value !== null) {
    expandedDynamisName.value = dynamisCollection.value[index].dynamisName + ":  " + dynamisCollection.value[index].date;

  } else {
    expandedDynamisName.value = '';
  }
};
const toggleEditing = () => {
  if (isEditing.value) {
    // saveUserData(user.value);
  }
  isEditing.value = !isEditing.value;
};

const clearSelection = () => {
  selectedUsersIDs.value = [];
};

const sortedColumn = ref('');
const isAscending = ref(true);

const sortedDynamisCollection = computed(() => {
  const sortedCollection = dynamisCollection.value.slice();

  if (sortedColumn.value) {
    sortedCollection.sort((a, b) => {
      const modifier = isAscending.value ? 1 : -1;
      const valA = a[sortedColumn.value];
      const valB = b[sortedColumn.value];

      if (valA < valB) return -1 * modifier;
      if (valA > valB) return 1 * modifier;
      return 0;
    });
  }

  return sortedCollection;
});

const sortByColumn = (columnName) => {
  if (sortedColumn.value === columnName) {
    isAscending.value = !isAscending.value;
  } else {
    sortedColumn.value = columnName;
    isAscending.value = true;
  }
  expandedIndex.value = null
  dynamisCollection.value.sort((a, b) => {
    const modifier = isAscending.value ? 1 : -1;
    const valA = a[columnName];
    const valB = b[columnName];

    if (valA < valB) return -1 * modifier;
    if (valA > valB) return 1 * modifier;
    return 0;
  });
};

const highlightRow = (index) => {
  highlightedRowIndex.value = index;
};

const unhighlightRow = () => {
  highlightedRowIndex.value = -1; // Cuando el cursor se mueve fuera de la fila, se restablece a -1
};
const highlightedRowIndex = ref(-1); // Valor inicial, -1 significa ninguna fila resaltada

let sortColumn = ref('name');
let sortDirection = ref('asc');

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

const totalGil = ref(0);
let usersDynamis = [];
const selectedUsersIDs = ref([]);
const usersHalfIDs = ref([]);

// Función para formatear la cantidad

const formatGil = (amount) => {
  const formattedAmount = parseFloat(amount).toFixed(0);

  const decimals = formattedAmount.split('.')[1];
  if (decimals !== '000') {
    const formattedAmount = Math.floor(amount / 1000) * 1000;
    return formattedAmount.toLocaleString();
  }

  return formattedAmount.toLocaleString();
};

const createUserList = () => {
  usersDynamis = sortedUsers.value.map((user, index) => ({
    name: user.name,
    amount: user.amount,
    itsHalf: false,

  }));
};

const applyChanges = () => {
  saveDynamisData()
};
// Función para calcular la distribución entre los usuarios seleccionados
const calculateDistribution = () => {
  const amountSelectedUsers = selectedUsersIDs.value.length;
  const amountUsersHalf = usersHalfIDs.value.length;

  const selectedUsers = selectedUsersIDs.value.map(({index, user}) => ({
    index,
    user,
    isHalf: usersHalfIDs.value.includes(index),
  }));

  const amountPerUser = totalGil.value / amountSelectedUsers;
  const amountTotalHalf = usersHalfIDs.value.reduce((total, id) => total + amountPerUser / 2, 0);
  const remainingAmount = totalGil.value - amountTotalHalf;

  // Si todos los usuarios están marcados como mitad, repartir el Gil entre ellos
  if (amountUsersHalf === amountSelectedUsers) {
    selectedUsers.forEach(({index}) => {
      usersDynamis[index].amount = amountPerUser / 2;
    });
  } else {
    selectedUsers.forEach(({index, isHalf}) => {
      if (!isHalf) {
        usersDynamis[index].amount = remainingAmount / (amountSelectedUsers - amountUsersHalf);
      }
    });
  }

  // Asignar el 50% solo a los usuarios seleccionados con 50%
  usersHalfIDs.value.forEach(index => {
    if (selectedUsersIDs.value.some(user => user.index === index)) {
      usersDynamis[index].amount = amountPerUser / 2;
    }
  });
};
const deleteDynamis = async (index) => {
  try {
    const dynamisName = dynamisCollection.value[index].dynamisName;
    const dynamisDate = dynamisCollection.value[index].date;

    const confirmation = window.confirm(`Are you sure you want to delete Dynamis ${dynamisName} on ${dynamisDate}? This action cannot be undone.`);

    if (confirmation) {
      const dynamisRef = rtdbRef(db, `dynamis/${dynamisName}-${dynamisDate}`);
      await remove(dynamisRef);
      dynamisCollection.value.splice(index, 1);
      location.reload();
    }
  } catch (error) {
    console.error('Error deleting Dynamis:', error);
  }
};


const validateDate = () => {
  if (!dynamis.date) {
    dynamis.date = getCurrentDate();
  }
};
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const updatePayment = async (user) => {
  try {
    const dynamisRef = rtdbRef(db, `dynamis/${dynamisCollection.value[expandedIndex.value].dynamisName}-${dynamisCollection.value[expandedIndex.value].date}`);
    const snapshot = await rtdbGet(dynamisRef);

    if (snapshot.exists()) {
      const dynamisData = snapshot.val();
      const usersDetails = dynamisData.usersDetails;

      // Encuentra el usuario específico en usersDetails y actualiza el campo paid
      for (const userName in usersDetails) {
        if (usersDetails[userName].id === user.id) {
          usersDetails[userName].paid = user.paid;
          break;
        }
      }

      // Actualiza el campo usersDetails en la base de datos
      await rtdbSet(dynamisRef, {...dynamisData, usersDetails});
    }
  } catch (error) {
    console.error('Error updating payment:', error);
  }
};


const saveDynamisData = async () => {
  if (!isEditing.value || selectedUsersIDs.value.length === 0 || !dynamis.value.name || dynamis.value.name === '') {

    const dynamisSelect = document.getElementById('dynamis-select');
    if (dynamisSelect) {
      dynamisSelect.classList.add('error');
      dynamisSelect.focus();
    }

    return;
  }
  if (!dynamis.value.date) {
    dynamis.value.date = getCurrentDate();
  }

  try {
    const dynamisName = dynamis.value.name;
    const formattedDate = dynamis.value.date;
    const usersDetailsObj = {};
    selectedUsersIDs.value.forEach(({index, user}) => {
      const userName = user.name;
      usersDetailsObj[userName] = {
        id: user.id,
        nombre: userName,
        amount: formatGil(usersDynamis[index].amount),
        itsHalf: usersHalfIDs.value.includes(index),
        paid: false,
        dynamisName: dynamisName,
      };
    });


    const dynamisRef = rtdbRef(db, `dynamis/${dynamisName}-${formattedDate}`);
    await rtdbSet(dynamisRef, {
      dynamisName,
      date: formattedDate,
      totalGil: parseFloat(totalGil.value),
      usersDetails: usersDetailsObj,
      totalUsers: selectedUsersIDs.value.length,
    });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
  }
  location.reload();
};

// Observadores para recalcular la distribución cuando cambian los valores
watch([totalGil, sortedUsers, selectedUsersIDs, usersHalfIDs], () => {
  createUserList();
  calculateDistribution();
});
const loadUsers = async () => {
  const userRef = rtdbRef(db, 'user/');
  try {
    const snapshot = await rtdbGet(userRef);
    if (snapshot.exists()) {
      users.value = Object.keys(snapshot.val()).map((userId) => ({
        id: userId,
        amount: 0,
        itsHalf: false,
        ...snapshot.val()[userId],
      }));
    }
    loading.value = false;
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
import {useRouter} from 'vue-router';

const router = useRouter();
const goBack = () => {
  router.go(-1);
};
const dynamisCollection = ref([]);

const loadDynamisData = async () => {
  try {
    const dynamisRef = rtdbRef(db, 'dynamis');
    const snapshot = await rtdbGet(dynamisRef);

    if (snapshot.exists()) {
      const dynamisData = snapshot.val();
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

      // Array para almacenar dinámicas que no se eliminarán
      const validDynamis = [];

      for (const key of Object.keys(dynamisData)) {
        const dynamisDate = new Date(dynamisData[key].date);
        if (dynamisDate <= twoMonthsAgo) {
          // Eliminar dinámicas con más de dos meses de antigüedad
          await rtdbSet(rtdbRef(db, `dynamis/${key}`), null);
        } else {
          // Agregar dinámicas válidas al array
          validDynamis.push(dynamisData[key]);
        }
      }

      // Actualizar el estado con las dinámicas válidas
      dynamisCollection.value = validDynamis;
    }
  } catch (error) {
    console.error('Error loading Dynamis data:', error);
  }
};

onMounted(async () => {
  await loadUser();
  await loadUsers();
  await loadDynamisData();
});
</script>
<style scoped>
.container {
  margin: 0 200px 200px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

.userCounter {
  font-size: 16px;
  color: #079009;
  font-weight: bold;
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

.centered-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
}

.left-half {
  width: 50%;
  display: inline-block;
  box-sizing: border-box;
  text-align: right;
  vertical-align: top;
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

.apply {
  margin: 15px;
  font-size: 15px;
}

.userSelected {
  margin-left: 200px;
  font-size: 15px;

}

.error {
  border-color: red; /* Cambia el color del borde a rojo */
}

table {
  width: 100%;
  border-collapse: collapse;

}

table, th, td {
  border: 1px solid #687377;
  padding: 8px;

}

table, th, td {
  border: 1px solid #687377;
  padding: 8px;
  cursor: pointer;

}
.data-table {
}

th {
  background-color: #687377;
  cursor: pointer; /* Cambia el cursor al pasar sobre las cabeceras */
  user-select: none; /* Evita la selección de texto al hacer clic */
  transition: background-color 0.2s ease-in-out; /* Transición suave del color de fondo */
  font-weight: bold;
}

.sortable-header {
  position: relative; /* Para el efecto de relieve */
}

.sortable-header::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 35px solid transparent;
  border-right: 35px solid transparent;
  border-top: 5px solid #ca473d;
  opacity: 0; /* Inicialmente invisible */
  transition: opacity 0.2s ease-in-out;
}

.sortable-header.active {
  background-color: #deecec; /* Cambia el color de fondo cuando está activo */
}

.sortable-header:hover::after {
  opacity: 1; /* Hacer visible al pasar el cursor sobre la cabecera */
//background-color: #0065e9
}

.sortable-header:hover {
  background-color: hsl(5, 42%, 31%); /* Cambia el color de fondo al pasar el cursor sobre la cabecera */
}

.highlighted-row:hover {
  background-color: hsl(5, 42%, 31%) /* Cambia el color de fondo al pasar el puntero */
}
.title {
  font-size: 46px; /* Tamaño de fuente más grande */
  font-weight: bold; /* Texto en negrita */
  color: #00ff50; /* Color del texto (puedes cambiarlo según tus preferencias) */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Sombra de texto (opcional) */
}
.title-dynamis {
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
.centered-row {
  text-align: center;
}
.selectable-label {
  user-select: none
 }
</style>