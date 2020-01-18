<template>
  <div>
    <alert v-if='error' type='error'>{{ error }}</alert>
    <textarea v-model='character' class='w-full' style='height: 400px'></textarea>
  </div>
</template>

<script>
export default {
  name: 'show_character',
  data() {
    return {
      character: null,
      error: null,
    };
  },
  mounted() {
    this.$http.get(`/api/characters/${this.$route.params.id}`)
      .then((res) => {
        this.character = JSON.stringify(res.data.content);
      })
      .catch((err) => {
        this.error = err.response.data.message;
      });
  },
};
</script>
