<template>
  <div class='flex flex-row flex-wrap items-stretch content-center justify-center'>
    <div class='box flex-basis-full md:flex-basis-half'>
      <h3 class='form-header'>Create Character</h3>
      <form class='form-v' @submit.prevent='submit'>
        <alert type='info'>
          Once you've created your character by giving it a name, you will be redirected to
          the character sheet to finish filling out its information.
        </alert>
        <alert v-if='error' type='error'>{{ error }}</alert>

        <label class='form-v__label' for='name'>Character Name</label>
        <input v-model='name' class='input form-v__input' id='name' type='text' />

        <button class='btn btn--primary w-full' :class='{ loading }' :disabled='loading'
                type='submit'>
          Create
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'create_character',
  data() {
    return {
      error: null,
      loading: false,
      name: '',
    };
  },
  methods: {
    submit() {
      if (this.loading) return;
      this.error = null;
      this.loading = true;
      this.$http.post('/api/characters', { name: this.name })
        .then((res) => {
          this.$router.push({ name: 'show_character', params: { id: res.data.id } });
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.loading = false;
        });
    },
  },
};
</script>
