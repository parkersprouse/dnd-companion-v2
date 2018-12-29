<template>
  <div>
    <p v-for='item in desc' :key='item'>{{ item }}</p>
  </div>
</template>

<script>
export default {
  name: 'weapon-property-details',
  props: ['property'],
  data() {
    return {
      desc: null,
    };
  },
  mounted() {
    this.$http.post('/api/dnd/weapon_properties', { name: this.property })
      .then((response) => {
        this.desc = response.data.content[0].desc;
      })
      .catch(() => {
        this.desc = ['Failed to load property information'];
      });
  },
};
</script>
