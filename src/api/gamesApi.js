import axios from 'axios'

const gamesApi = {
  getGamesList: async (params) => {
    const headers = { 'Content-Type': 'application/json' }
    const url = `${process.env.VUE_APP_API_URL}games/`
    return axios({ method: 'get', url, params, headers })
  },
  createGame: async (data) => {
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('sessionToken')}` }
    const url = `${process.env.VUE_APP_API_URL}games/`
    return axios({ method: 'post', url, data, headers })
  },
  getGameById: async (id) => {
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('sessionToken')}` }
    const url = `${process.env.VUE_APP_API_URL}games/${id}`
    return axios({ method: 'get', url, headers })
  },
  editGame: async (id, data) => {
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('sessionToken')}` }
    const url = `${process.env.VUE_APP_API_URL}games/${id}`
    return axios({ method: 'put', url, data, headers })
  },
  deleteGame: async (id) => {
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('sessionToken')}` }
    const url = `${process.env.VUE_APP_API_URL}games/${id}`
    return axios({ method: 'delete', url, headers })
  }
}

export default gamesApi
