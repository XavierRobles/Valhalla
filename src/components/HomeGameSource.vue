<template>
  <div class="home">
    <v-img
      :src="require('../assets/logo.png')"
      class="my-3"
      contain
      height="200"
    />
    <h1>{{ name }}</h1>
    <p>
      Pagina oficial de GameSourcer
    </p>
    <h3 v-if="!showAll">Juegos del mes</h3>
    <ul class="list-rendering">
      <li v-for="(item, index) in gamesData"  v-bind:key="item">
        <v-card style="padding: 10px;" v-if="index <= 3 && !showAll">
          <div class="img-cont">
            <a @click="goToGameDetail(item.gameTitle)"><img class="img-cont" :src="item.pic_uriGame" alt="usp... esta foto esta rota..."></a>
          </div>
          <div class="text-cont">
            <br>
            <base-subheading>{{ item.gameTitle }}</base-subheading>
            <h5>{{ item.priceGame }}</h5>
          </div>
        </v-card>
      </li>
    </ul>
    <h3 v-if="!showAll">Juegos Gratis</h3>
    <h3 v-if="showAll">Todos los Juegos</h3>

    <ul class="list-rendering">
      <li v-for="(item, indice) in freeGames"  v-bind:key="item">
        <v-card style="padding: 10px;" v-if="indice<=3 && !showAll">
          <div class="img-cont">
            <a @click="goToGameDetail(item.gameTitle)"><img class="img-cont" :src="item.pic_uriGame" alt="usp... esta foto esta rota..."></a>
          </div>
          <div class="text-cont">
            <br>
            <base-subheading>{{ item.gameTitle }}</base-subheading>
            <h5>GRATIS</h5>
          </div>
        </v-card>
      </li>
      <li v-for="(item) in gamesData"  v-bind:key="item">
        <v-card style="padding: 10px;" v-if="showAll">
          <div class="img-cont">
            <a @click="goToGameDetail(item.gameTitle)"><img class="img-cont" :src="item.pic_uriGame" alt="usp... esta foto esta rota..."></a>
          </div>
          <div class="text-cont">
            <br>
            <base-subheading>{{ item.gameTitle }}</base-subheading>
            <h5>{{ translatePrice(item.priceGame) }}</h5>
          </div>
        </v-card>
      </li>
    </ul>
    <v-btn
      color="green darken-1"
      text
      @click="showAllGames">
      Mostrar todo
    </v-btn>
    <h3>Enlaces Esenciales</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Juegos gratis</a></li>&nbsp;|
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>&nbsp;|
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Gaming</a></li>&nbsp;|
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">GameSource</a></li>&nbsp;|
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">Noticias</a></li>&nbsp;
    </ul>

  </div>
</template>

<script>
import gamesApi from '@/api/gamesApi'
export default {
  data () {
    return {
      loading: false,
      showAll: false,
      gamesData: {},
      freeGames: [],
      name: 'Welcome to Original Source Systems'
    }
  },
  methods: {
    goToGameDetail (name) {
      this.$router.push({ name: 'GameDetail', params: { gameName: name } })
    },
    async getGamesList () {
      try {
        this.loading = true
        const response = await gamesApi.getGamesList()
        this.gamesData = response.data.gameListResponse
      } catch (error) {
      } finally {
        this.loading = false
        this.filterFreeGames()
      }
    },
    filterFreeGames () {
      this.gamesData.forEach(element => {
        if (element.priceGame === '0') {
          this.freeGames.push(element)
        }
      })
    },

    showAllGames () {
      this.showAll = !this.showAll
    },
    translatePrice (price) {
      if (price.includes('€')) {
        return price
      }
      return price + '€'
    }
  },
  mounted () {
    this.getGamesList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-flex;
  margin: auto;
}
a {
  color: #42b983;
}
.img-cont {
  width:300px; height:350px;
  object-fit:fill
}
</style>
