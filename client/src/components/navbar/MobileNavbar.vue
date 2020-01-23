<template>
  <nav class='w-full flex flex-row flex-no-wrap items-center justify-between
              navbar'>
    <div class='navbar__left'>
      <router-link class='navbar__link' :to='{ name: "index" }'>
        D&D Companion
      </router-link>
    </div>
    <div class='navbar__right'>
      <a class='navbar__link' @click='show = true'>
        <i class="fas fa-bars fa-lg"></i>
      </a>
    </div>

    <div class='navbar__side-menu' :class='{ "navbar__side-menu--shown": show }'>

    </div>
  </nav>
</template>

<script>
export default {
  name: 'mobile_navbar',
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style lang='scss' scoped>
.navbar {
  .navbar__side-menu {
    display: none;

    &.navbar__side-menu--shown {
      display: block;
    }
  }
}
</style>
