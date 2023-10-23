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
          :class="{ 'highlighted-row': user.id === highlightedRow }"
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
import { ref, onMounted, watch } from 'vue';
import { getDatabase, ref as rtdbRef, get as rtdbGet } from 'firebase/database';
const highlightedRow = ref(null);

const highlightRow = (userId) => {
  highlightedRow.value = userId;
};

const unhighlightRow = () => {
  highlightedRow.value = null;
};
const displayedUsers = ref([]);
const usersPerPage = 10;
let currentPage = 1;
const currentDateIndex = ref(0);
const currentDay = ref('');
let sortColumn = ref('');
let sortDirection = ref('asc'); // Ascendente por defecto

const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

const datesInCurrentMonth = ref([]);

const loadDatesInCurrentMonth = () => {
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    datesInCurrentMonth.value.push(currentDate.toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() + 1);
  }
};

const loadUsersByDate = async () => {
  const db = getDatabase();
  if (currentDateIndex.value >= 0 && currentDateIndex.value < datesInCurrentMonth.value.length) {
    const date = datesInCurrentMonth.value[currentDateIndex.value];
    const dateRef = rtdbRef(db, 'backup/' + date);

    try {
      const snapshot = await rtdbGet(dateRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const usersArray = Object.keys(userData).map((userId) => ({
          id: userId,
          ...userData[userId],
        }));
        displayedUsers.value = usersArray;
      } else {
        displayedUsers.value = [];
        console.warn('No se encontraron datos en la fecha ' + date);
      }
    } catch (error) {
      console.error('Error al cargar datos de la fecha ' + date + ':', error);
    }
  }
  currentDay.value = datesInCurrentMonth.value[currentDateIndex.value];
};

const loadPrevPage = () => {
  if (currentDateIndex.value > 0) {
    currentDateIndex.value -= 1;
    loadUsersByDate();
    isFirstPage.value = currentDateIndex.value === 0;
    isLastPage.value = false;
  } else {
    isFirstPage.value = true;
  }
};

const isFirstPage = ref(false);
const isLastPage = ref(false);

const loadNextPage = () => {
  const today = new Date();
  today.setDate(today.getDate() - 1);

  if (currentDateIndex.value < datesInCurrentMonth.value.length - 1) {
    const currentDate = new Date(datesInCurrentMonth.value[currentDateIndex.value]);

    if (currentDate < today) {
      currentDateIndex.value += 1;
      loadUsersByDate();
      isFirstPage.value = false;
    } else {
      isLastPage.value = true;
    }
  }
};
const sortTable = (column) => {
  // Revisa la dirección de orden actual y cambia entre ascendente y descendente
  if (sortColumn === column) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    // Si se hace clic en una nueva columna, establece la columna y dirección de orden
    sortColumn = column;
    sortDirection = 'asc';
  }

  // Realiza la clasificación en función de la columna y dirección de orden
  displayedUsers.value.sort((a, b) => {
    // Asumo que los valores en las columnas son cadenas, si son números, ajusta la lógica
    if (sortDirection === 'asc') {
      return a[column] > b[column] ? 1 : -1;
    } else {
      return a[column] < b[column] ? 1 : -1;
    }
  });
};

onMounted(() => {
  loadDatesInCurrentMonth();
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  const formattedDate = currentDate.toISOString().slice(0, 10);
  currentDateIndex.value = datesInCurrentMonth.value.indexOf(formattedDate);

  if (currentDateIndex.value === -1) {
    currentDateIndex.value = datesInCurrentMonth.value.length - 1;
  }

  loadUsersByDate();
});

watch(currentDateIndex, () => {
  currentDay.value = datesInCurrentMonth.value[currentDateIndex.value];
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

/* Estilos para filas destacadas */
.highlighted-row {
  background-color: #687377;
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

sortable-header.active {
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
.highlighted-row:hover {
  background-color: hsl(5, 42%, 31%) /* Cambia el color de fondo al pasar el puntero */
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
