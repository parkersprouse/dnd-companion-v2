<template>
  <div>
    <main-navbar />
    <div class='container'>
      <div class='page-header'>
        <h1>My Games</h1>
      </div>
      <uiv-tabs>
        <uiv-tab title='Games You Run'>
          <div class='flex-row game-list-container'>
            <uiv-alert type='danger' v-if='owned_games_err'>
              <span v-html='feather.icons["alert-octagon"].toSvg()'></span> Failed to get games you run
            </uiv-alert>
            <div class='no-games-notice' v-else-if='owned_games && owned_games.length === 0'>
              You are not running any games
            </div>
            <div class='flex-column' v-for='game in owned_games' :key='game.id' v-else>
              <div class='panel panel-default game-list-panel' @click='goto(game.id)'>
                <div class='panel-body'>
                  <div class='game-name' :title='game.name'>{{ game.name }}</div>
                  <div class='game-desc' :title='game.description' v-if='game.description'>{{ game.description }}</div>
                  <div class='game-desc' style='font-style: italic;' v-else>No Description</div>
                </div>
              </div>
            </div>
          </div>
        </uiv-tab>
        <uiv-tab title='Games You Play'>
          <div class='flex-row game-list-container'>
            <uiv-alert type='danger' v-if='played_games_err'>
              <span v-html='feather.icons["alert-octagon"].toSvg()'></span> Failed to get games you play
            </uiv-alert>
            <div class='no-games-notice' v-else-if='played_games && played_games.length === 0'>
              You are not playing in any games
            </div>
            <div class='flex-column' v-for='game in played_games' :key='game.id' v-else>
              <div class='panel panel-default game-list-panel' @click='goto(game.id)'>
                <div class='panel-body'>
                  <div class='game-name'>{{ game.name }}</div>
                  <div class='game-desc' :title='game.description' v-if='game.description'>{{ game.description }}</div>
                  <div class='game-desc' style='font-style: italic;' v-else>No Description</div>
                </div>
              </div>
            </div>
          </div>
        </uiv-tab>
      </uiv-tabs>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'my-games',
  data() {
    return {
      feather,
      owned_games: null,
      owned_games_err: false,
      played_games: null,
      played_games_err: false,
    };
  },
  mounted() {
    this.$http.get('/api/games/own')
      .then((response) => {
        this.owned_games = response.data.content;
      })
      .catch(() => {
        this.owned_games_err = true;
      });

    this.$http.get('/api/games/play')
      .then((response) => {
        this.played_games = response.data.content;
      })
      .catch(() => {
        this.played_games_err = true;
      });
  },
  methods: {
    goto(id) {
      window.location.href = `/games/${id}`;
    },
  },
};
</script>
