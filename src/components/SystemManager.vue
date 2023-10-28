<template>
  <div class="top-section">
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="100" height="100"/>
    <h3><span class="title">VALHALLA</span></h3>
    <div class="value-item">
      <label for="totalLsEvents">Total Ls Events:</label>
      <input type="number" id="totalLsEvents" v-model="total_ls_events" class="setting-input-total_ls"
             @input="saveEventOptions"/>
    </div>
  </div>
  <br>
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

  <div class="right-half">
    <div class="accordion-title" @click="settingToggleAccordion">
      <span class="button">Set points</span>
      <i class="fas" :class="isOpenSetting ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
    </div>
    <div v-show="isOpenSetting" class="setting-values">
      <!-- Campos de entrada para opciones de puntos -->
      <div class="setting-values">
        <label class="user-name">Event Points:</label>
        <div class="value-item">
          <label for="sky">Sky:</label>
          <input type="number" id="sky" v-model="skyValue" class="setting-input" @input="saveEventOptions"/>
          <select v-model="skyPointType" class="select-input" @change="saveEventOptions">
            <option value="dkp">DKP</option>
            <option value="dynamis_dkp">DKP Dynamis</option>
          </select>
        </div>
        <div class="value-item">
          <label for="sea">Sea:</label>
          <input type="number" id="sea" v-model="seaValue" class="setting-input" @input="saveEventOptions"/>
          <select v-model="seaPointType" class="select-input" @change="saveEventOptions">
            <option value="dkp">DKP</option>
            <option value="dynamis_dkp">DKP Dynamis</option>
          </select>
        </div>
        <div class="value-item">
          <label for="dynamis">Dynamis:</label>
          <input type="number" id="dynamis" v-model="dynamisValue" class="setting-input" @input="saveEventOptions"/>
          <select v-model="dynamisPointType" class="select-input" @change="saveEventOptions">
            <option value="dkp">DKP</option>
            <option value="dynamis_dkp">DKP Dynamis</option>
          </select>
        </div>
        <div class="value-item">
          <label for="hnm">HNM:</label>
          <input type="number" id="hnm" v-model="hnmValue" class="setting-input" @input="saveEventOptions"/>
          <select v-model="hnmEventPointType" class="select-input" @change="saveEventOptions">
            <option value="dkp">DKP</option>
            <option value="dynamis_dkp">DKP Dynamis</option>
          </select>
        </div>
        <div class="value-item">
          <label for="huntGroup">Hunt Group:</label>
          <input type="number" id="huntGroup" v-model="huntGroupValue" class="setting-input"
                 @input="saveEventOptions"/>
          <select v-model="huntGroupPointType" class="select-input" @change="saveEventOptions">
            <option value="dkp">DKP</option>
            <option value="dynamis_dkp">DKP Dynamis</option>
          </select>
        </div>
        <div class="value-item">
          <label for="freeEvent">Free Event:</label>
          <input type="number" id="freeEvent" v-model="freeEventValue" class="setting-input"
                 @input="saveEventOptions"/>
          <select v-model="freeEventPointType" class="select-input" @change="saveEventOptions">
            <option value="dkp">DKP</option>
            <option value="dynamis_dkp">DKP Dynamis</option>
          </select>
        </div>
        <!-- Campos de entrada para loteos de puntos -->
      </div>
      <label class="user-name">Cost Items:</label>
      <div class="value-item">
        <label for="kirinCost">Kirin:</label>
        <input type="number" id="kirinCost" v-model="kirinCostValue" class="setting-input"
               @input="saveEventOptions"/>
        <select v-model="kirinPointType" class="select-input" @change="saveEventOptions">
          <option value="dkp">DKP</option>
          <option value="dynamis_dkp">DKP Dynamis</option>
        </select>
      </div>
      <div class="value-item">
        <label for="godsCost">Gods:</label>
        <input type="number" id="godsCost" v-model="godsCostValue" class="setting-input" @input="saveEventOptions"/>
        <select v-model="godsPointType" class="select-input" @change="saveEventOptions">
          <option value="dkp">DKP</option>
          <option value="dynamis_dkp">DKP Dynamis</option>
        </select>
      </div>
      <div class="value-item">
        <label for="hnmCost">HNM:</label>
        <input type="number" id="hnmCost" v-model="hnmCostValue" class="setting-input" @input="saveEventOptions"/>
        <select v-model="hnmPointType" class="select-input" @change="saveEventOptions">
          <option value="dkp">DKP</option>
          <option value="dynamis_dkp">DKP Dynamis</option>
        </select>
      </div>
      <div class="value-item">
        <label for="dynamisNorthlandCost">Dynamis Northland:</label>
        <input type="number" id="dynamisNorthlandCost" v-model="dynamisNorthlandCostValue" class="setting-input"
               @input="saveEventOptions"/>
        <select v-model="dynamisNorthlandPointType" class="select-input" @change="saveEventOptions">
          <option value="dkp">DKP</option>
          <option value="dynamis_dkp">DKP Dynamis</option>
        </select>
      </div>
      <div class="value-item">
        <label for="dynamisDreamlandCost">Dynamis Dreamland Accessories:</label>
        <input type="number" id="dynamisDreamlandCost" v-model="dynamisAccessoryCostValue" class="setting-input"
               @input="saveEventOptions"/>
        <select v-model="dynamisAccessoryPointType" class="select-input" @change="saveEventOptions">
          <option value="dkp">DKP</option>
          <option value="dynamis_dkp">DKP Dynamis</option>
        </select>
      </div>
      <div class="value-item">
        <label for="dreamlandSpecialCost">Dreamland (RDM,BLM,TH4):</label>
        <input type="number" id="dreamlandSpecialCost" v-model="dreamlandSpecialCostValue" class="setting-input"
               @input="saveEventOptions"/>
        <select v-model="dreamlandSpecialPointType" class="select-input" @change="saveEventOptions">
          <option value="dkp">DKP</option>
          <option value="dynamis_dkp">DKP Dynamis</option>
        </select>
      </div>
      <div class="value-item">
        <label for="limbusBossCost">Omega/Ultima:</label>
        <input type="number" id="limbusBossCost" v-model="limbusBossCostValue" class="setting-input"
               @input="saveEventOptions"/>
        <select v-model="limbusBossPointType" class="select-input" @change="saveEventOptions">
          <option value="dkp">DKP</option>
          <option value="dynamis_dkp">DKP Dynamis</option>
        </select>
      </div>
      <div class="value-item">
        <label for="seaJailersCost">Sea Jailers:</label>
        <input type="number" id="seaJailersCost" v-model="seaJailersCostValue" class="setting-input"
               @input="saveEventOptions"/>
        <select v-model="seaJailersPointType" class="select-input" @change="saveEventOptions">
          <option value="dkp">DKP</option>
          <option value="dynamis_dkp">DKP Dynamis</option>
        </select>
      </div>
    </div>
  </div>


  <div class="top-section">
    <!--Select event -->
    <label class="user-name" for="eventType">Select Event Type:</label>
    <div class="value-item">
      <select id="eventType" v-model="selectEventType" class="select-input" @change="updateSelectedUsersDKP">
        <option value="" disabled selected>Select Event</option>
        <option value="sky">Sky</option>
        <option value="sea">Sea</option>
        <option value="dynamis">Dynamis</option>
        <option value="hnm">HNM</option>
        <option value="huntGroup">Hunt Group</option>
        <option value="freeEvent">Free Event</option>
      </select>
    </div>
    <!--Select Cost -->
    <label class="user-name" for="costItems">Select Item lot:</label>
    <div class="value-item">
      <select id="eventType" v-model="selectCostItem" class="select-input" @change="updateSelectedUsersDKP">
        <option value="" disabled selected>Select Item</option>
        <option value="kirinItem">Kirin item</option>
        <option value="godsItem">Gods item</option>
        <option value="hnmItem">HNM item</option>
        <option value="dynamisNorthlandItem">Dynamis Northland item</option>
        <option value="dynamisAccessoryItem">Dynamis Accessory item</option>
        <option value="dreamlandSpecialItem">Dreamland (RDM,BLM,TH4)</option>
        <option value="limbusBossItem">Omega/Ultima item</option>
        <option value="seaJailersItem">Sea Jailers item</option>
      </select>
    </div>
    <div class="apply-button">
      <button class="system-manager" @click="applyChanges">Aplicar</button>
      <button class="system-manager" @click="resetSelectValues">Clear</button>
    </div>
  </div>

  <div class="content">
    <!-- Tabla de Usuarios -->
    <div>
      <h4>Users</h4>
      <table class="event_table_user">
        <thead>
        <tr>
          <th @click="sortTable('rol')"
              :class="{ 'sortable-header': sortColumn !== 'rol', 'asc': sortColumn === 'rol' && sortDirection === 'asc', 'desc': sortColumn === 'rol' && sortDirection === 'desc' }">
            Rol
          </th>
          <th @click="sortTable('name')"
              :class="{ 'sortable-header': sortColumn !== 'name', 'asc': sortColumn === 'name' && sortDirection === 'asc', 'desc': sortColumn === 'name' && sortDirection === 'desc' }">
            Name
          </th>
          <th @click="sortTable('dkp')"
              :class="{ 'sortable-header': sortColumn !== 'dkp', 'asc': sortColumn === 'dkp' && sortDirection === 'asc', 'desc': sortColumn === 'dkp' && sortDirection === 'desc' }">
            DKP
          </th>
          <th @click="sortTable('dynamis_dkp')"
              :class="{ 'sortable-header': sortColumn !== 'dynamis_dkp', 'asc': sortColumn === 'dynamis_dkp' && sortDirection === 'asc', 'desc': sortColumn === 'dynamis_dkp' && sortDirection === 'desc' }">
            Dynamis DKP
          </th>
          <th @click="sortTable('main_job')"
              :class="{ 'sortable-header': sortColumn !== 'main_job', 'asc': sortColumn === 'main_job' && sortDirection === 'asc', 'desc': sortColumn === 'main_job' && sortDirection === 'desc' }">
            Main Job
          </th>
          <th @click="sortTable('sub_job')"
              :class="{ 'sortable-header': sortColumn !== 'sub_job', 'asc': sortColumn === 'sub_job' && sortDirection === 'asc', 'desc': sortColumn === 'sub_job' && sortDirection === 'desc' }">
            Sub Job
          </th>
          <th @click="sortTable('sub_job_2')"
              :class="{ 'sortable-header': sortColumn !== 'sub_job_2', 'asc': sortColumn === 'sub_job_2' && sortDirection === 'asc', 'desc': sortColumn === 'sub_job_2' && sortDirection === 'desc' }">
            Sub Job 2
          </th>
          <th @click="sortTable('craft')"
              :class="{ 'sortable-header': sortColumn !== 'craft', 'asc': sortColumn === 'craft' && sortDirection === 'asc', 'desc': sortColumn === 'craft' && sortDirection === 'desc' }">
            Craft
          </th>
          <th @click="sortTable('sky')"
              :class="{ 'sortable-header': sortColumn !== 'sky', 'asc': sortColumn === 'sky' && sortDirection === 'asc', 'desc': sortColumn === 'sky' && sortDirection === 'desc' }">
            Sky
          </th>
          <th @click="sortTable('sea')"
              :class="{ 'sortable-header': sortColumn !== 'sea', 'asc': sortColumn === 'sea' && sortDirection === 'asc', 'desc': sortColumn === 'sea' && sortDirection === 'desc' }">
            Sea
          </th>
          <th @click="sortTable('dynamis')"
              :class="{ 'sortable-header': sortColumn !== 'dynamis', 'asc': sortColumn === 'dynamis' && sortDirection === 'asc', 'desc': sortColumn === 'dynamis' && sortDirection === 'desc' }">
            Dynamis
          </th>
          <th @click="sortTable('event')"
              :class="{ 'sortable-header': sortColumn !== 'event', 'asc': sortColumn === 'event' && sortDirection === 'asc', 'desc': sortColumn === 'event' && sortDirection === 'desc' }">
            Event
          </th>
          <th @click="sortTable('overall')"
              :class="{ 'sortable-header': sortColumn !== 'overall', 'asc': sortColumn === 'overall' && sortDirection === 'asc', 'desc': sortColumn === 'overall' && sortDirection === 'desc' }">
            Overall %
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(user, index) in sortedUsers"
            :key="user.id"
            :class="{ 'highlighted-row': index === highlightedRowIndex }"
            @mouseover="highlightRow(index)"
            @mouseout="unhighlightRow()"
        >
          <td>
            <select v-model="user.rol" @change="saveUserData(user)" class="userList">
              <option value="JARL">JARL</option>
              <option value="EARL">EARL</option>
              <option value="KARL">KARL</option>
            </select>
          </td>
          <td>
            <input type="text" v-model="user.name" @input="saveUserData(user)" class="userList"/>
          </td>
          <td>
            <input type="number" v-model="user.dkp" @input="saveUserData(user)" class="userList"/>
          </td>
          <td>
            <input type="number" v-model="user.dynamis_dkp" @input="saveUserData(user)" class="userList"/>
          </td>
          <td>
            <select v-model="user.main_job" @change="saveUserData(user)" class="userList">
              <option value="Warrior">Warrior</option>
              <option value="Monk">Monk</option>
              <option value="White Mage">White Mage</option>
              <option value="Black Mage">Black Mage</option>
              <option value="Red Mage">Red Mage</option>
              <option value="Thief">Thief</option>
              <option value="Paladin">Paladin</option>
              <option value="Dark Knight">Dark Knight</option>
              <option value="Beastmaster">Beastmaster</option>
              <option value="Bard">Bard</option>
              <option value="Ranger">Ranger</option>
              <option value="Samurai">Samurai</option>
              <option value="Ninja">Ninja</option>
              <option value="Dragoon">Dragoon</option>
              <option value="Summoner">Summoner</option>
              <option value="Blue Mage" disabled>Blue Mage (Disabled)</option>
              <option value="Corsair" disabled>Corsair (Disabled)</option>
              <option value="Puppetmaster" disabled>Puppetmaster (Disabled)</option>
              <option value="Dancer" disabled>Dancer (Disabled)</option>
              <option value="Scholar" disabled>Scholar (Disabled)</option>
            </select>
          </td>

          <td>
            <select v-model="user.sub_job" @change="saveUserData(user)" class="userList">
              <option value="Warrior">Warrior</option>
              <option value="Monk">Monk</option>
              <option value="White Mage">White Mage</option>
              <option value="Black Mage">Black Mage</option>
              <option value="Red Mage">Red Mage</option>
              <option value="Thief">Thief</option>
              <option value="Paladin">Paladin</option>
              <option value="Dark Knight">Dark Knight</option>
              <option value="Beastmaster">Beastmaster</option>
              <option value="Bard">Bard</option>
              <option value="Ranger">Ranger</option>
              <option value="Samurai">Samurai</option>
              <option value="Ninja">Ninja</option>
              <option value="Dragoon">Dragoon</option>
              <option value="Summoner">Summoner</option>
              <option value="Blue Mage" disabled>Blue Mage (Disabled)</option>
              <option value="Corsair" disabled>Corsair (Disabled)</option>
              <option value="Puppetmaster" disabled>Puppetmaster (Disabled)</option>
              <option value="Dancer" disabled>Dancer (Disabled)</option>
              <option value="Scholar" disabled>Scholar (Disabled)</option>
            </select>
          </td>

          <td>
            <select v-model="user.sub_job_2" @change="saveUserData(user)" class="userList">
              <option value="Warrior">Warrior</option>
              <option value="Monk">Monk</option>
              <option value="White Mage">White Mage</option>
              <option value="Black Mage">Black Mage</option>
              <option value="Red Mage">Red Mage</option>
              <option value="Thief">Thief</option>
              <option value="Paladin">Paladin</option>
              <option value="Dark Knight">Dark Knight</option>
              <option value="Beastmaster">Beastmaster</option>
              <option value="Bard">Bard</option>
              <option value="Ranger">Ranger</option>
              <option value="Samurai">Samurai</option>
              <option value="Ninja">Ninja</option>
              <option value="Dragoon">Dragoon</option>
              <option value="Summoner">Summoner</option>
              <option value="Blue Mage" disabled>Blue Mage (Disabled)</option>
              <option value="Corsair" disabled>Corsair (Disabled)</option>
              <option value="Puppetmaster" disabled>Puppetmaster (Disabled)</option>
              <option value="Dancer" disabled>Dancer (Disabled)</option>
              <option value="Scholar" disabled>Scholar (Disabled)</option>
            </select>
          </td>
          <td>
            <select v-model="user.craft" @change="saveUserData(user)" class="userList">
              <option value="Alchemy">Alchemy</option>
              <option value="Bonecraft">Bonecraft</option>
              <option value="Clothcraft">Clothcraft</option>
              <option value="Cooking">Cooking</option>
              <option value="Fishing">Fishing</option>
              <option value="Goldsmithing">Goldsmithing</option>
              <option value="Leathercraft">Leathercraft</option>
              <option value="Smithing">Smithing</option>
              <option value="Woodworking">Woodworking</option>
              <option value="Synergy" disabled>Synergy (Disabled)</option>
            </select>
          </td>
          <td>
            <input type="number" v-model="user.sky" @input="saveUserData(user)" class="userList"/>
          </td>
          <td>
            <input type="number" v-model="user.sea" @input="saveUserData(user)" class="userList"/>
          </td>
          <td>
            <input type="number" v-model="user.dynamis" @input="saveUserData(user)" class="userList"/>
          </td>
          <td>
            {{ user.event }}
          </td>
          <td>
            {{ user.overall }} %
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import {getAuth} from 'firebase/auth';
import {get as rtdbGet, getDatabase, ref as rtdbRef, set as rtdbSet} from 'firebase/database';
import {firebaseApp} from '@/main';

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

