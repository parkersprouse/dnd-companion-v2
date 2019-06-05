<template>
  <div>
    <main-navbar />
    <div class='container'>
      <div class='page-header'>
        <h1>My Games</h1>
      </div>
      <uiv-tabs pills>
        <uiv-tab title='Games You Run'>
          <div class='flex-row list-container'>
            <uiv-alert type='danger' v-if='owned_games_err'>
              <span v-html='feather.icons["alert-octagon"].toSvg()'></span> Failed to get games you run
            </uiv-alert>
            <div class='empty-notice' v-else-if='owned_games && owned_games.length === 0'>
              You are not running any games
            </div>
            <div class='flex-column' v-for='game in owned_games' :key='game.id' v-else>
              <game-card :game='game' />
            </div>
          </div>
        </uiv-tab>
        <uiv-tab title='Games You Play'>
          <div class='flex-row list-container'>
            <uiv-alert type='danger' v-if='played_games_err'>
              <span v-html='feather.icons["alert-octagon"].toSvg()'></span> Failed to get games you play
            </uiv-alert>
            <div class='empty-notice' v-else-if='played_games && played_games.length === 0'>
              You are not playing in any games
            </div>
            <div class='flex-column' v-for='game in played_games' :key='game.id' v-else>
              <game-card :game='game' />
            </div>
          </div>
        </uiv-tab>
      </uiv-tabs>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';
import GameListCard from '../../components/games/GameListCard.vue';

export default {
  name: 'my-games',
  components: {
    'game-card': GameListCard,
  },
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
};
</script>
