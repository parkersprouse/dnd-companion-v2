<template>
  <uiv-navbar id='main-navbar' :fluid='false'>
    <template slot='collapse'>
      <uiv-navbar-nav>
        <li>
          <a role='button' href='/'>
            <span v-html='feather.icons.home.toSvg()'></span> Home
          </a>
        </li>
        <uiv-dropdown tag='li' v-if='authenticated'>
          <a class='dropdown-toggle' role='button'>
            Characters <span class='caret'></span>
          </a>
          <template slot='dropdown'>
            <li>
              <a role='button' href='/characters'>
                <span v-html='feather.icons.list.toSvg()'></span> My Characters
              </a>
            </li>
            <li>
              <a role='button' href='/characters/new'>
                <span v-html='feather.icons["plus-circle"].toSvg()'></span> Create Character
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
                <span v-html='feather.icons.list.toSvg()'></span> My Games
              </a>
            </li>
            <li>
              <a role='button' href='/games/new'>
                <span v-html='feather.icons["plus-circle"].toSvg()'></span> Create Game
              </a>
            </li>
            <li>
              <a role='button' href='/games/join'>
                <span v-html='feather.icons["user-plus"].toSvg()'></span> Join Game
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
                <span v-html='feather.icons.list.toSvg()'></span> Armor
              </a>
            </li>
            <li>
              <a role='button' href='/info/classes'>
                <span v-html='feather.icons.list.toSvg()'></span> Classes
              </a>
            </li>
            <li>
              <a role='button' href='/info/conditions'>
                <span v-html='feather.icons.list.toSvg()'></span> Conditions
              </a>
            </li>
            <li>
              <a role='button' href='/info/damage_types'>
                <span v-html='feather.icons.list.toSvg()'></span> Damage Types
              </a>
            </li>
            <li>
              <a role='button' href='/info/equipment'>
                <span v-html='feather.icons.list.toSvg()'></span> Equipment
              </a>
            </li>
            <li>
              <a role='button' href='/info/languages'>
                <span v-html='feather.icons.list.toSvg()'></span> Languages
              </a>
            </li>
            <li>
              <a role='button' href='/info/proficiencies'>
                <span v-html='feather.icons.list.toSvg()'></span> Proficiencies
              </a>
            </li>
            <li>
              <a role='button' href='/info/races'>
                <span v-html='feather.icons.list.toSvg()'></span> Races
              </a>
            </li>
            <li>
              <a role='button' href='/info/skills'>
                <span v-html='feather.icons.list.toSvg()'></span> Skills
              </a>
            </li>
            <li>
              <a role='button' href='/info/spells'>
                <span v-html='feather.icons.list.toSvg()'></span> Spells
              </a>
            </li>
            <li>
              <a role='button' href='/info/trinkets'>
                <span v-html='feather.icons.list.toSvg()'></span> Trinkets
              </a>
            </li>
            <li>
              <a role='button' href='/info/weapon_properties'>
                <span v-html='feather.icons.list.toSvg()'></span> Weapon Properties
              </a>
            </li>
            <li>
              <a role='button' href='/info/weapons'>
                <span v-html='feather.icons.list.toSvg()'></span> Weapons
              </a>
            </li>
          </template>
        </uiv-dropdown>
      </uiv-navbar-nav>
      <uiv-navbar-nav right v-if='authenticated'>
        <uiv-dropdown tag='li'>
          <a class='dropdown-toggle' role='button'>
            <span v-html='feather.icons.user.toSvg()'></span> {{ username }} <span class='caret'></span>
          </a>
          <template slot='dropdown'>
            <li>
              <a role='button' href='/profile'>
                <span v-html='feather.icons.settings.toSvg()'></span> Profile
              </a>
            </li>
            <li>
              <a role='button' href='/logout'>
                <span v-html='feather.icons["log-out"].toSvg()'></span> Logout
              </a>
            </li>
          </template>
        </uiv-dropdown>
      </uiv-navbar-nav>
      <uiv-navbar-nav right v-else>
        <li>
          <a role='button' href='/login'>
            <span v-html='feather.icons["log-in"].toSvg()'></span> Login
          </a>
        </li>
        <li>
          <a role='button' href='/register'>
            <span v-html='feather.icons["user-plus"].toSvg()'></span> Register
          </a>
        </li>
      </uiv-navbar-nav>
    </template>
  </uiv-navbar>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'main-navbar',
  data() {
    return {
      feather,
    };
  },
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
