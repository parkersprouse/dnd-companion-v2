<template>
  <div>
    <main-navbar />
    <div>Login</div>
  </div>
</template>

<script>
export default {
  name: 'login',
  mounted() {
    this.$http.post('/api/login', { username: 'parker', password: 'password' });
  },
};
</script>
