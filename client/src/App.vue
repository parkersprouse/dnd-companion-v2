<template>
  <div>
    <navbar />
    <div class='container p-4'>
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from './components/navbar/Navbar.vue';

export default {
  name: 'app',
  components: {
    'navbar': Navbar,
  },
};
</script>
