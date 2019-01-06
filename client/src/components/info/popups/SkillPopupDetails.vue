<template>
  <div>
    <p v-for='item in desc' :key='item'>{{ item }}</p>
  </div>
</template>

<script>
export default {
  name: 'skill-popup-details',
  props: ['skill'],
  data() {
    return {
      desc: null,
    };
  },
  mounted() {
    let { skill } = this;
    if (skill.includes('Skill:')) {
      skill = skill.slice(7).replace(/^\s+|\s+$/gm, '');
    }

    this.$http.post('/api/dnd/skills', { name: skill })
      .then((response) => {
        this.desc = response.data.content[0].desc;
      })
      .catch(() => {
        this.desc = ['Failed to load property information'];
      });
  },
};
</script>
