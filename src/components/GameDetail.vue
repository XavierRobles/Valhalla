<template>
  <v-row justify="center">
    <v-card class="gameDetail">
      <v-card-title>
        <span class="text-h5">Detalles del Juego</span>
      </v-card-title>
        <v-card-text>
      <span class="text-h5">{{ gamesModel.gameTitle }}</span>
        </v-card-text>
      <img class="img-cont" :src="this.gameData.pic_uriGame" alt="usp... esta foto esta rota...">
      <v-card-text>
        <v-col cols="12">
          <v-card-text
          >Rankin reseñas</v-card-text>
          <v-rating
            v-model="gamesModel.ratingGame"
            length="5"
            size="32"
            value="3"
            readonly="true"
            color="#FFA90A"
          ></v-rating>
        </v-col>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4">
              <v-card-text>
                <span class="text-h5" v-if="gamesModel.priceGame !== 0">{{ gamesModel.priceGame }}</span>
                <span class="text-h5" v-else>Gratis</span>
              </v-card-text>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4">
              <v-card-text>
                <span class="text-h5">PEGI:</span> <span class="text-h5">{{ gamesModel.pegi }}</span>
              </v-card-text>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4">
              <v-card-text>
            <span class="text-h5">Lanzamiento:</span> <span class="text-h5">{{ dateFormat(gamesModel.date_of_launch) }}</span>
              </v-card-text>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4">
            </v-col>
            </v-row>
          <v-row>
            <v-col cols="12">
              <v-card-text>
              <span class="text-h5">Lanzamiento:</span> <span class="text-h5">{{ gamesModel.descriptionGame }}</span>
              </v-card-text>
            </v-col>
            <v-col
              cols="12"
              sm="6">
            </v-col>
            <v-col
              cols="12"
              sm="6">
              <v-card-text class="text-h5">
              <span>Genero: </span><span v-for="(item, index) in this.gameData.genreGame" :key="index">{{ item }}&nbsp; </span>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click=goBack>
          Volver
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
    gameData: {},
    userRegisterDialogVisible: true,
    gameRegisterInvalidForm: false,
    gamesRegisterValidationRules: false,
    dialog: true
  }),
  methods: {
    async getGameById () {
      try {
        this.loading = true
        const response = await gamesApi.getGameById(this.$route.params.gameName)
        this.gameData = response.data
        this.gamesModel = this.gameData
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
    dateFormat (val) {
      const date = new Date(val)
      return date.toLocaleDateString()
    },
    goBack () {
      this.$router.go(-1)
    },
    goHome () {
      this.$router.go('HomeGameSource')
    }
  },
  mounted () {
    this.getGameById()
  }
}
</script>
<style>
.form-input {
  margin: 10px 10px;
  border: #090808 1px solid;
}
.gameDetail {
  margin-top: 50px;
}
</style>
=
