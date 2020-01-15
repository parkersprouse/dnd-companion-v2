<template>
  <div class='flex flex-row flex-wrap items-stretch content-center justify-center'>
    <characters-panel />
    <games-panel />
  </div>
</template>

<script>
import CharactersPanel from '@/components/index/user_panel/CharactersPanel.vue';
import GamesPanel from '@/components/index/user_panel/GamesPanel.vue';

export default {
  name: 'user_panel',
  components: {
    'characters-panel': CharactersPanel,
    'games-panel': GamesPanel,
  },
};
</script>