const isOpenUserList = ref(false);
const isOpenSetting = ref(false);
const users = ref([]);
const selectedUsers = ref([]);
const selectEventType = ref("");
const selectCostItem = ref("");

const kirinPointType = ref("");
const godsPointType = ref("");
const hnmPointType = ref("");
const dynamisNorthlandPointType = ref("");
const dynamisAccessoryPointType = ref("");
const dreamlandSpecialPointType = ref("");
const limbusBossPointType = ref("");
const seaJailersPointType = ref("");
const skyPointType = ref("");
const seaPointType = ref("");
const dynamisPointType = ref("");
const hnmEventPointType = ref("");
const huntGroupPointType = ref("");
const freeEventPointType = ref("");


const total_ls_events = ref(0);
const skyValue = ref(0);
const seaValue = ref(0);
const dynamisValue = ref(0);
const hnmValue = ref(0);
const huntGroupValue = ref(0);
const freeEventValue = ref(0);

const kirinCostValue = ref(0);
const godsCostValue = ref(0);
const hnmCostValue = ref(0);
const dynamisNorthlandCostValue = ref(0);
const dynamisAccessoryCostValue = ref(0);
const dreamlandSpecialCostValue = ref(0);
const limbusBossCostValue = ref(0);
const seaJailersCostValue = ref(0);


