<template>
  <div class="contact">
    <h1 class="title">Entrar</h1>
    <form action class="form" @submit.prevent="contact">
      <label class="form-label">Usuario</label>
      <input
        v-model="userModel.username"
        class="form-input"
        type="text"
        id="name"
        required
        placeholder="Usuario"
      >
      <label class="form-label">Contraseña</label>
      <input
        v-model="userModel.credential"
        class="form-input"
        type="password"
        id="pass"
        placeholder="Contraseña"
      >
      <input class="form-submit" type="submit" value="Enviar">
    </form>
        <v-datetime-picker>sssss</v-datetime-picker>
    <DatetimePicker></DatetimePicker>
    <BDatepicker></BDatepicker>
    <v-date-picker></v-date-picker>
  </div>
</template>

<script>
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
  }
}
</script>
<style>
.form-input {
  margin: 10px 10px;
  border: #090808 1px solid;
}

</style>
