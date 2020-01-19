<template>
  <div>
    <desktop-navbar class='hidden md:block' />
    <mobile-navbar class='block md:hidden' />
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