const selectedUsersDKP = ref([]);

const resetSelectValues = () => {
  selectEventType.value = "";
  selectCostItem.value = "";
  selectedUsers.value = [];
  selectedUsersDKP.value = [];
};
const settingToggleAccordion = () => {
  isOpenSetting.value = !isOpenSetting.value;
}
const userToggleAccordion = () => {
  isOpenUserList.value = !isOpenUserList.value;
}
const updateSelectedUsersDKP = () => {
  selectedUsersDKP.value = selectedUsers.value;
};
//Event assistance
const applyChanges = () => {
  selectedUsersDKP.value.forEach((userId) => {
    const user = users.value.find((u) => u.id === userId);
    if (user) {
      let point;
      if (selectEventType.value === 'sky') {
        point = skyPointType.value === 'dynamis_dkp' ? 'dynamis_dkp' : 'dkp';
        user[point] += skyValue.value;
        user.sky += 1;
        user.event += 1;
      } else if (selectEventType.value === 'sea') {
        point = seaPointType.value === 'dynamis_dkp' ? 'dynamis_dkp' : 'dkp';
        user[point] += seaValue.value;
        user.sea += 1;
        user.event += 1;
      } else if (selectEventType.value === 'dynamis') {
        point = dynamisPointType.value === 'dynamis_dkp' ? 'dynamis_dkp' : 'dkp';
        user[point] += dynamisValue.value;
        user.dynamis += 1;
        user.event += 1;
      } else if (selectEventType.value === 'hnm') {
        point = hnmEventPointType.value === 'dynamis_dkp' ? 'dynamis_dkp' : 'dkp';
        user[point] += hnmValue.value;
        user.event += 1;
      } else if (selectEventType.value === 'huntGroup') {
        point = huntGroupPointType.value === 'dynamis_dkp' ? 'dynamis_dkp' : 'dkp';
        user[point] += huntGroupValue.value;
        user.event += 1;
      } else if (selectEventType.value === 'freeEvent') {
        point = freeEventPointType.value === 'dynamis_dkp' ? 'dynamis_dkp' : 'dkp';
        user[point] += freeEventValue.value;
        user.event += 1;
      }

      // user.overall = ((user.event) / total_ls_events.value) * 100;
      const userRef = rtdbRef(db, `user/${userId}`);
      rtdbSet(userRef, user);
    }
  });
  // Cost Item
  selectedUsersDKP.value.forEach((userId) => {
    if (selectCostItem.value === 'kirinItem') {
      updateUserPoints(kirinPointType.value, kirinCostValue.value, userId);
    } else if (selectCostItem.value === 'godsItem') {
      updateUserPoints(godsPointType.value, godsCostValue.value, userId);
    } else if (selectCostItem.value === 'hnmItem') {
      updateUserPoints(hnmPointType.value, hnmCostValue.value, userId);
    } else if (selectCostItem.value === 'dynamisNorthlandItem') {
      updateUserPoints(dynamisNorthlandPointType.value, dynamisNorthlandCostValue.value, userId);
    } else if (selectCostItem.value === 'dynamisAccessoryItem') {
      updateUserPoints(dynamisAccessoryPointType.value, dynamisAccessoryCostValue.value, userId);
    } else if (selectCostItem.value === 'dreamlandSpecialItem') {
      updateUserPoints(dreamlandSpecialPointType.value, dreamlandSpecialCostValue.value, userId);
    } else if (selectCostItem.value === 'limbusBossItem') {
      updateUserPoints(limbusBossPointType.value, limbusBossCostValue.value, userId);
    } else if (selectCostItem.value === 'seaJailersItem') {
      updateUserPoints(seaJailersPointType.value, seaJailersCostValue.value, userId);
    }
  })
  backupUserData()
};

