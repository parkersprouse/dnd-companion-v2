<template>
  <div class='text-center'>
    Logging out...
  </div>
</template>

<script>
export default {
  name: 'logout',
  async mounted() {
    await this.$http.get('/api/logout');
    this.$router.push({ name: 'index' });
  },
};
</script>
