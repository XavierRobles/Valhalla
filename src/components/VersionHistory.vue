<template>
  <div class="version-history">
    <h2>{{ currentDay }}</h2>
    <div class="button-day">
      <button class="button-day" @click="loadPrevPage" :disabled="isFirstPage">Prev</button>
      <button class="button-day" @click="loadNextPage" :disabled="isLastPage">Next</button>
    </div>
    <table v-if="displayedUsers.length > 0" class="event-table">
      <thead>
      <tr>
        <th @click="sortTable('name')" class="sortable-header">Name <span :class="sortColumn === 'name' ? sortDirection : ''"></span></th>
        <th @click="sortTable('dkp')" class="sortable-header">DKP <span :class="sortColumn === 'dkp' ? sortDirection : ''"></span></th>
        <th @click="sortTable('dynamis_dkp')" class="sortable-header">Dynamis DKP <span :class="sortColumn === 'dynamis_dkp' ? sortDirection : ''"></span></th>
        <th @click="sortTable('main_job')" class="sortable-header">Main Job <span :class="sortColumn === 'main_job' ? sortDirection : ''"></span></th>
        <th @click="sortTable('sub_job')" class="sortable-header">Sub Job <span :class="sortColumn === 'sub_job' ? sortDirection : ''"></span></th>
        <th @click="sortTable('sub_job_2')" class="sortable-header">Sub Job 2 <span :class="sortColumn === 'sub_job_2' ? sortDirection : ''"></span></th>
        <th @click="sortTable('craft')" class="sortable-header" :class="sortColumn === 'craft' ? sortDirection : ''">Craft <span>/</span> lv <span :class="sortColumn === 'craft_level' ? sortDirection : ''"></span></th>
        <th @click="sortTable('event')" class="sortable-header">Event <span :class="sortColumn === 'event' ? sortDirection : ''"></span></th>
        <th @click="sortTable('sky')" class="sortable-header">Sky <span :class="sortColumn === 'sky' ? sortDirection : ''"></span></th>
        <th @click="sortTable('sea')" class="sortable-header">Sea <span :class="sortColumn === 'sea' ? sortDirection : ''"></span></th>
        <th @click="sortTable('dynamis')" class="sortable-header">Dynamis <span :class="sortColumn === 'dynamis' ? sortDirection : ''"></span></th>
        <th @click="sortTable('overall')" class="sortable-header">Overall %<span :class="sortColumn === 'overall' ? sortDirection : ''"></span></th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="user in displayedUsers"
          :key="user.id"
          :class="{ 'highlighted-row': highlightedRowIndex === user.id }"
          @mouseover="highlightRow(user.id)"
          @mouseout="unhighlightRow()"
          class="row-highlight">
        <td>{{ user.name }}</td>
        <td>{{ user.dkp }}</td>
        <td>{{ user.dynamis_dkp }}</td>
        <td>{{ user.main_job }}</td>
        <td>{{ user.sub_job }}</td>
        <td>{{ user.sub_job_2 }}</td>
        <td>{{ user.craft }} / {{ user.craft_level }}</td>
        <td>{{ user.event }}</td>
        <td>{{ user.sky }}</td>
        <td>{{ user.sea }}</td>
        <td>{{ user.dynamis }}</td>
        <td>{{ user.overall }} %</td>
      </tr>
      </tbody>
    </table>
    <p v-else class="no-records">No records found</p>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { get as rtdbGet, getDatabase, ref as rtdbRef } from 'firebase/database';

const highlightedRow = ref(null);
const displayedUsers = ref([]);
const usersPerPage = 10;
let currentPage = 1;
const currentDateIndex = ref(0);
const currentDay = ref('');
let sortColumn = ref('');
let sortDirection = ref('asc');
const maxDaysToShow = 60; // Cambiar esto para mas o menos dias

const startDate = new Date();
startDate.setDate(startDate.getDate() - maxDaysToShow);

const datesInRange = ref([]);

const loadDatesInRange = () => {
  const currentDate = new Date(startDate);
  while (currentDate <= new Date()) {
    datesInRange.value.push(currentDate.toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() + 1);
  }
};

