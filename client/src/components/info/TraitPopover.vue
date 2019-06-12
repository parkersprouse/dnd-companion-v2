<template>
  <v-menu v-model='show' :close-on-content-click='true' :open-on-hover='true' max-width='400'
          offset-x offset-y right top>
    <template v-slot:activator='{ on }'>
      <span v-on='on' class='has-popover'>{{ name }}</span>
    </template>
    <v-card class='popover-card'>
      <v-card-title class='headline'>{{ name }}</v-card-title>
      <v-card-text>
        <p v-for='detail in details' :key='detail'>{{ detail }}</p>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'trait_popover',
  props: {
    name: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      details: null,
      show: false,
    };
  },
  mounted() {
    this.$http.post('/api/dnd/traits', { name: this.name })
      .then((response) => {
        this.details = response.data.content[0].desc;
      })
      .catch(() => {
        this.details = ['Failed to load trait information'];
      });
  },
};
</script>
