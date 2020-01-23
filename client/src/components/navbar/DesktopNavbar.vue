<template>
  <nav class='w-full flex flex-row flex-no-wrap items-center justify-between
              navbar'>
    <div class='navbar__left'>
      <router-link class='navbar__link' :to='{ name: "index" }'>
        D&D Companion
      </router-link>
      <div class='navbar__link navbar__dropdown'>
        <div class='navbar__dropdown__trigger'>
          Info<i class='fas fa-caret-down icon--right'></i>
        </div>
        <div class='navbar__dropdown__content'>
          <router-link :to='{ name: "armor_list" }'>Armor</router-link>
          <router-link :to='{ name: "class_list" }'>Classes</router-link>
          <router-link :to='{ name: "condition_list" }'>Conditions</router-link>
          <router-link :to='{ name: "damage_types_list" }'>Damage Types</router-link>
          <router-link :to='{ name: "equipment_list" }'>Equipment</router-link>
          <router-link :to='{ name: "language_list" }'>Languages</router-link>
          <router-link :to='{ name: "proficiencies_list" }'>Proficiencies</router-link>
          <router-link :to='{ name: "races_list" }'>Races</router-link>
          <router-link :to='{ name: "skills_list" }'>Skills</router-link>
          <router-link :to='{ name: "spells_list" }'>Spells</router-link>
          <router-link :to='{ name: "trinket_list" }'>Trinkets</router-link>
          <router-link :to='{ name: "weapon_properties_list" }'>Weapon Properties</router-link>
          <router-link :to='{ name: "weapon_list" }'>Weapons</router-link>
        </div>
      </div>
    </div>
    <div class='navbar__right'>
      <div v-if='$store.getters.logged_in' class='navbar__link navbar__dropdown'>
        <div class='navbar__dropdown__trigger'>
          {{ $store.state.current_user.username }}<i class='fas fa-caret-down icon--right'></i>
        </div>
        <div class='navbar__dropdown__content'>
          <router-link :to='{ name: "logout" }'>Logout</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'desktop_navbar',
};
</script>

<style lang='scss' scoped>
.navbar {
  @apply px-6;

  .navbar__dropdown {
    padding: 0;
    position: relative;

    &:hover {
      .navbar__dropdown__content {
        display: block;
      }
    }

    .navbar__dropdown__trigger {
      @apply p-4;
      font-size: 16px;
      width: 100%;
      border: none;
    }

    .navbar__dropdown__content {
      background-color: #f1f1f1;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      display: none;
      min-width: 160px;
      position: absolute;
      white-space: nowrap;
      z-index: 1;

      a {
        &:hover {
          background-color: #ddd;
        }

        color: black;
        display: block;
        padding: 12px 16px;
        text-decoration: none;
      }
    }
  }
}
</style>