const loadUsersByDate = async (index) => {
  const db = getDatabase();
  if (index >= 0 && index < datesInRange.value.length) {
    const date = datesInRange.value[index];
    const dateRef = rtdbRef(db, 'backup/' + date);

    try {
      const snapshot = await rtdbGet(dateRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        displayedUsers.value = Object.keys(userData).map((userId) => ({
          id: userId,
          ...userData[userId],
        }));
      } else {
        displayedUsers.value = [];
        console.warn('No se encontraron datos en la fecha ' + date);
      }
    } catch (error) {
      console.error('Error al cargar datos de la fecha ' + date + ':', error);
    }
  }
  currentDay.value = datesInRange.value[index];
};

const loadPrevPage = () => {
  if (currentDateIndex.value > 0) {
    currentDateIndex.value -= 1;
    loadUsersByDate(currentDateIndex.value);
    isFirstPage.value = currentDateIndex.value === 0;
    isLastPage.value = false;
  } else {
    isFirstPage.value = true;
  }
};

const isFirstPage = ref(false);
const isLastPage = ref(false);

const loadNextPage = () => {
  if (currentDateIndex.value < datesInRange.value.length - 1) {
    currentDateIndex.value += 1;
    loadUsersByDate(currentDateIndex.value);
    isFirstPage.value = false;
  } else {
    isLastPage.value = true;
  }
};

const sortTable = (column) => {
  if (sortColumn === column) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn = column;
    sortDirection = 'asc';
  }

  displayedUsers.value.sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[column] > b[column] ? 1 : -1;
    } else {
      return a[column] < b[column] ? 1 : -1;
    }
  });
};
const highlightedRowIndex = ref(-1);
const highlightRow = (index) => {
  highlightedRowIndex.value = index;
};

const unhighlightRow = () => {
  highlightedRowIndex.value = -1; // Cuando el cursor se mueve fuera de la fila, se restablece a -1
};

onMounted(() => {
  loadDatesInRange();
  currentDateIndex.value = datesInRange.value.length - 1;
  loadUsersByDate(currentDateIndex.value);
});

watch(currentDateIndex, () => {
  currentDay.value = datesInRange.value[currentDateIndex.value];
});
</script>


<style scoped>
/* Estilos para la tabla */
.version-history {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

h2 {
  margin-bottom: 10px;
}

button {
  margin: 5px;
}

.event-table {
  width: 80%;
  border-collapse: collapse;
}

.event-table, .event-table th, .event-table td {
  border: 1px solid #687377;
  padding: 8px;
}

.event-table th {
  background-color: #687377;
  color: #000;
  font-weight: bold;
}

.no-records {
  color: #000;
  font-weight: bold;
}

.highlighted-row {
  background-color: #687377;
  transition: background-color 0.3s; /* Agrega una transición para suavizar el cambio de color */
}

.highlighted-row:hover {
  background-color: hsl(5, 42%, 31%);
}

/* Estilos para encabezados de columna ordenable */
.sortable-header {
  cursor: pointer;
}

.sortable-header:hover {
  background-color: hsl(5, 42%, 31%)
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
  background-color: #687377; /* Cambia el color de fondo cuando está activo */
}

.sortable-header:hover::after {
  opacity: 1; /* Hacer visible al pasar el cursor sobre la cabecera */
//background-color: #0065e9
}

/* Estilos para icono de dirección de ordenamiento */
.asc:after {
  content: ' ↑';
  padding-left: 5px;
}

.desc:after {
  content: ' ↓';
  padding-left: 5px;
}

.button-day {
  display: inline-block;
  padding: 5px 40px;
  background-color: #95a4ab;
  color: #000000;
  text-decoration: none;
  border-radius: 5px;
  margin-bottom: 5px;
  transition: background-color 0.3s, color 0.3s; /* Transiciones suaves para color de fondo y texto */
  font-weight: bold;
}

/* Cambia el color de fondo y el texto al pasar el ratón sobre el botón */
.button-day:hover {
  background-color: #687377;
  color: #e74c3c;
}

.button-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
