<template>
  <div class='flex flex-row flex-wrap items-stretch content-center justify-center'>
    <loader v-if='!role' />
    <role-selector v-else-if='role === "none"' @selected='updateRole' />
    <games-panel v-else-if='role === "dm"' />
    <characters-panel v-else />
  </div>
</template>

<script>
import CharactersPanel from '@/components/index/user_panel/CharactersPanel.vue';
import GamesPanel from '@/components/index/user_panel/GamesPanel.vue';
import RoleSelector from '@/components/index/user_panel/RoleSelector.vue';

export default {
  name: 'user_panel',
  components: {
    'characters-panel': CharactersPanel,
    'games-panel': GamesPanel,
    'role-selector': RoleSelector,
  },
  data() {
    return {
      role: null,
    };
  },
  mounted() {
    const role = this.$cookies.get('role');
    if (!role) this.role = 'none';
    else if (role === 'dm') this.role = 'dm';
    else this.role = 'player';
  },
  methods: {
    updateRole(role) {
      this.role = role;
    },
  },
};
</script>
