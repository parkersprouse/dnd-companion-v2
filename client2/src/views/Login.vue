<template>
  <div style='max-width: 500px;'>
    <va-card elevation='2' padding='1rem'>
      <login-form />
    </va-card>
  </div>
</template>

<script>
import LoginForm from '../components/login/LoginForm.vue';

export default {
  name: 'login',
  components: {
    'login-form': LoginForm,
  },
};
</script>

<style lang='scss'>

</style>
