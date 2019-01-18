<template>
  <div>
    <main-navbar />
    <div class='container'>
      <div class='page-header'>
        <h1>Profile</h1>
      </div>

      <div class='row'>
        <div class='col-md-6'>
          <div class='panel panel-default' id='profile-info-form'>
            <div class='panel-body'>
              <form @submit.prevent='updateInfo'>
                <uiv-alert type='danger' v-if='info.error_msg'>
                  <span v-html='feather.icons["alert-octagon"].toSvg()'></span> {{ info.error_msg }}
                </uiv-alert>
                <div class='form-group'>
                  <label for='current_password'>Current Password <span class='required-label'>*</span></label>
                  <div class='input-group'>
                    <span class='input-group-addon'><span v-html='feather.icons.lock.toSvg()'></span></span>
                    <input type='password' class='form-control' id='current_password' placeholder='Current Password' v-model='info.current_password' />
                  </div>
                </div>
                <hr />
                <div class='form-group'>
                  <label for='email'>E-mail <span class='required-label'>*</span></label>
                  <div class='input-group'>
                    <span class='input-group-addon'><span v-html='feather.icons.mail.toSvg()'></span></span>
                    <input type='email' class='form-control' id='email' placeholder='E-mail' v-model='info.email' />
                  </div>
                </div>
                <div class='form-group'>
                  <label for='username'>Username <span class='required-label'>*</span></label>
                  <div class='input-group'>
                    <span class='input-group-addon'><span v-html='feather.icons.user.toSvg()'></span></span>
                    <input type='text' class='form-control' id='username' placeholder='Username' v-model='info.username' />
                  </div>
                </div>
                <div class='form-group'>
                  <label for='name'>Name</label>
                  <div class='input-group'>
                    <span class='input-group-addon'><span v-html='feather.icons.tag.toSvg()'></span></span>
                    <input type='text' class='form-control' id='name' placeholder='Name' v-model='info.name' />
                  </div>
                </div>
                <div style='text-align: center;'>
                  <uiv-btn block :disabled='info.submitting' native-type='submit' type='primary'>
                    <span v-html='feather.icons.check.toSvg()'></span> Update Info
                  </uiv-btn>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class='col-md-6'>
          <div class='panel panel-default' id='profile-password-form'>
            <div class='panel-body'>
              <form @submit.prevent='updatePassword'>
                <uiv-alert type='danger' v-if='password.error_msg'>
                  <span v-html='feather.icons["alert-octagon"].toSvg()'></span> {{ password.error_msg }}
                </uiv-alert>
                <div class='form-group'>
                  <label for='current_password'>Current Password <span class='required-label'>*</span></label>
                  <div class='input-group'>
                    <span class='input-group-addon'><span v-html='feather.icons.lock.toSvg()'></span></span>
                    <input type='password' class='form-control' id='current_password' placeholder='Current Password' v-model='password.current_password' />
                  </div>
                </div>
                <hr />
                <div class='form-group'>
                  <label for='new_password'>New Password <span class='required-label'>*</span></label>
                  <div class='input-group'>
                    <span class='input-group-addon'><span v-html='feather.icons.lock.toSvg()'></span></span>
                    <input type='password' class='form-control' id='new_password' placeholder='New Password' v-model='password.new_password' />
                  </div>
                </div>
                <div class='form-group'>
                  <label for='new_password_confirm'>Confirm New Password <span class='required-label'>*</span></label>
                  <div class='input-group'>
                    <span class='input-group-addon'><span v-html='feather.icons.lock.toSvg()'></span></span>
                    <input type='password' class='form-control' id='new_password_confirm' placeholder='Confirm New Password' v-model='password.new_password_confirm' />
                  </div>
                </div>
                <div style='text-align: center;'>
                  <uiv-btn block :disabled='password.submitting' native-type='submit' type='primary'>
                    <span v-html='feather.icons.check.toSvg()'></span> Update Password
                  </uiv-btn>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'profile',
  data() {
    return {
      feather,
      user: null,
      info: {
        current_password: '',
        error_msg: '',
        email: '',
        name: '',
        submitting: false,
        username: '',
      },
      password: {
        current_password: '',
        error_msg: '',
        new_password: '',
        new_password_confirm: '',
      },
    };
  },
  mounted() {
    this.user = this.$store.state.current_user;
    this.info.email = this.user.email;
    this.info.name = this.user.name;
    this.info.username = this.user.username;
  },
  methods: {
    updateInfo() {
      this.info.error_msg = '';
      this.info.submitting = true;
      this.$http.patch('/api/users', this.info)
        .then(() => {
          this.info.submitting = false;
          this.info.current_password = '';
          this.$uiv_notify({
            type: 'success',
            title: 'Info Successfully Updated',
          });
        })
        .catch((error) => {
          this.info.error_msg = error.response.data.message;
          this.info.submitting = false;
        });
    },
    updatePassword() {
      this.password.error_msg = '';
      this.password.submitting = true;
      this.$http.patch('/api/users/update_password', this.password)
        .then(() => {
          this.password.submitting = false;
          this.password.current_password = '';
          this.password.new_password = '';
          this.password.new_password_confirm = '';
          this.$uiv_notify({
            type: 'success',
            title: 'Password Successfully Updated',
          });
        })
        .catch((error) => {
          this.password.error_msg = error.response.data.message;
          this.password.submitting = false;
        });
    },
  },
};
</script>
