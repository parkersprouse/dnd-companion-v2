<template>
  <div>{{ desc }}</div>
</template>

<script>
export default {
  name: 'spell-school-popup-details',
  props: ['school'],
  data() {
    return {
      desc: null,
    };
  },
  mounted() {
    this.$http.post('/api/dnd/magic_schools', { name: this.school })
      .then((response) => {
        this.desc = response.data.content[0].desc;
      })
      .catch(() => {
        this.desc = 'Failed to load school information';
      });
  },
};
</script>
