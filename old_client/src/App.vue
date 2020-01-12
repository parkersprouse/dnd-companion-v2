<template>
  <v-app>
    <navbar />
    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
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
