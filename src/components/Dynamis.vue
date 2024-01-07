<template>
  <div class="container">
    <div class="content-title">
      <img src="@/components/dynamis/coffergil-ffxi.webp" alt="Coffer Gil Image" width="225" height="225">
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div class="content-button-edit" v-if="userRole === 'JARL'">
      <button class="button" @click="toggleEditing">{{ isEditing ? 'Close add dynamis' : 'Add Dynamis' }}</button>
      &nbsp;&nbsp;
      <button class="button" @click="toggleEditingNext">{{ isEditingNext ? 'Close next event' : 'Add Event' }}</button>
    </div>
    <br>
    <div class="content-title" v-if="isEditing && 'JARL'">
      <h1>Dynamis Distribution</h1>
      <br>
      <label for="main-job" class="field-label">Total Amount to Distribute</label>
      <span v-if="isEditing"><input type="number" v-model="totalGil" min="1" @input="calculateDistribution"/></span>
      <span v-else class="editable-value">{{ dynamis.value.gil }}</span>
      {{ formatGil(totalGil) }}
      <div>
        <br>
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
          <span v-if="usersHalfIDs.includes(index)">{{ user.name }} Receives: {{ formatGil(user.amount) }} Gil.</span> &nbsp;&nbsp;
          <span v-else-if="userZeroIDs.includes(index)">{{ user.name }} Receives (0%): {{ formatGil(user.amount) }} Gil.</span>
          <span v-else>{{ user.name }} Receives (100%): {{ formatGil(user.amount) }} Gil.</span>
          <input type="checkbox" v-if="!userZeroIDs.includes(index)" :id="'user-half-' + index" :value="index" v-model="usersHalfIDs">
          <label v-if="!userZeroIDs.includes(index)" :for="'user-half-' + index">50%</label>
          <input type="checkbox" :id="'user-zero-' + index" :value="index" v-model="userZeroIDs">
          <label :for="'user-zero-' + index">0%</label>
        </p>
      </div>
    </div>


    <div>
      <div class="content-title" v-if="isEditingNext && (userRole === 'JARL')">
        <h1>Next Dynamis event</h1>
        <br>
        <div v-for="(nextEvent, eventIndex) in dynamisEvents" :key="eventIndex">
          <label for="dynamis-date" class="field-label">Select Date: </label>
          <span v-if="isEditingNext">
          <input type="date" v-model="nextEvent.date">
        </span>
          <span v-else class="editable-value">{{ nextEvent.date }}</span>&nbsp;&nbsp;
          <label for="dynamis-select" class="field-label">Dynamis: </label>
          <span v-if="isEditingNext">
          <select v-model="nextEvent.dynamis" class="login-input" id="dynamis-select">
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
          </select>
        </span>
          <span v-else class="editable-value">{{ nextEvent.dynamis }}</span>
        </div>
        <br>
        <div class="content-button-edit">
          <button class="button" @click="clearFieldsNextDynamis"> Clear Fields</button> &nbsp;&nbsp;
          <button class="button" @click="saveNextEvent"> Save Next Dynamis Event</button>
        </div>
      </div>
    </div>
    <br>
    <div class="next-dynamis-title">
      <h2>Next Dynamis</h2>
    </div>
    <div class="event-container" v-if="!checkNoDateAvailable()">

      <div class="event-row">
        <div
            v-for="(nextEvent, eventIndex) in dynamisEvents"
            :key="eventIndex"
            class="event-item"
        >
          <div class="event-details" v-if="nextEvent.dynamis !== 'No dynamis available'">
            <!-- Verificar si dynamis y date están definidos y no son cadenas vacías -->
            <h2 class="event-title">{{ nextEvent.dynamis }}</h2>
            <h3 v-if="nextEvent.date !== 'No date available'">{{ nextEvent.date }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="event-details">Coming soon....</p>
    </div>
    <br>
<!--    ##############################################Tablas###########################################################-->
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
          <td :style="{ cursor: dynamisData.totalGil === 0 ? 'wait' : 'default' }">
            {{ dynamisData.totalGil === 0 ? 'Processing' : formatGil(dynamisData.totalGil) }}
          </td>
          <td>{{ dynamisData.totalUsers }}</td>
          <td v-if="userRole === 'JARL'">
            <button @click="deleteDynamis(index)">Delete</button>
          </td>
        </tr>
        <tr v-if="expandedIndex !== null">
          <td colspan="4">
            <br>
            <div class="centered-row" @click="toggleDetails(expandedIndex)">
              <img src="@/components/dynamis/Dynamis_Statues.png" alt="Statue Image" class="statue-image" width="70"
                   height="60">
            </div>
            <h2 class="title-dynamis" @click="toggleDetails(expandedIndex)">
              <span style="color: green; font-size: 28px">❪</span>{{ expandedDynamisName }}<span
                style="color: red; font-size: 28px;">❫</span>
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
                  @mouseout="unhighlightRow()"
              >
                <td>{{ user.nombre }}</td>
                <td>{{ user.amount }} Gil</td>
                <td v-if="user.zero">0%</td>
                <td v-else-if="user.itsHalf">50%</td>
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
      <div>
        <button class="button-back" @click="goBack()">Back</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {get as rtdbGet, getDatabase, ref as rtdbRef, set as rtdbSet, remove} from 'firebase/database';
import {firebaseApp} from '@/main';

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const loading = ref(true);

const users = ref([]);
const isEditing = ref(false);
const isEditingNext = ref(false);
const expandedIndex = ref(null);
const expandedDynamisName = ref('');

const dynamis = ref({
  name: '',
  gil: 0,
  date: '',
});

const checkNoDateAvailable = () => {
    return dynamisEvents.value.every(event => event.date === 'No date available');
};

const allUsersSelected = ref(false);
function selectAllUsers() {
  if (allUsersSelected.value) {
    selectedUsersIDs.value = sortedUsers.value.map((user, index) => ({index, user}));
  } else {
    selectedUsersIDs.value = [];
  }
}

const dynamisEvents = ref([
]);
const clearFieldsNextDynamis = () => {
  // Reiniciar los valores de los campos
  dynamisEvents.value.forEach(event => {
    event.date = ''; // Puedes asignar un valor predeterminado si es necesario
    event.dynamis = ''; // Puedes asignar un valor predeterminado si es necesario
  });
  deleteNextDynamis()
};


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
const toggleEditingNext = () => {
  if (isEditingNext.value) {
    // saveUserData(user.value);
  }
  isEditingNext.value = !isEditingNext.value;
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
const userZeroIDs = ref([]);

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
  const amountUsersZero = userZeroIDs.value.length;

  const selectedUsers = selectedUsersIDs.value.map(({ index, user }) => ({
    index,
    user,
    isHalf: usersHalfIDs.value.includes(index),
    isZero: userZeroIDs.value.includes(index),
  }));

  const amountPerUser = totalGil.value / amountSelectedUsers;
  const amountTotalHalf = usersHalfIDs.value.reduce((total, id) => total + amountPerUser / 2, 0);
  const remainingAmount = totalGil.value - amountTotalHalf;

  selectedUsers.forEach(({ index, isHalf, isZero }) => {
    if (isHalf) {
      usersDynamis[index].amount = amountPerUser / 2;
    } else if (isZero) {
      usersDynamis[index].amount = 0;
    }
  });

  // Redistribuir el monto restante entre usuarios no marcados como 50% ni como 0%
  const nonHalfNonZeroUsers = amountSelectedUsers - amountUsersHalf - amountUsersZero;

  selectedUsers.forEach(({ index, isHalf, isZero }) => {
    if (!isHalf && !isZero) {
      usersDynamis[index].amount = remainingAmount / nonHalfNonZeroUsers;
    }
  });
};


  // Asignar el 50% solo a los usuarios seleccionados con 50%
  usersHalfIDs.value.forEach(index => {
    if (selectedUsersIDs.value.some(user => user.index === index)) {
      usersDynamis[index].amount = amountPerUser / 2;
    }
  });
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
const deleteNextDynamis = async () => {
  try {

    const dynamisRef = rtdbRef(db, `next_dynamis/`);

    // Realiza la eliminación de datos en la base de datos
    await remove(dynamisRef);

    // Borra la selección localmente en tu aplicación
    selectedUsersIDs.value = [];
    usersHalfIDs.value = [];
    await saveNextEventEmpty()
  } catch (error) {
    console.error('Error al borrar datos:', error);
  }
};
const saveNextEvent = async () => {
  try {
    const nextEventRefs = [];
    dynamisEvents.value.forEach((event, index) => {
      if (event !== undefined && event !== []) {
        const dynamisRef = rtdbRef(db, `next_dynamis/${event.dynamis}-${event.date}`);
        nextEventRefs.push(rtdbSet(dynamisRef, event));
      }
    });

    // await Promise.all(nextEventRefs);
    console.log('Next Dynamis events saved successfully!');
  } catch (error) {
    console.error('Error saving Next Dynamis events:', error);
  }
};
const saveNextEventEmpty = async () => {
  try {
    const nextEventRefs = [];
        const dynamisRef = rtdbRef(db, `next_dynamis/`);
        nextEventRefs.push(rtdbSet(dynamisRef, ""));


    // await Promise.all(nextEventRefs);
    console.log('Next Dynamis events saved successfully!');
  } catch (error) {
    console.error('Error saving Next Dynamis events:', error);
  }
};
const loadNextDynamisData = async () => {
  try {
    const nextDynamisRef = rtdbRef(db, 'next_dynamis');
    const snapshot = await rtdbGet(nextDynamisRef);

    if (snapshot.exists()) {
      const nextDynamisData = snapshot.val();
      console.log('nextDynamisData:', nextDynamisData);

      const currentDate = new Date();

      const updatedDynamisEvents = [];

      for (const key in nextDynamisData) {
        if (key !== '-') {
          const eventData = {
            date: nextDynamisData[key].date || 'No date available',
            dynamis: nextDynamisData[key].dynamis || 'No dynamis available',
          };

          const eventDate = new Date(eventData.date);

          console.log(currentDate.getDate() + "-" + currentDate.getUTCMonth() + 1 + "-" + currentDate.getFullYear()  +"  -----  "+ eventDate.getDate() + "-" + eventDate.getUTCMonth() + 1+ "-" + eventDate.getFullYear())


          if (
              new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  currentDate.getDate()
              ) <=
              new Date(
                  eventDate.getFullYear(),
                  eventDate.getMonth(),
                  eventDate.getDate()
              )
          ){
            updatedDynamisEvents.push(eventData);
          } else {
            const eventRef = rtdbRef(db, `next_dynamis/${key}`);
            await remove(eventRef); // Elimina eventos posteriores a la fecha actual
          }
        }
      }

      // Asegura que siempre haya al menos 4 eventos
      while (updatedDynamisEvents.length < 4) {
        updatedDynamisEvents.push({ date: 'No date available', dynamis: 'No dynamis available' });
      }

      dynamisEvents.value = updatedDynamisEvents.slice(0, 4); // Actualiza dynamisEvents
      dynamisEvents.value.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateA - dateB;
      });
    }
  } catch (error) {
    console.error('Error loading Next Dynamis data:', error);
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
        zero: userZeroIDs.value.includes(index),
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
watch([totalGil, sortedUsers, selectedUsersIDs, usersHalfIDs, userZeroIDs], () => {
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
        zero: false,
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
  await loadNextDynamisData();
  sortByColumn('date');
});
</script>
<style scoped>
.container {
  margin: 0 150px 150px;
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

.content-button-edit {
  display: flex;
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
.next-dynamis-title {
  text-align: center;
  margin-bottom: 20px; /* Espacio entre el título y los eventos */
}

.next-dynamis-title h2 {
  font-size: 28px; /* Tamaño del texto del título */
  color: #333; /* Color del texto */
  /* Otros estilos según tus preferencias */
}
.event-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.event-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0;
}

.event-item {
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  flex: 1 0 200px; /* Ajusta el ancho máximo deseado o utiliza otro valor */
  max-width: 300px; /* Ajusta el ancho máximo deseado o utiliza otro valor */
}

.event-title {
  font-size: 24px;
  margin-bottom: 8px;
  white-space: nowrap; /* Evita que el texto se divida en múltiples líneas */
  overflow: hidden; /* Opcional: oculta el texto que desborda */
  text-overflow: ellipsis; /* Opcional: agrega puntos suspensivos para indicar que el texto se corta */
}

h3 {
  font-size: 18px;
  color: #666;
}

/* Estilo específico para ocultar el borde cuando no hay datos */
.event-details:not(:empty) {
  text-align: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.event-details:not(:empty) h2:last-child,
.event-details:not(:empty) h3:last-child {
  border: none;
  margin-bottom: 0;
}
</style>