<template>
  <div v-if='$store.getters.logged_in'>
    <h1 class='site-header'>D&D Companion</h1>
    <div class='flex flex-row flex-wrap items-stretch content-center justify-center'>

    </div>
  </div>
  <div v-else>
    <h1 class='site-header'>D&D Companion</h1>
    <div class='flex flex-row flex-wrap items-stretch content-center justify-center'>
      <div class='flex-basis-full md:flex-basis-auto md:max-w-1/2 flex-1 box'>
        <h3 class='form-header'>Login</h3>
        <login-form />
      </div>
      <div class='flex-basis-full md:flex-basis-auto md:max-w-1/2 flex-1 mt-2 ml-0 md:mt-0 md:ml-2
                  box'>
        <h3 class='form-header'>Register</h3>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/index/LoginForm.vue';

export default {
  name: 'index',
  components: {
    'login-form': LoginForm,
  },
};
</script>

<style lang='scss'>
  .site-header {
    @apply text-center font-semibold text-5xl;
  }
</style>
