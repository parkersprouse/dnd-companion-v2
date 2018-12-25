<template>
  <div>
    <main-navbar />
    <div class='container'>
      <div class='page-header'>
        <h1>Account Recovery</h1>
      </div>
      <div style='margin-bottom: 1rem;'>
        If you forgot your username or password, you can recover your username or set a new password by providing the e-mail address
        that you registered with and following the instructions in the e-mail.
      </div>
      <div class='panel panel-default' id='login-form'>
        <div class='panel-body'>
          <form @submit.prevent='submit'>
            <uiv-alert type='success' v-if='success'>
              <span class='glyphicon glyphicon-ok-sign' aria-hidden='true'></span>&nbsp;
              If there is an account associated with the provided e-mail address, you should receive a recovery e-mail shortly.
            </uiv-alert>
            <uiv-alert type='danger' v-if='error_msg'>
              <span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span> {{ error_msg }}
            </uiv-alert>
            <div class='form-group'>
              <label for='email'>E-mail <span class='required-label'>*</span></label>
              <div class='input-group'>
                <span class='input-group-addon'><span class='glyphicon glyphicon-user' aria-hidden='true'></span></span>
                <input type='email' class='form-control' id='email' placeholder='E-mail' v-model='email' />
              </div>
            </div>
            <div style='text-align: center;'>
              <uiv-btn :disabled='submitting' native-type='submit' type='primary'>
                Send
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
  name: 'forgot_password',
  data() {
    return {
      email: '',
      error_msg: null,
      submitting: false,
      success: false,
    };
  },
  methods: {
    submit() {
      this.error_msg = null;
      this.submitting = true;
      this.success = false;

      this.$http.post('/api/users/send_recovery_email', { email: this.email })
        .then(() => {
          this.success = true;
        })
        .catch((error) => {
          this.error_msg = error.response.data.message;
          this.submitting = false;
        });
    },
  },
};
</script>
