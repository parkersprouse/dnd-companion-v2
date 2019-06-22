<template>
  <div v-if='klass'>
    <div v-for='(value, key) in klass' style='margin-bottom: 1rem;'>
      {{ key }} === {{ value }}
    </div>
  </div>
  <div v-else></div>
</template>

<script>
export default {
  name: 'class_info',
  data() {
    return {
      klass: null,
    };
  },
  mounted() {
    this.$http.post('/api/dnd/classes', { name: this.$route.params.class })
      .then((response) => {
        this.klass = response.data.content[0];
      })
      .catch(() => {
        this.error = true;
      });
  },
};
</script>
