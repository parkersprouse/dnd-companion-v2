<template>
  <div class='flex-basis-full md:flex-basis-half'>
    <div class='text-center mb-4'>
      <a class='link' @click='$emit("updateRole", "dm");'>Switch to DM</a>
    </div>

    <div class='box'>
      <h1 class='font-semibold text-3xl mb-6 border-b'>Characters</h1>
      <alert v-if='error' type='error'>{{ error }}</alert>
      <div v-else-if='loading'>
        Loading...
      </div>
      <div v-else>
        <router-link v-for='char in characters' :key='char.id'
                     class='block box mb-3 hover:border-red-700 hover:text-red-700'
                    :to='`characters/${char.data.id}`'>
          <div>
            <span class='block font-semibold text-2xl mb-2'>
              {{ char.data.name }}
            </span>
            <span class='block mb-1'>
              Level {{ char.data.level }}
              {{ char.data.race || 'No Race' }} {{ char.data.class || 'No Class' }}
            </span>
            <span v-if='char.game'>{{ char.game.name }}</span>
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
