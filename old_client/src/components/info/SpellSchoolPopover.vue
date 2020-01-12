<template>
  <v-menu v-model='show' :close-on-content-click='true' :open-on-hover='true' max-width='400'
          offset-y>
    <template v-slot:activator='{ on }'>
      <span v-on='on' class='has-popover'>{{ context }}</span>
    </template>
    <v-card class='popover-card'>
      <v-card-title class='headline'>{{ context }}</v-card-title>
      <v-card-text>
        <p>{{ details }}</p>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'spell_school_popover',
  props: {
    context: {
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
    this.$http.post('/api/dnd/magic_schools', { name: this.context })
      .then((response) => {
        this.details = response.data.content[0].desc;
      })
      .catch(() => {
        this.details = 'Failed to load school information';
      });
  },
};
</script>
