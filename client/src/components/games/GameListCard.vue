<template>
  <div class='panel panel-default list-entry-panel' @click='visit'>
    <div class='panel-body'>
      <div class='list-entry-title' :title='game_data.name'>{{ game_data.name }}</div>
      <div class='list-entry-detail' :title='game_data.description' v-if='game_data.description'>{{ game_data.description }}</div>
      <div class='list-entry-detail' style='font-style: italic;' v-else>No Description</div>
      <div class='list-entry-detail' v-if='players'>Players: {{ players.length }}</div>
      <div class='list-entry-detail' v-if='characters'>Characters: {{ characters.length }}</div>
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
    this.$http.get(`/api/games/characters/${this.game_data.id}`)
      .then((response) => {
        this.characters = response.data.content;
      })
      .catch(() => {
        console.log('error getting chars');
      });

    this.$http.get(`/api/games/players/${this.game_data.id}`)
      .then((response) => {
        this.players = response.data.content;
      })
      .catch(() => {
        console.log('error getting players');
      });
  },
  methods: {
    visit() {
      window.location.href = `/games/${this.game_data.id}`;
    },
  },
  computed: {
    game_data() {
      return this.game.game ? this.game.game : this.game;
    },
  },
};
</script>
