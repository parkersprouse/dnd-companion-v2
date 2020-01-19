<template>
  <div>
    <desktop-navbar class='hidden md:flex' />
    <mobile-navbar class='flex md:hidden' />
  </div>
</template>

<script>
import DesktopNavbar from './DesktopNavbar.vue';
import MobileNavbar from './MobileNavbar.vue';

export default {
  name: 'navbar',
  components: {
    'desktop-navbar': DesktopNavbar,
    'mobile-navbar': MobileNavbar,
  },
};
</script>
