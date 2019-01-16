<template>
  <div>
    <main-navbar />
    <div class='container'>
      <div class='page-header'>
        <h1>Profile</h1>
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
    };
  },
  mounted() {
    this.user = this.$store.state.current_user;
  },
};
</script>
