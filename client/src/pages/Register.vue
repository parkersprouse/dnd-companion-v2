<template>
  <div>
    <main-navbar />
    <div class='container'>
      <div class='page-header'>
        <h1>Register</h1>
      </div>
      <div class='panel panel-default' id='register-form'>
        <div class='panel-body'>
          <form @submit.prevent='submit' id='register-form'>
            <uiv-alert type='danger' v-if='error_msg'>
              <span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span> {{ error_msg }}
            </uiv-alert>
            <div class='form-group'>
              <label for='name'>Name</label>
              <div class="input-group">
                <span class='input-group-addon'><span class='glyphicon glyphicon-tag' aria-hidden='true'></span></span>
                <input type='text' class='form-control' id='name' placeholder='Name' v-model='name' />
              </div>
            </div>
            <div class='form-group'>
              <label for='email'>E-mail <span class='required-label'>*</span></label>
              <div class="input-group">
                <span class='input-group-addon'><span class='glyphicon glyphicon-envelope' aria-hidden='true'></span></span>
                <input type='email' class='form-control' id='email' placeholder='E-mail' v-model='email' />
              </div>
            </div>
            <div class='form-group'>
              <label for='username'>Username <span class='required-label'>*</span></label>
              <div class="input-group">
                <span class='input-group-addon'><span class='glyphicon glyphicon-user' aria-hidden='true'></span></span>
                <input type='text' class='form-control' id='username' placeholder='Username' v-model='username' />
              </div>
            </div>
            <div class='form-group'>
              <label for='password'>Password <span class='required-label'>*</span></label>
              <div class="input-group">
                <span class='input-group-addon'><span class='glyphicon glyphicon-lock' aria-hidden='true'></span></span>
                <input type='password' class='form-control' id='password' placeholder='Password' v-model='password' />
              </div>
            </div>
            <div class='form-group'>
              <label for='confirm_password'>Confirm Password <span class='required-label'>*</span></label>
              <div class="input-group">
                <span class='input-group-addon'><span class='glyphicon glyphicon-lock' aria-hidden='true'></span></span>
                <input type='password' class='form-control' id='confirm_password' placeholder='Confirm Password' v-model='confirm_password' />
              </div>
            </div>
            <div style='text-align: center;'>
              <uiv-btn :disabled='submitting' native-type='submit' type='primary'>
                <span class='glyphicon glyphicon-plus-sign' aria-hidden='true'></span> Register
              </uiv-btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      confirm_password: '',
      email: '',
      error_msg: null,
      name: '',
      password: '',
      submitting: false,
      username: '',
    };
  },
  methods: {
    submit() {
      this.error_msg = null;
      this.submitting = true;

      this.$http.post('/api/register', {
        confirm_password: this.confirm_password,
        email: this.email,
        name: this.name,
        password: this.password,
        username: this.username,
      })
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
