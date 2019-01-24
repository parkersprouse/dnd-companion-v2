<template>
  <div class='panel panel-default game-list-panel' @click='goto(game.id)'>
    <div class='panel-body'>
      <div class='game-name' :title='game.name'>{{ game.name }}</div>
      <div class='game-desc' :title='game.description' v-if='game.description'>{{ game.description }}</div>
      <div class='game-desc' style='font-style: italic;' v-else>No Description</div>

      <div v-if='players'>Players: {{ players.length }}</div>
      <div v-if='characters'>Characters: {{ characters.length }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'game-list-card',
  props: ['game'],
  data() {
    return {
      characters: null,
      players: null,
    };
  },
  mounted() {
    this.$http.get(`/api/games/characters/${this.game.id}`)
      .then((response) => {
        this.characters = response.data.content;
      })
      .catch(() => {
        console.log('error getting chars');
      });

    this.$http.get(`/api/games/players/${this.game.id}`)
      .then((response) => {
        this.players = response.data.content;
      })
      .catch(() => {
        console.log('error getting players');
      });
  },
  methods: {
    goto(id) {
      window.location.href = `/games/${id}`;
    },
  },
};
</script>
