<template>
  <v-row justify="center">
      <div class="register">
        <v-card-title>
          <span class="text-h5">Perfirl del usuario</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="userModel.name"
                  label="Nombre*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="userModel.surname1"
                  label="Apellido"
                  hint=""
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="userModel.surname2"
                  label="Segundo apellido"
                  hint=""
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="userModel.username"
                  label="Nombre de Usuario*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="userModel.password"
                  type="password"
                  label="Contraseña"
                  hint=""
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="userModel.Phone"
                  label="Phone"
                  hint="Recuerda el prefijo, ejm: *34"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="userModel.email"
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  v-model="userModel.date_of_birth"
                  label="Fecha de nacimiento*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['PC', 'Playstation 4','Playstation 5', 'XBOX', 'switch']"
                  v-model="userModel.interests"
                  label="Intereses"
                  multiple
                ></v-select>
              </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4">
                  <v-text-field
                    v-model="userModel.address"
                    label="Domicilio"
                    hint="Nombre, numero y piso y escalera si corresponde"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4">
                  <v-text-field
                    v-model="userModel.zipCode"
                    label="Codigo postal"
                    hint=""
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4">
                  <v-text-field
                    v-model="userModel.locality"
                    label="Localidad*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4">
                  <v-text-field
                    v-model="userModel.province"
                    label="Provincia*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4">
                  <v-text-field
                    v-model="userModel.country"
                    label="Pais*"
                    required
                  ></v-text-field>
                </v-col>
            </v-row>
          </v-container>
          <small>(*) Indica campo requerido</small>
        </v-card-text>
        <div>
          <v-btn
            color="blue darken-1"
            text
            @click=goBack>
            cancelar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="createUser">
            Enviar
          </v-btn>
        </div>
      </div>
  </v-row>
</template>

<script>
import usersApi from '@/api/usersApi'

export default {
  data: () => ({
    loading: false,
    userRegisterDialogVisible: true,
    userModel: {},
    userRegisterModel: {},
    userRegisterInvalidForm: false,
    userValidationRules: false,
    dialog: true
  }),
  methods: {
    async createUser () {
      try {
        this.loading = true
        await usersApi.createUser(this.userModel)
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
.register {
margin-top: 20px;
margin-bottom: 50px;
}
</style>
