<template>
  <nav class='navbar'>
    <div class='navbar__left'>
      <router-link class='navbar__link' :to='{ name: "index" }'>
        D&D Companion
      </router-link>
    </div>
    <div class='navbar__right'>
      <a class='navbar__link' @click='show = true'>
        <i class='fas fa-bars fa-lg'></i>
      </a>
    </div>

    <div class='navbar__mobile' :class='{ "navbar__mobile--shown": show }'>
      <div class='navbar__mobile__close' @click='show = false'>
        <i class='fas fa-times fa-2x'></i>
      </div>
      <div class='navbar__mobile__content'>
        <router-link class='navbar__mobile__link' :to="{ name: 'index' }">
          Home
        </router-link>
        <router-link v-if='$store.getters.logged_in' class='navbar__mobile__link'
                    :to="{ name: 'profile' }">
          Profile
        </router-link>
        <router-link v-if='$store.getters.logged_in' class='navbar__mobile__link'
                    :to="{ name: 'logout' }">
          Logout
        </router-link>
      </div>
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
  watch: {
    $route() {
      // When the route changes, meaning we've switched pages, hide the navbar
      this.show = false;
    },
    show(new_val) {
      const body = document.querySelector('body');
      if (new_val) {
        body.classList.add('body-blocked');
      } else {
        body.classList.remove('body-blocked');
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.navbar {
  .navbar__mobile {
    @apply bg-white;
    bottom: 0;
    display: none;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 100;

    &.navbar__mobile--shown {
      align-items: center;
      display: flex;
    }

    .navbar__mobile__close {
      cursor: pointer;
      height: fit-content;
      position: absolute;
      right: 10px;
      top: 10px;
      width: fit-content;
      z-index: 101;
    }

    .navbar__mobile__content {
      width: 100%;

      .navbar__mobile__link {
        display: block;
        padding: 0.75rem 0.5rem;
        text-align: center;
      }
    }
  }
}
</style>
