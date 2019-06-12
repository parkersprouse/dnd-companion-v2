<template>
  <form @submit.prevent='submit'>
    <v-alert :value='error' type='error'>{{ error }}</v-alert>
    <v-text-field v-model='username' clearable label='Username'></v-text-field>
    <v-text-field v-model='password' clearable label='Password' type='password'></v-text-field>
    <v-btn block color='info' :disabled='loading' :loading='loading' type='submit'>Login</v-btn>
  </form>
</template>

<script>
export default {
  name: 'login_form',
  data() {
    return {
      error: null,
      loading: false,
      password: '',
      username: '',
    };
  },
  methods: {
    submit() {
      this.error = null;
      this.loading = true;

      this.$http.post('/api/login', { username: this.username, password: this.password })
        .then(() => {
          this.$router.push(this.$route.query.n || { name: 'index' });
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.loading = false;
        });
    },
  },
};
</script>
