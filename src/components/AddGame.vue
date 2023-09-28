<template>
  <v-row justify="center">
      <v-card class="addGame">
        <v-card-title>
          <span class="text-h5">Añadir Juego</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="gamesModel.gameTitle"
                  label="Titulo del juego*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="gamesModel.priceGame"
                  label="Precio"
                  hint=""
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="gamesModel.pic_uriGame"
                  label="Portada URL"
                  hint=""
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="gamesModel.descriptionGame"
                  label="Descripción*"
                  required>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-card-text
                >Rankin reseñas</v-card-text>
                <v-rating
                  v-model="gamesModel.ratingGame"
                  length="5"
                  size="32"
                  value="3"
                ></v-rating>
              </v-col>
              <v-col
                cols="12"
                sm="6">
                <v-select
                  v-model="gamesModel.date_of_launch"
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Fecha de de lanzamiento*"
                  required
                ></v-select>
                <v-row justify="center">
                  <v-date-picker
                    v-model="picker"
                    type="month"
                  ></v-date-picker>
                </v-row>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="gamesModel.pegi"
                  label="Pegi"
                  hint=""
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6">
                <v-select
                  v-model="gamesModel.genreGame"
                  :items="['Rol', 'Estrategia','Arcade', 'Plataformas', 'Lucha', 'Beat \'Em Up', 'Hack and Slash', 'Disparos', 'Simulación', 'Deporte', 'Aventura', 'Sandbox']"
                  label="Genero"
                  multiple
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>(*) Indica campo requerido</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click=goBack>
            Cancelar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addGame">
            Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-row>
</template>

<script>
import gamesApi from '@/api/gamesApi'

export default {
  data: () => ({
    loading: false,
    gamesModel: {},
    userRegisterDialogVisible: true,
    gameRegisterInvalidForm: false,
    gamesRegisterValidationRules: false,
    dialog: true
  }),
  methods: {
    async addGame () {
      try {
        this.loading = true
        await gamesApi.createGame(this.gamesModel)
        this.goBack()
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    goHome () {
      this.$router.go('HomeGameSource')
    }
  }
}
</script>
<style>
.form-input {
  margin: 10px 10px;
  border: #090808 1px solid;
}
.addGame {
margin-top: 20px;
}
</style>
