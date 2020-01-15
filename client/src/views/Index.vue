<template>
  <div>
    <h1 class='text-center font-semibold text-5xl mb-6'>D&D Companion</h1>
    <user-panel v-if='$store.getters.logged_in' />
    <authenticate-panel v-else />
  </div>
</template>

<script>
import AuthenticatePanel from '@/components/index/AuthenticatePanel.vue';
import UserPanel from '@/components/index/UserPanel.vue';

export default {
  name: 'index',
  components: {
    'authenticate-panel': AuthenticatePanel,
    'user-panel': UserPanel,
  },
};
</script>