function updateUserPoints(pointType, costValue, userId) {
  const user = users.value.find((u) => u.id === userId);
  if (user) {
    let point = pointType === 'dynamis_dkp' ? 'dynamis_dkp' : 'dkp';
    user[point] += costValue;
    const userRef = rtdbRef(db, `user/${userId}`);
    rtdbSet(userRef, user);
  }
}

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
const saveEventOptions = () => {
  try {
    const userRef = rtdbRef(db, 'event_options/');
    const data = {
      // Assistance
      skyValue: skyValue.value,
      seaValue: seaValue.value,
      dynamisValue: dynamisValue.value,
      hnmValue: hnmValue.value,
      huntGroupValue: huntGroupValue.value,
      freeEventValue: freeEventValue.value,

      // Cost item
      kirinCostValue: kirinCostValue.value,
      godsCostValue: godsCostValue.value,
      hnmCostValue: hnmCostValue.value,
      dynamisNorthlandCostValue: dynamisNorthlandCostValue.value,
      dynamisAccessoryCostValue: dynamisAccessoryCostValue.value,
      dreamlandSpecialCostValue: dreamlandSpecialCostValue.value,
      limbusBossCostValue: limbusBossCostValue.value,
      seaJailersCostValue: seaJailersCostValue.value,

      // select Dkp/DkpDynamis
      kirinPointType: kirinPointType.value,
      godsPointType: godsPointType.value,
      hnmPointType: hnmPointType.value,
      dynamisNorthlandPointType: dynamisNorthlandPointType.value,
      dynamisAccessoryPointType: dynamisAccessoryPointType.value,
      dreamlandSpecialPointType: dreamlandSpecialPointType.value,
      limbusBossPointType: limbusBossPointType.value,
      seaJailersPointType: seaJailersPointType.value,
      skyPointType: skyPointType.value,
      seaPointType: seaPointType.value,
      dynamisPointType: dynamisPointType.value,
      hnmEventPointType: hnmEventPointType.value,
      huntGroupPointType: huntGroupPointType.value,
      freeEventPointType: freeEventPointType.value,
      total_ls_events: total_ls_events.value,

    };
    rtdbSet(userRef, data);
  } catch (error) {
    console.error('Error saving values:', error);
  }
};
const saveUserData = (userToUpdate) => {
  try {
    const user = userToUpdate
    user.sub_job = userToUpdate.sub_job;
    user.sub_job_2 = userToUpdate.sub_job_2;
    user.overall = userToUpdate.overall;
    user.event = userToUpdate.event;
    user.dkp = userToUpdate.dkp;
    user.sky = userToUpdate.sky;
    user.sea = userToUpdate.sea;
    user.dynamis = userToUpdate.dynamis;
    user.dynamis_dkp = userToUpdate.dynamis_dkp;
    user.craft = userToUpdate.craft;
    const userRef = rtdbRef(db, `user/${user.id}`);
    rtdbSet(userRef, user);
    backupUserData();
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

const loadOptionEvent = async () => {
  const optionEventRef = rtdbRef(db, 'event_options/');
  try {
    const snapshot = await rtdbGet(optionEventRef);
    if (snapshot.exists()) {
      const optionEventData = snapshot.val();

      // Events
      skyValue.value = optionEventData.skyValue || 0;
      seaValue.value = optionEventData.seaValue || 0;
      dynamisValue.value = optionEventData.dynamisValue || 0;
      hnmValue.value = optionEventData.hnmValue || 0;
      huntGroupValue.value = optionEventData.huntGroupValue || 0;
      freeEventValue.value = optionEventData.freeEventValue || 0;

      // Cost item
      kirinCostValue.value = optionEventData.kirinCostValue || 0;
      godsCostValue.value = optionEventData.godsCostValue || 0;
      hnmCostValue.value = optionEventData.hnmCostValue || 0;
      dynamisNorthlandCostValue.value = optionEventData.dynamisNorthlandCostValue || 0;
      dynamisAccessoryCostValue.value = optionEventData.dynamisAccessoryCostValue || 0;
      dreamlandSpecialCostValue.value = optionEventData.dreamlandSpecialCostValue || 0;
      limbusBossCostValue.value = optionEventData.limbusBossCostValue || 0;
      seaJailersCostValue.value = optionEventData.seaJailersCostValue || 0;

      //select Dkp/DkpDynamis
      kirinPointType.value = optionEventData.kirinPointType || "dkp";
      godsPointType.value = optionEventData.godsPointType || "dkp";
      hnmPointType.value = optionEventData.hnmPointType || "dkp";
      dynamisNorthlandPointType.value = optionEventData.dynamisNorthlandPointType || "dkp";
      dynamisAccessoryPointType.value = optionEventData.dynamisAccessoryPointType || "dkp";
      dreamlandSpecialPointType.value = optionEventData.dreamlandSpecialPointType || "dkp";
      limbusBossPointType.value = optionEventData.limbusBossPointType || "dkp";
      seaJailersPointType.value = optionEventData.seaJailersPointType || "dkp";
      skyPointType.value = optionEventData.skyPointType || "dkp";
      seaPointType.value = optionEventData.seaPointType || "dkp";
      dynamisPointType.value = optionEventData.dynamisPointType || "dkp";
      hnmEventPointType.value = optionEventData.hnmEventPointType || "dkp";
      huntGroupPointType.value = optionEventData.huntGroupPointType || "dkp";
      freeEventPointType.value = optionEventData.freeEventPointType || "dkp";
      total_ls_events.value = optionEventData.total_ls_events || 0;

    }
  } catch (error) {
    console.error(error.message);
  }

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
        // Si ambos valores son numéricos, compáralos como números
        return parseFloat(aValue) - parseFloat(bValue);
      } else {
        // Si uno de los valores no es numérico, compáralos como cadenas
        return aValue.localeCompare(bValue);
      }
    } else {
      if (!isNaN(aValue) && !isNaN(bValue)) {
        // Si ambos valores son numéricos, compáralos como números
        return parseFloat(bValue) - parseFloat(aValue);
      } else {
        // Si uno de los valores no es numérico, compáralos como cadenas
        return bValue.localeCompare(aValue);
      }
    }
  });
  return sorted;
});

