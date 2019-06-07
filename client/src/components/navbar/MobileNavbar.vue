<template>
  <v-layout wrap>
    <v-toolbar dense>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-toolbar-side-icon @click.stop='open = !open'></v-toolbar-side-icon>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer v-model='open' absolute right temporary>
      <v-list>
        <v-list-tile :to='{ name: "index" }'>
          <v-list-tile-avatar><v-icon>fa-home</v-icon></v-list-tile-avatar>
          <v-list-tile-title class='nav-link'>Home</v-list-tile-title>
        </v-list-tile>

        <!-- Character Links -->
        <v-list-group v-if='user && user.username'>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-avatar><v-icon>fa-users</v-icon></v-list-tile-avatar>
              <v-list-tile-title>Characters</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile :to='{ name: "my_characters" }'>
            <v-list-tile-avatar><v-icon>fa-list</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>My Characters</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to='{ name: "create_character" }'>
            <v-list-tile-avatar><v-icon>fa-plus-circle</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Create Character</v-list-tile-title>
          </v-list-tile>
        </v-list-group>

        <!-- Game Links -->
        <v-list-group v-if='user && user.username'>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-avatar><v-icon>fa-dice-d20</v-icon></v-list-tile-avatar>
              <v-list-tile-title>Games</v-list-tile-title>
            </v-list-tile>
          </template>
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
        </v-list-group>

        <!-- Info Links -->
        <v-list-group>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-avatar><v-icon>fa-book</v-icon></v-list-tile-avatar>
              <v-list-tile-title>Info</v-list-tile-title>
            </v-list-tile>
          </template>
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
          <v-list-tile :to='{ name: "spells_list" }'>
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
        </v-list-group>

        <v-divider></v-divider>

        <!-- Profile Links -->
        <v-list-group v-if='user.username'>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-avatar><v-icon>fa-user-circle</v-icon></v-list-tile-avatar>
              <v-list-tile-title>{{ user.username }}</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile :to='{ name: "profile" }'>
            <v-list-tile-avatar><v-icon>fa-cog</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Edit Profile</v-list-tile-title>
          </v-list-tile>
          <v-list-tile href='/logout'>
            <v-list-tile-avatar><v-icon>fa-sign-out-alt</v-icon></v-list-tile-avatar>
            <v-list-tile-title class='nav-link'>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list-group>

        <!-- Auth Links -->
        <v-list-tile v-if='!user.username' :to='{ name: "login" }'>
          <v-list-tile-avatar><v-icon>fa-sign-in-alt</v-icon></v-list-tile-avatar>
          <v-list-tile-title class='nav-link'>Login</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if='!user.username' :to='{ name: "register" }'>
          <v-list-tile-avatar><v-icon>fa-user-plus</v-icon></v-list-tile-avatar>
          <v-list-tile-title class='nav-link'>Register</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

  </v-layout>
</template>

<script>
export default {
  name: 'mobile_navbar',
  props: {
    user: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      open: false,
    };
  },
};
</script>

<style lang='scss' scoped>
.nav-link {
  color: rgba(0, 0, 0, .87) !important;
}
</style>
