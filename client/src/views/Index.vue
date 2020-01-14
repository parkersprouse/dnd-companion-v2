<template>
  <div v-if='$store.getters.logged_in'>
    <h1 class='site-header'>D&D Companion</h1>
    <div class='flex flex-row flex-wrap items-stretch content-center justify-center'>

    </div>
  </div>
  <div v-else>
    <h1 class='site-header'>D&D Companion</h1>
    <div class='flex flex-row flex-wrap items-stretch content-center justify-center'>
      <div class='w-full md:w-1/2'>
        asd
      </div>
      <div class='w-full md:w-1/2'>
        xcv
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
};
</script>

<style lang='scss'>
  .site-header {
    @apply text-center font-semibold text-5xl;
  }
</style>