const backupUserData = async () => {
  try {
    // const user = await loadUser();
    const userData = await getUserData(); // Recolecta los datos de "user"
    await saveUserDataToBackup(userData);
    console.log('Backup successful');
    console.log("save ok")
  } catch (error) {
    console.error('Error during backup:', error);
  }
};

const getUserData = async () => {
  const userRef = rtdbRef(db, 'user/');
  console.log('Ubicación de la base de datos:', userRef.toString());
  const snapshot = await rtdbGet(userRef);
  console.log('Solicitud GET realizada:', snapshot);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    throw new Error('User data not found');
  }
};

const saveUserDataToBackup = async (userData) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  const backupRef = rtdbRef(db, `backup/${formattedDate}`);
  await rtdbSet(backupRef, userData);
};

const updateOverall = () => {
  users.value.forEach((user) => {
    const overall = (user.event / total_ls_events.value) * 100;
    user.overall = parseFloat(overall.toFixed(2));
    const userRef = rtdbRef(db, `user/${user.id}`);
    rtdbSet(userRef, user);
  });
};
const updateEvents = () => {
  users.value.forEach((user) => {
    const events = user.sky + user.sea + user.dynamis;
    user.event = parseFloat(events);
    const userRef = rtdbRef(db, `user/${user.id}`);
    rtdbSet(userRef, user);
      handleFieldChanges(user);
  });
};

