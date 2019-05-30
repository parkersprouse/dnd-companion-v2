<template>
  <va-form @submit.prevent='submit' type='vertical'>
    <va-alert v-if='error' title='Error' type='danger'>
      <p>{{ error }}</p>
    </va-alert>
    <va-form-item label='Username' need>
      <va-input v-model='username' clearable placeholder='Username' type='text' />
    </va-form-item>
    <va-form-item label='Password' need>
      <va-input v-model='password' clearable placeholder='Password' type='password' />
    </va-form-item>
    <va-form-item>
      <va-button :block='true' :class='{ loading }' @click='submit' :disabled='loading'
                  type='primary'>
        Login
      </va-button>
    </va-form-item>
  </va-form>
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
