<template>
  <nav class='w-full flex flex-row flex-no-wrap items-center justify-between
              navbar'>
    <div class='navbar__left'>
      <router-link class='navbar__link' :to='{ name: "index" }'>
        D&D Companion
      </router-link>
      <div class='navbar__link'>
        Info
        <div>

        </div>
      </div>
    </div>
    <div class='navbar__right'>
      <router-link class='navbar__link' :to='{ name: "logout" }'>
        Logout
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'desktop_navbar',
};
</script>

<style lang='scss'>
.navbar {
  @apply px-6 border-t border-b;

  .navbar__left {
    @apply flex flex-1;
  }

  .navbar__right {
    @apply flex;
  }

  .navbar__link {
    @apply p-4;

    &:hover {
      background-color: rgba(167,182,194,.3);
    }
  }
}
</style>