const handleFieldChanges = (user) => {
  watch(() => [user.sky, user.sea, user.dynamis], () => {
    const currentDate = new Date();
    user.event_date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

  });
};

watch(total_ls_events, () => {
  updateOverall();
});

watch(users, () => {
  updateOverall();
  updateEvents();
}, {deep: true});
onMounted(() => {
  loadOptionEvent()
  loadUsers();
});
</script>

<style scoped>

.top-section {
  text-align: center;
  width: 100%;
}

.left-half {
  width: 50%;
  display: inline-block;
  box-sizing: border-box;
  text-align: right;
  vertical-align: top;
}

.user-list li {
  margin-right: 10px; /* Espacio entre los elementos */
}

.right-half {
  width: 50%;
  display: inline-block;
  box-sizing: border-box;
  text-align: right;
  vertical-align: top;

}

/* Estilos para los campos de entrada en la tabla de abajo con clase "userList" */
.userList {
  width: 100px; /* Ancho uniforme para todos los campos de entrada */
  background-color: #333; /* Fondo negro/gris */
  color: #deecec; /* Texto blanco */
  border: none; /* Sin bordes */
  padding: 4px; /* Espaciado interno */
  border-radius: 4px; /* Bordes redondeados */
  text-align: center; /* Alineación central del texto */
}

