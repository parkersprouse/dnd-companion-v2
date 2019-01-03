<template>
  <div>
    <main-navbar />
    <div class='container' v-if='pw_reset_key'>
      <div class='page-header'>
        <h1>Set New Password</h1>
      </div>
      <div class='panel panel-default' id='login-form'>
        <div class='panel-body'>
          <form @submit.prevent='submit'>
            <uiv-alert type='success' v-if='success'>
              <span v-html='feather.icons["check-circle"].toSvg()'></span>&nbsp;
              Your password has been successfully updated
            </uiv-alert>
            <uiv-alert type='danger' v-if='error_msg'>
              <span v-html='feather.icons["alert-octagon"].toSvg()'></span> {{ error_msg }}
            </uiv-alert>
            <div class='form-group'>
              <label for='pass_new'>New Password <span class='required-label'>*</span></label>
              <div class='input-group'>
                <span class='input-group-addon'><span v-html='feather.icons.lock.toSvg()'></span></span>
                <input type='password' class='form-control' id='pass_new' placeholder='New Password' v-model='pass_new' />
              </div>
            </div>
            <div class='form-group'>
              <label for='pass_confirm'>Confirm New Password <span class='required-label'>*</span></label>
              <div class='input-group'>
                <span class='input-group-addon'><span v-html='feather.icons.lock.toSvg()'></span></span>
                <input type='password' class='form-control' id='pass_confirm' placeholder='Confirm New Password' v-model='pass_confirm' />
              </div>
            </div>
            <div style='text-align: center;'>
              <uiv-btn block :disabled='submitting' native-type='submit' type='primary'>
                Submit
              </uiv-btn>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class='container' v-else style='text-align: center;'>
      No recovery key provided
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'account_recovery',
  data() {
    return {
      error_msg: null,
      feather,
      pass_confirm: '',
      pass_new: '',
      pw_reset_key: this.$route.query.key,
      submitting: false,
      success: false,
    };
  },
  methods: {
    submit() {
      this.error_msg = null;
      this.submitting = true;
      this.success = false;

      this.$http.patch('/api/users/reset_password', {
        pw_reset_key: this.pw_reset_key,
        pass_confirm: this.pass_confirm,
        pass_new: this.pass_new,
      })
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
