<template>
  <v-menu v-model='show' :close-on-content-click='true' :open-on-hover='true' max-width='400'
          offset-x offset-y right top>
    <template v-slot:activator='{ on }'>
      <span v-on='on' class='has-popover'>{{ property }}</span>
    </template>
    <v-card class='popover-card'>
      <v-card-title class='headline'>{{ property }}</v-card-title>
      <v-card-text>
        <p v-for='detail in property_details' :key='detail'>{{ detail }}</p>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'weapon_property_popover',
  props: {
    property: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      property_details: null,
      show: false,
    };
  },
  mounted() {
    this.$http.post('/api/dnd/weapon_properties', { name: this.property })
      .then((response) => {
        this.property_details = response.data.content[0].desc;
      })
      .catch(() => {
        this.property_details = ['Failed to load property information'];
      });
  },
};
</script>
