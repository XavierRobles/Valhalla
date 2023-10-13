<template>
  <div class="home">
    <div class="event-table-config">
      <table class="event-table">
        <thead>
        <tr>
          <th>Config</th>
          <th>Event</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(value, field) in eventData" :key="field">
          <td>{{ field }}</td>
          <td>{{ value }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="chart">
      <h2>Activity Chart</h2>
      <canvas id="mainChart"/>
    </div>
    <div class="content">
      <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="325" height="325"/>
      <h3><span class="title">VALHALLA</span></h3>
      <router-link v-if="userRole === 'JARL'" to="/SystemManager" class="system-manager">System Manager</router-link>
      <table class="textColor">
        <thead>
        <tr>
          <th @click="sortTable('name')" class="sortable-header">Name <span
              :class="sortColumn === 'name' ? sortDirection : ''"></span></th>
          <th @click="sortTable('dkp')" class="sortable-header">DKP <span
              :class="sortColumn === 'dkp' ? sortDirection : ''"></span></th>
          <th @click="sortTable('dynamis_dkp')" class="sortable-header">Dynamis DKP <span
              :class="sortColumn === 'dynamis_dkp' ? sortDirection : ''"></span></th>
          <th @click="sortTable('main_job')" class="sortable-header">Main Job <span
              :class="sortColumn === 'main_job' ? sortDirection : ''"></span></th>
          <th @click="sortTable('sub_job')" class="sortable-header">Sub Job <span
              :class="sortColumn === 'sub_job' ? sortDirection : ''"></span></th>
          <th @click="sortTable('sub_job_2')" class="sortable-header">Sub Job 2 <span
              :class="sortColumn === 'sub_job_2' ? sortDirection : ''"></span></th>
          <th @click="sortTable('craft')" class="sortable-header" :class="sortColumn === 'craft' ? sortDirection : ''">
            Craft <span>/</span> lv <span :class="sortColumn === 'craft_level' ? sortDirection : ''"></span></th>
          <th @click="sortTable('event')" class="sortable-header">Event <span
              :class="sortColumn === 'event' ? sortDirection : ''"></span></th>
          <th @click="sortTable('sky')" class="sortable-header">Sky <span
              :class="sortColumn === 'sky' ? sortDirection : ''"></span></th>
          <th @click="sortTable('sea')" class="sortable-header">Sea <span
              :class="sortColumn === 'sea' ? sortDirection : ''"></span></th>
          <th @click="sortTable('dynamis')" class="sortable-header">Dynamis <span
              :class="sortColumn === 'dynamis' ? sortDirection : ''"></span></th>
          <th @click="sortTable('overall')" class="sortable-header">Overall <span
              :class="sortColumn === 'overall' ? sortDirection : ''"></span></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, index) in sortedUsers" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.dkp }}</td>
          <td>{{ user.dynamis_dkp }}</td>
          <td>{{ user.main_job }}</td>
          <td>{{ user.sub_job }}</td>
          <td>{{ user.sub_job_2 }}</td>
          <td>{{ user.craft }} {{ user.craft_level }}</td>
          <td>{{ user.event }}</td>
          <td>{{ user.sky }}</td>
          <td>{{ user.sea }}</td>
          <td>{{ user.dynamis }}</td>
          <td>{{ user.overall }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {get as rtdbGet, getDatabase, ref as rtdbRef} from 'firebase/database';
import {firebaseApp} from '@/main';
import {useRouter} from 'vue-router';
import 'vue-chartjs';
import {Chart, ArcElement} from "chart.js";
Chart.register(ArcElement);

const loading = ref(true);
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const router = useRouter();
let userRole = ref('')

const users = ref([]);

const loadUsers = async () => {
  const userRef = rtdbRef(db, 'user');
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

const eventData = ref({});

const loadEventData = async () => {
  const eventOptionsRef = rtdbRef(db, 'event_options/');

  try {
    const snapshot = await rtdbGet(eventOptionsRef);
    if (snapshot.exists()) {
      eventData.value = {
        Sky: snapshot.val().skyValue,
        Sea: snapshot.val().seaValue,
        Dynamis: snapshot.val().dynamisValue,
        HNM: snapshot.val().hnmValue,
        'Hunt Group': snapshot.val().huntGroupValue,
        'Free Event': snapshot.val().freeEventValue,
        'Total LS Events': snapshot.val().total_ls_events,
      };
    } else {
      console.error('No se encontraron datos en la colección event_options.');
    }
  } catch (error) {
    console.error('Error al cargar datos de la colección event_options:', error);
  }
};


const sortColumn = ref('name');
const sortDirection = ref('');

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
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });
  return sorted;
});

