<template>
  <div class='flex-basis-full md:flex-basis-half'>
    <div class='text-center mb-4'>
      <a class='link' @click='$emit("updateRole", "dm");'>Switch to DM</a>
    </div>

    <div class='box'>
      <div class='flex flex-wrap justify-between mb-6 border-b'>
        <div class=''>
          <h1 class='font-semibold text-3xl self-end'>Characters</h1>
        </div>
        <div class='self-center'>
          <router-link class='btn btn--primary' :to='{ name: "create_character" }'>
            <i class='fas fa-plus-square mr-2'></i>Create Character
          </router-link>
        </div>
      </div>
      <alert v-if='error' type='error'>{{ error }}</alert>
      <div v-else-if='loading'>
        Loading...
      </div>
      <div v-else>
        <router-link v-for='char in characters' :key='char.id'
                     class='block box mb-3 hover:border-purple-700 hover:text-purple-700'
                    :to='{ name: "show_character", params: { id: char.data.id } }'>
          <div>
            <span class='block font-semibold text-2xl mb-2'>
              {{ char.data.name }}
            </span>
            <span class='block mb-1'>
              Level {{ char.data.level }}
              {{ char.data.race || 'No Race' }} {{ char.data.class || 'No Class' }}
            </span>
            <span v-if='char.game'>In Game: {{ char.game.name }}</span>
            <span v-else class='italic'>Not in a game</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'characters_panel',
  data() {
    return {
      characters: null,
      error: null,
      loading: true,
    };
  },
  mounted() {
    this.$http.get('/api/characters/me')
      .then((res) => {
        this.characters = res.data.content;
        this.loading = false;
      })
      .catch((err) => {
        this.error = err.response.data.message;
        this.loading = false;
      });
  },
};
</script>
