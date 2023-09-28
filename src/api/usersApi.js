import axios from 'axios'

const usersApi = {
  getUsersList: async (params) => {
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('sessionToken')}` }
    const url = `${process.env.VUE_APP_API_URL}users/`
    return axios({ method: 'get', url, params, headers })
  },
  createUser: async (data) => {
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('sessionToken')}` }
    const url = `${process.env.VUE_APP_API_URL}users/`
    return axios({ method: 'post', url, data, headers })
  },
  getUserById: async (id) => {
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('sessionToken')}` }
    const url = `${process.env.VUE_APP_API_URL}users/${id}`
    return axios({ method: 'get', url, headers })
  },
  editUser: async (id, data) => {
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('sessionToken')}` }
    const url = `${process.env.VUE_APP_API_URL}users/${id}`
    return axios({ method: 'put', url, data, headers })
  },
  deleteUser: async (id) => {
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('sessionToken')}` }
    const url = `${process.env.VUE_APP_API_URL}users/${id}`
    return axios({ method: 'delete', url, headers })
  },
  loginUser: async (data) => {
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('sessionToken')}` }
    const url = `${process.env.VUE_APP_API_URL}login/`
    return axios({ method: 'post', url, data, headers })
  },
  logOutUser: async (data) => {
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('sessionToken')}` }
    const url = `${process.env.VUE_APP_API_URL}login/`
    return axios({ method: 'post', url, data, headers })
  }
}

export default usersApi
