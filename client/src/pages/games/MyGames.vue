<template>
  <div>
    <main-navbar />
    <div class='container'>
      <div class='page-header'>
        <h1>My Games</h1>
      </div>
      <uiv-tabs>
        <uiv-tab title='Games You Run'>
          <div class='row'>
            <div class='col-md-4' v-for='game in owned_games' :key='game.id'>
              <div class='panel panel-default'>
                <div class='panel-heading'>
                  <span class='panel-title'>{{ game.name }}</span>
                </div>
                <div class='panel-body'>
                  {{ game.description }}
                </div>
              </div>
            </div>
          </div>
        </uiv-tab>
        <uiv-tab title='Games You Play'>
          <div>
            {{ played_games }}
          </div>
        </uiv-tab>
      </uiv-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-games',
  data() {
    return {
      owned_games: null,
      played_games: null,
    };
  },
  mounted() {
    this.$http.get('/api/games/own')
      .then((response) => {
        this.owned_games = response.data.content;
      })
      .catch((error) => {
        console.log(error.response);
      });

    this.$http.get('/api/games/play')
      .then((response) => {
        this.played_games = response.data.content;
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
};
</script>