.user-list {
  display: flex; /* Cambia la dirección de visualización a horizontal */
  flex-wrap: wrap; /* Permite que los elementos se envuelvan si no caben en una sola línea */
  list-style: none;
  padding: 0;
}

.setting-input {
  text-align: center;
  width: 50px; /* Ancho uniforme para todos los campos de entrada */
  background-color: #333; /* Fondo negro/gris */
  color: #deecec; /* Texto blanco */
//border: none; /* Sin bordes */ border-radius: 4px; /* Bordes redondeados */
}

.setting-input-total_ls {
  text-align: center;
  width: 100px; /* Ancho uniforme para todos los campos de entrada */
  background-color: #333; /* Fondo negro/gris */
  color: #deecec; /* Texto blanco */
//border: none; /* Sin bordes */ border-radius: 4px; /* Bordes redondeados */
}

.select-input {
  color: #deecec;
  background-color: #333; /* Fondo negro/gris */
  width: 200px;

}

.select-input option:hover {
  background-color: hsl(5, 42%, 31%); /* Cambia el color de fondo cuando se pasa el mouse */
  color: #687377; /* Cambia el color del texto cuando se pasa el mouse */
}

.value-item {
  color: #deecec;
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

.accordion-title i {
  font-size: 20px;
}

.setting-values {
  text-align: right;
  padding: 20px;
  display: block;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.button {
//display: inline-block; padding: 0px 5px; /* Ajusta el espaciado interno según sea necesario */ background-color: #deecec; /* Color de fondo del botón */ color: #000000; /* Color del texto */
  border: none; /* Sin borde */
  border-radius: 4px; /* Bordes redondeados */
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


/* Cambia el color de fondo y el texto al pasar el ratón sobre el botón */
.content {
  display: flex;
  justify-content: center;
  align-items: center;
//height: 100vh; /* Ajusta la altura como desees */ //width: 200vh;
}


/* Estilos para la tabla */
table {
  width: 100%;
  border-collapse: collapse;

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

.sortable-header:hover {
  background-color: hsl(5, 42%, 31%); /* Cambia el color de fondo al pasar el cursor sobre la cabecera */
}

.system-manager {
  display: inline-block;
  padding: 5px 10px;
  background-color: #95a4ab;
  color: #000000;
  text-decoration: none;
  border-radius: 5px;
  margin-bottom: 5px;
  transition: background-color 0.3s, color 0.3s; /* Transiciones suaves para color de fondo y texto */
  font-weight: bold;
}

/* Cambia el color de fondo y el texto al pasar el ratón sobre el botón */
.system-manager:hover {
  background-color: #687377;
  color: #e74c3c;
}

.event-table th {
  background-color: #687377;
  color: #000000;
  font-weight: bold;
}

.event_table_user th {
  background-color: #687377;
  color: #000000;
  font-weight: bold;
  font-size: 15px;

}

table, th, td {
  border: 1px solid #687377;
  padding: 8px;
  text-align: center;
}

td {
  border: 1px solid #687377;
  padding: 8px;
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
</style>

