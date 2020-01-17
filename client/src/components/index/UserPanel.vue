<template>
  <div class='flex flex-row flex-wrap items-stretch content-center justify-center'>
    <loader v-if='!role' />
    <role-selector v-else-if='role === "none"' @updateRole='updateRole' />
    <games-panel v-else-if='role === "dm"' @updateRole='updateRole' />
    <characters-panel v-else @updateRole='updateRole' />
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
    this.role = this.$cookies.get('role') || 'none';
  },
  methods: {
    updateRole(role) {
      this.role = role;
    },
  },
};
</script>
