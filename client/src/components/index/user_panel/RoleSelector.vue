<template>
  <div class='box flex-basis-full md:flex-basis-half  text-center'>
    <h1 class='block font-semibold text-3xl mb-6 border-b'>
      What role are you performing today?
    </h1>
    <button class='hero-btn mb-6 mr-0 md:mb-0 md:mr-6' @click='setRole("dm")'>
      DM
    </button>
    <button class='hero-btn' @click='setRole("player")'>Player</button>
  </div>
</template>

<script>
export default {
  name: 'role_selector',
  methods: {
    setRole(role) {
      this.$cookies.set('role', role, { expires: 365 });
      this.$emit('updateRole', role);
    },
  },
};
</script>

<style lang='scss'>
.hero-btn {
  @apply bg-indigo-400 block py-4 px-24 rounded text-2xl font-bold w-full;
}

@screen md {
  .hero-btn {
    @apply inline w-auto;
  }
}
</style>
