<template>
  <nav class='w-full flex flex-row flex-no-wrap items-center justify-between
              navbar'>
    <div class='navbar__left'>
      <router-link class='navbar__link' :to='{ name: "index" }'>
        D&D Companion
      </router-link>
      <div class='navbar__link navbar__dropdown'>
        <div class='navbar__dropdown__trigger'>Info</div>
        <div class='navbar__dropdown__content'>
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
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
    @apply p-4 cursor-pointer;

    &:hover {
      background-color: rgba(167,182,194,.3);
    }
  }

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
      display: none;
      position: absolute;
      background-color: #f1f1f1;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;

      a {
        &:hover {
          background-color: #ddd;
        }

        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
      }
    }
  }
}
</style>
