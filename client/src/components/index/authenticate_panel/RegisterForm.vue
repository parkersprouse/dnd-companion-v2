<template>
  <div>
    <h3 class='form-header'>Register</h3>
    <form class='form-v' @submit.prevent='submit'>
      <alert v-if='error' type='error'>{{ error }}</alert>

      <label class='form-v__label' for='email'>E-mail</label>
      <input v-model='email' class='input form-v__input' id='email' type='email' />

      <label class='form-v__label' for='username'>Username</label>
      <input v-model='username' class='input form-v__input' id='username' type='text' />

      <label class='form-v__label' for='name'>Name</label>
      <input v-model='name' class='input form-v__input' id='name' type='text' />

      <label class='form-v__label' for='password'>Password</label>
      <input v-model='password' class='input form-v__input' id='password' type='password' />

      <label class='form-v__label' for='password_confirm'>Confirm Password</label>
      <input v-model='password_confirm' class='input form-v__input' id='password_confirm'
             type='password' />

      <button class='btn btn--primary w-full' :class='{ loading }' :disabled='loading'
              type='submit'>
        Register
      </button>

      <div class='form-v__link'>
        <a class='link' @click='$emit("show_login")'>Login</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'register_form',
  data() {
    return {
      error: null,
      loading: false,
      email: '',
      name: '',
      password: '',
      password_confirm: '',
      username: '',
    };
  },
  methods: {
    submit() {
      if (this.loading) return;
      this.error = null;
      this.loading = true;
      this.$http.post('/api/register', {
        email: this.email,
        name: this.name,
        username: this.username,
        password: this.password,
        password_confirm: this.password_confirm,
      })
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
