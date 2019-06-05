<template>
  <div class='panel panel-default list-entry-panel' @click='visit'>
    <div class='panel-body'>
      <div class='list-entry-title' :title='char.data.name'>{{ char.data.name }}</div>
      <div class='list-entry-detail' :title='char.data.class'>Class: {{ char.data.class || '-' }}</div>
      <div class='list-entry-detail' :title='char.data.race'>Race: {{ char.data.race || '-' }}</div>
      <div v-if='char.game' class='list-entry-detail' :title='char.game.name'>In Game: {{ char.game.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'character-list-card',
  props: ['char'],
  methods: {
    visit() {
      window.location.href = `/characters/${this.char.data.id}`;
    },
  },
};
</script>
