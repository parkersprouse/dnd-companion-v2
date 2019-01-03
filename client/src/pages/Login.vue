<template>
  <div>
    <main-navbar />
    <div class='container'>
      <div class='page-header'>
        <h1>Login</h1>
      </div>
      <div class='panel panel-default' id='login-form'>
        <div class='panel-body'>
          <form @submit.prevent='submit'>
            <uiv-alert type='danger' v-if='error_msg'>
              <span v-html='feather.icons["alert-octagon"].toSvg()'></span> {{ error_msg }}
            </uiv-alert>
            <div class='form-group'>
              <label for='username'>Username <span class='required-label'>*</span></label>
              <div class='input-group'>
                <span class='input-group-addon'><span v-html='feather.icons.user.toSvg()'></span></span>
                <input type='text' class='form-control' id='username' placeholder='Username' v-model='username' />
              </div>
            </div>
            <div class='form-group'>
              <label for='password'>Password <span class='required-label'>*</span></label>
              <div class='input-group'>
                <span class='input-group-addon'><span v-html='feather.icons.lock.toSvg()'></span></span>
                <input type='password' class='form-control' id='password' placeholder='Password' v-model='password' />
              </div>
            </div>
            <div style='text-align: center;'>
              <uiv-btn block :disabled='submitting' native-type='submit' type='primary'>
                <span v-html='feather.icons["log-in"].toSvg()'></span> Login
              </uiv-btn>
            </div>
          </form>
        </div>
      </div>
      <div style='text-align: center;'>
        <a href='/forgot_password'>Forgot Username / Password?</a>
      </div>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'login',
  data() {
    return {
      error_msg: null,
      feather,
      password: '',
      submitting: false,
      username: '',
    };
  },
  methods: {
    submit() {
      this.error_msg = null;
      this.submitting = true;

      this.$http.post('/api/login', { username: this.username, password: this.password })
        .then(() => {
          window.location.href = '/';
        })
        .catch((error) => {
          this.error_msg = error.response.data.message;
          this.submitting = false;
        });
    },
  },
};
</script>
