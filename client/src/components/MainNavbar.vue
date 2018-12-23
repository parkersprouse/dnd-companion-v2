<template>
  <uiv-navbar id='main-navbar'>
    <template slot='collapse'>
      <uiv-navbar-nav>
        <li>
          <a role='button' href='/'>
            <span class='glyphicon glyphicon-home' aria-hidden='true'></span> Home
          </a>
        </li>
      </uiv-navbar-nav>
      <uiv-navbar-nav right v-if='authenticated'>
        <uiv-dropdown tag='li'>
          <a class='dropdown-toggle' role='button'>
            <span class='glyphicon glyphicon-user' aria-hidden='true'></span>&nbsp;
            {{ username }}&nbsp;
            <span class='caret'></span>
          </a>
          <template slot='dropdown'>
            <li>
              <a role='button' href='/profile'>
                <span class='glyphicon glyphicon-cog' aria-hidden='true'></span> Edit Profile
              </a>
            </li>
            <li>
              <a role='button' href='/logout'>
                <span class='glyphicon glyphicon-log-out' aria-hidden='true'></span> Logout
              </a>
            </li>
          </template>
        </uiv-dropdown>
      </uiv-navbar-nav>
      <uiv-navbar-nav right>
        <li>
          <a role='button' href='/login'>
            <span class='glyphicon glyphicon-log-in' aria-hidden='true'></span> Login
          </a>
        </li>
        <li>
          <a role='button' href='/register'>
            <span class='glyphicon glyphicon-plus-sign' aria-hidden='true'></span> Register
          </a>
        </li>
      </uiv-navbar-nav>
    </template>
  </uiv-navbar>
</template>

<script>
export default {
  name: 'main-navbar',
  computed: {
    authenticated() {
      return !!this.$store.state.current_user;
    },
    username() {
      return this.$store.state.current_user.username;
    },
  },
};
</script>
