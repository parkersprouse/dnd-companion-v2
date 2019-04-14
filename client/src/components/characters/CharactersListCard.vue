<template>
  <div class='panel panel-default list-entry-panel' @click='visit'>
    <div class='panel-body'>
      <div class='list-entry-title' :title='char.name'>{{ char.name }}</div>
      <div class='list-entry-detail' :title='char.class'>Class: {{ char.class || '-' }}</div>
      <div class='list-entry-detail' :title='char.race'>Race: {{ char.race || '-' }}</div>
      <div v-if='char.game' class='list-entry-detail' :title='char.game.name'>In Game: {{ char.game.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'character-list-card',
  props: ['char'],
  mounted() {
    console.log(this.char);
  },
  methods: {
    visit() {
      window.location.href = `/characters/${this.char.id}`;
    },
  },
};
</script>
