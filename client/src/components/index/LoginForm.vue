<template>
  <form class='form-v' @submit.prevent='submit'>
    <label class='form-v__label' for='username'>Username</label>
    <input v-model='username' class='input form-v__input' id='username' type='text' />

    <label class='form-v__label' for='password'>Password</label>
    <input v-model='password' class='input form-v__input' id='password' type='password' />

    <button class='btn btn--primary w-full' :class='{ loading }' :disabled='loading' type='submit'>
      Login
    </button>
  </form>
</template>

<script>
export default {
  name: 'login_form',
  data() {
    return {
      loading: false,
      username: '',
      password: '',
    };
  },
  methods: {
    submit() {
      if (this.loading) return;
      this.loading = true;
      this.$http.post('/api/login', { username: this.username, password: this.password })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.response.data.message);
          this.loading = false;
        });
    },
  },
};
</script>
