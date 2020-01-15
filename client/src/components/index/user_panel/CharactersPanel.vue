<template>
  <div class='flex-basis-full md:flex-basis-auto md:max-w-1/2 flex-1 box'>
    <h1 class='font-semibold text-3xl mb-6 border-b'>Characters</h1>
    <alert v-if='error' type='error'>{{ error }}</alert>
    <div v-else-if='loading'>
      Loading...
    </div>
    <div v-else>
      <router-link v-for='char in characters' :key='char.id' class='block box'
                  :to='`characters/${char.data.id}`'>
        <div>
          {{ char.data.name }}
        </div>
      </router-link>
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
