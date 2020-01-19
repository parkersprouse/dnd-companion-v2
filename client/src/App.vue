<template>
  <div>
    <navbar />
    <div class='container p-4'>
      <router-link class='pointer' :to='{ name: "index" }'>
        <h1 class='text-center font-semibold text-5xl mb-6'>D&D Companion</h1>
      </router-link>
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
