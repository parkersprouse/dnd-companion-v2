<template>
  <uiv-navbar id='main-navbar' :fluid='false'>
    <template slot='collapse'>
      <uiv-navbar-nav>
        <li>
          <a role='button' href='/'>
            <span class='glyphicon glyphicon-home' aria-hidden='true'></span> Home
          </a>
        </li>
        <uiv-dropdown tag='li' v-if='authenticated'>
          <a class='dropdown-toggle' role='button'>
            Characters <span class='caret'></span>
          </a>
          <template slot='dropdown'>
            <li>
              <a role='button' href='/characters'>
                <span class='glyphicon glyphicon-th-list' aria-hidden='true'></span> My Characters
              </a>
            </li>
            <li>
              <a role='button' href='/characters/new'>
                <span class='glyphicon glyphicon-plus-sign' aria-hidden='true'></span> Create Character
              </a>
            </li>
          </template>
        </uiv-dropdown>
        <uiv-dropdown tag='li' v-if='authenticated'>
          <a class='dropdown-toggle' role='button'>
            Games <span class='caret'></span>
          </a>
          <template slot='dropdown'>
            <li>
              <a role='button' href='/games'>
                <span class='glyphicon glyphicon-th-list' aria-hidden='true'></span> My Games
              </a>
            </li>
            <li>
              <a role='button' href='/games/new'>
                <span class='glyphicon glyphicon-plus-sign' aria-hidden='true'></span> Create Game
              </a>
            </li>
            <li>
              <a role='button' href='/games/join'>
                <span class='glyphicon glyphicon-play-circle' aria-hidden='true'></span> Join Game
              </a>
            </li>
          </template>
        </uiv-dropdown>
        <uiv-dropdown tag='li'>
          <a class='dropdown-toggle' role='button'>
            Info <span class='caret'></span>
          </a>
          <template slot='dropdown'>
            <li>
              <a role='button' href='/info/armor'>
                <span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span> Armor
              </a>
            </li>
            <li>
              <a role='button' href='/info/classes'>
                <span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span> Classes
              </a>
            </li>
            <li>
              <a role='button' href='/info/conditions'>
                <span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span> Conditions
              </a>
            </li>
            <li>
              <a role='button' href='/info/damage_types'>
                <span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span> Damage Types
              </a>
            </li>
            <li>
              <a role='button' href='/info/equipment'>
                <span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span> Equipment
              </a>
            </li>
            <li>
              <a role='button' href='/info/languages'>
                <span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span> Languages
              </a>
            </li>
            <li>
              <a role='button' href='/info/proficiencies'>
                <span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span> Proficiencies
              </a>
            </li>
            <li>
              <a role='button' href='/info/races'>
                <span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span> Races
              </a>
            </li>
            <li>
              <a role='button' href='/info/skills'>
                <span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span> Skills
              </a>
            </li>
            <li>
              <a role='button' href='/info/spells'>
                <span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span> Spells
              </a>
            </li>
            <li>
              <a role='button' href='/info/trinkets'>
                <span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span> Trinkets
              </a>
            </li>
            <li>
              <a role='button' href='/info/weapons'>
                <span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span> Weapons
              </a>
            </li>
            <li>
              <a role='button' href='/info/weapon_properties'>
                <span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span> Weapon Properties
              </a>
            </li>
          </template>
        </uiv-dropdown>
      </uiv-navbar-nav>
      <uiv-navbar-nav right v-if='authenticated'>
        <uiv-dropdown tag='li'>
          <a class='dropdown-toggle' role='button'>
            <span class='glyphicon glyphicon-user' aria-hidden='true'></span> {{ username }} <span class='caret'></span>
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
      <uiv-navbar-nav right v-else>
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

<style scoped>
  .navbar-default .navbar-nav > li > a:focus,
  .navbar-default .navbar-nav > li > a:hover {
    color: black;
  }
</style>
