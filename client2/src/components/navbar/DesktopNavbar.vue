<template>
  <v-toolbar id='desktop-nav' app dense>

    <v-toolbar-items>
      <v-btn exact flat :to='{ name: "index" }'><v-icon left>fa-home</v-icon>Home</v-btn>

      <!-- Character Links -->
      <v-menu v-if='user && user.username' offset-y :open-on-hover='true'>
        <template v-slot:activator="{ on }">
          <v-btn v-on='on' flat>
            <v-icon left>fa-users</v-icon>Characters<v-icon right>fa-caret-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile :to='{ name: "my_characters" }'>
            <v-list-tile-avatar><v-icon>fa-list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>My Characters</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "create_character" }'>
            <v-list-tile-avatar><v-icon>fa-plus-circle</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Create Character</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <!-- Game Links -->
      <v-menu v-if='user && user.username' offset-y :open-on-hover='true'>
        <template v-slot:activator="{ on }">
          <v-btn v-on='on' flat>
            <v-icon left>fa-dice-d20</v-icon>Games<v-icon right>fa-caret-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile :to='{ name: "my_games" }'>
            <v-list-tile-avatar><v-icon>fa-list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>My Games</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "create_game" }'>
            <v-list-tile-avatar><v-icon>fa-plus-circle</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Create Game</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "join_game" }'>
            <v-list-tile-avatar><v-icon>fa-user-plus</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Join Game</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <!-- Info Links -->
      <v-menu offset-y :open-on-hover='true'>
        <template v-slot:activator="{ on }">
          <v-btn v-on='on' flat>
            <v-icon left>fa-book</v-icon>Info<v-icon right>fa-caret-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile :to='{ name: "armor_list" }'>
            <v-list-tile-avatar><v-icon>fa-list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Armor</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "class_list" }'>
            <v-list-tile-avatar><v-icon>fa-list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Classes</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "condition_list" }'>
            <v-list-tile-avatar><v-icon>fa-list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Conditions</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "damage_types_list" }'>
            <v-list-tile-avatar><v-icon>fa-list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Damage Types</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "equipment_list" }'>
            <v-list-tile-avatar><v-icon>fa-list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Equipment</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "language_list" }'>
            <v-list-tile-avatar><v-icon>fa-list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Languages</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "proficiencies_list" }'>
            <v-list-tile-avatar><v-icon>fa-list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Proficiencies</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "races_list" }'>
            <v-list-tile-avatar><v-icon>fa-list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Races</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "skills_list" }'>
            <v-list-tile-avatar><v-icon>fa-list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Skills</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "spell_list" }'>
            <v-list-tile-avatar><v-icon>fa-list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Spells</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "trinket_list" }'>
            <v-list-tile-avatar><v-icon>fa-list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Trinkets</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "weapon_properties_list" }'>
            <v-list-tile-avatar><v-icon>fa-list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Weapon Properties</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "weapon_list" }'>
            <v-list-tile-avatar><v-icon>fa-list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Weapons</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <!-- Profile Links -->
    <v-toolbar-items v-if='user.username'>
      <v-menu offset-y :open-on-hover='true'>
        <template v-slot:activator="{ on }">
          <v-btn v-on='on' flat>
            <v-icon left>fa-user-circle</v-icon>
            {{ user.username }}
            <v-icon right>fa-caret-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile :to='{ name: "profile" }'>
            <v-list-tile-avatar><v-icon>fa-cog</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Edit Profile</v-list-tile-title>
          </v-list-tile>
          <v-list-tile href='/logout'>
            <v-list-tile-avatar><v-icon>fa-sign-out-alt</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>

    <!-- Auth Links -->
    <v-toolbar-items v-else>
      <v-btn exact flat :to='{ name: "login" }'>
        <v-icon left>fa-sign-in-alt</v-icon>Login
      </v-btn>
      <v-btn exact flat :to='{ name: "register" }'>
        <v-icon left>fa-user-plus</v-icon>Register
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'desktop_navbar',
  props: {
    user: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style lang='scss' scoped>
#desktop-nav {
  .v-btn {
    text-transform: none;
  }
}

.nav-link {
  color: rgba(0, 0, 0, .87) !important;
}
</style>
