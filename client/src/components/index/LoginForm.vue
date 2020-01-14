<template>
  <form class='form-v' @submit.prevent='submit'>
    <label class='form-v__label'>Username</label>
    <input v-model='username' class='input form-v__input' type='text' />

    <label class='form-v__label'>Password</label>
    <input v-model='password' class='input form-v__input' type='password' />

    <button class='btn' type='submit'>Login</button>
  </form>
</template>

<script>
export default {
  name: 'login_form',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    submit() {

    },
  },
};
</script>
