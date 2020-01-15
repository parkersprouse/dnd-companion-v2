<template>
  <div>
    <h3 class='form-header'>Login</h3>
    <form class='form-v' @submit.prevent='submit'>
      <alert v-if='error' type='error'>{{ error }}</alert>

      <label class='form-v__label' for='username'>Username</label>
      <input v-model='username' class='input form-v__input' id='username' type='text' />

      <label class='form-v__label' for='password'>Password</label>
      <input v-model='password' class='input form-v__input' id='password' type='password' />

      <button class='btn btn--primary w-full' :class='{ loading }' :disabled='loading'
              type='submit'>
        Login
      </button>

      <div class='form-v__link'>
        <a class='link' @click='$emit("show_register")'>Register</a>
      </div>
    </form>
  </div>
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
      if (this.loading) return;
      this.error = null;
      this.loading = true;
      this.$http.post('/api/login', { username: this.username, password: this.password })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.loading = false;
        });
    },
  },
};
</script>