const loadChartData = async () => {
  const chartElement = document.getElementById("mainChart");

  const data = {
    labels: ['Active', 'Less Active', 'AFK', 'Gone'],
    datasets: [{
      label: 'Primer Dataset',
      data:[40, 30, 20, 10],
      backgroundColor: [
        'rgb(0,255,0)',
        'rgb(247,255,0)',
        'rgb(255,0,0)',
        'rgb(121,121,121)'
      ],
      hoverOffset: 4
    }]
  }

  new Chart(chartElement,{
    type: 'pie',
    data: data,
  })
}
onMounted(async () => {
  await loadUser();
  await loadUsers();
  await loadEventData();
  await loadChartData();
});
</script>

<style scoped>
.content {
  text-align: center;
}

.title {
  font-size: 20px;
  color: #deecec;
}

.textColor {
  font-size: 12px;
  color: #deecec;
}

/* Estilos para la tabla */
table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid #deecec;
  padding: 8px;
}

th {
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

sortable-header.active {
  background-color: #deecec; /* Cambia el color de fondo cuando está activo */
}

.sortable-header:hover::after {
  opacity: 1; /* Hacer visible al pasar el cursor sobre la cabecera */
//background-color: #0065e9
}

.sortable-header:hover {
  background-color: hsl(5, 42%, 31%); /* Cambia el color de fondo al pasar el cursor sobre la cabecera */
}

.system-manager {
  display: inline-block;
  padding: 5px 10px;
  background-color: #deecec;
  color: #000000;
  text-decoration: none;
  border-radius: 5px;
  margin-bottom: 5px;
  transition: background-color 0.3s, color 0.3s; /* Transiciones suaves para color de fondo y texto */
  font-weight: bold;
}

/* Cambia el color de fondo y el texto al pasar el ratón sobre el botón */
.system-manager:hover {
  background-color: #deecec;
  color: #e74c3c;
}

/* Estilos para la tabla de eventos */
.event-table {
  width: 10%;
  border-collapse: collapse;
  margin-top: 2px; /* Espacio entre la tabla de usuarios y la tabla de eventos */
}

.event-table, .event-table th, .event-table td {
  border: 1px solid #deecec;
  padding: 8px;
}

.event-table th {
  background-color: #deecec;
  color: #000000;
}
.event-table-config {
  font-size: 10px;
  position: fixed;
  top: 120px;
  right: 10px;
  width: 10%;
  //height: 20%;
  background-color: rgba(0, 0, 0, 0); /* Color de fondo (ajusta según tus preferencias) */
  //overflow-y: auto; /* Habilita el desplazamiento vertical si el contenido es demasiado largo */
  z-index: 1; /* Coloca la tabla sobre otros elementos si es necesario */
  //border-left: 1px solid #deecec; /* Línea de separación opcional con el contenido principal */
}

.event-table {
  width: 100%;
}
.chart {
  width: 25%;
  margin-top: 10%;
  margin-bottom: -20%;
  margin-left: 5%;
}
.chart h2{
  text-align: center;
  margin-bottom: 5%;
}
</style>
<!-- userTotalEvents.value / totalLSEvents.value) * 100 -->