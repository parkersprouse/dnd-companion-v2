<template>
  <div>
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
