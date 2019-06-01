<template>
  <v-toolbar id='desktop-nav' app dense>

    <v-toolbar-items>
      <v-btn exact flat :to='{ name: "index" }'><v-icon left>home</v-icon> Home</v-btn>

      <!-- Character Links -->
      <v-menu offset-y :open-on-hover='true'>
        <template v-slot:activator="{ on }">
          <v-btn v-on='on' flat>Characters <v-icon>arrow_drop_down</v-icon></v-btn>
        </template>
        <v-list>
          <v-list-tile :to='{ name: "my_characters" }'>
            <v-list-tile-avatar><v-icon>list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>My Characters</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "create_character" }'>
            <v-list-tile-avatar><v-icon>person_add</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Create Character</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <!-- Game Links -->
      <v-menu offset-y :open-on-hover='true'>
        <template v-slot:activator="{ on }">
          <v-btn v-on='on' flat>Games <v-icon>arrow_drop_down</v-icon></v-btn>
        </template>
        <v-list>
          <v-list-tile :to='{ name: "my_games" }'>
            <v-list-tile-avatar><v-icon>list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>My Games</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "create_game" }'>
            <v-list-tile-avatar><v-icon>playlist_add</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Create Game</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "join_game" }'>
            <v-list-tile-avatar><v-icon>group_add</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Join Game</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <!-- Info Links -->
      <v-menu offset-y :open-on-hover='true'>
        <template v-slot:activator="{ on }">
          <v-btn v-on='on' flat>Info <v-icon>arrow_drop_down</v-icon></v-btn>
        </template>
        <v-list>
          <v-list-tile :to='{ name: "armor_list" }'>
            <v-list-tile-avatar><v-icon>list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Armor</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "class_list" }'>
            <v-list-tile-avatar><v-icon>list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Classes</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "condition_list" }'>
            <v-list-tile-avatar><v-icon>list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Conditions</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "damage_types_list" }'>
            <v-list-tile-avatar><v-icon>list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Damage Types</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "equipment_list" }'>
            <v-list-tile-avatar><v-icon>list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Equipment</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "language_list" }'>
            <v-list-tile-avatar><v-icon>list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Languages</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "proficiencies_list" }'>
            <v-list-tile-avatar><v-icon>list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Proficiencies</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "races_list" }'>
            <v-list-tile-avatar><v-icon>list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Races</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "skills_list" }'>
            <v-list-tile-avatar><v-icon>list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Skills</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "spell_list" }'>
            <v-list-tile-avatar><v-icon>list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Spells</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "trinket_list" }'>
            <v-list-tile-avatar><v-icon>list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Trinkets</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "weapon_properties_list" }'>
            <v-list-tile-avatar><v-icon>list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Weapon Properties</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "weapons_list" }'>
            <v-list-tile-avatar><v-icon>list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Weapons</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <!-- Profile Links -->
    <v-toolbar-items v-if='user && user.username'>
      <v-menu offset-y :open-on-hover='true'>
        <template v-slot:activator="{ on: profile }">
          <v-btn v-on='profile' flat>{{ user.username }} <v-icon>arrow_drop_down</v-icon></v-btn>
        </template>
        <v-list>
          <v-list-tile :to='{ name: "profile" }'>
            <v-list-tile-avatar><v-icon>person</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Profile</v-list-tile-title>
          </v-list-tile>
          <v-list-tile href='/logout'>
            <v-list-tile-avatar><v-icon>exit_to_app</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>

    <!-- Auth Links -->
    <v-toolbar-items v-else-if='user'>
      <v-btn exact flat :to='{ name: "login" }'>Login</v-btn>
      <v-btn exact flat :to='{ name: "register" }'>Register</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'desktop_navbar',
  props: {
    user: {
      required: false,
      type: Object,
    },
  },
};
</script>

<style lang='scss' scoped>
.nav-link {
  color: rgba(0, 0, 0, .87) !important;
}
</style>
