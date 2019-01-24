<template>
  <div class='panel panel-default game-list-panel' @click='visit'>
    <div class='panel-body'>
      <div class='game-name' :title='char.name'>{{ char.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'character-list-card',
  props: ['char'],
  methods: {
    visit() {
      window.location.href = `/characters/${this.char.id}`;
    },
  },
};
</script>
