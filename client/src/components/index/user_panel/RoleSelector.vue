<template>
  <div class='box flex-basis-full md:flex-basis-half  text-center'>
    <h1 class='block font-semibold text-3xl mb-6 border-b'>
      What role are you performing today?
    </h1>
    <button class='btn--primary hero-btn mb-6 mr-0 md:mb-0 md:mr-6' @click='setRole("dm")'>
      DM
    </button>
    <button class='btn--primary hero-btn' @click='setRole("player")'>Player</button>
  </div>
</template>

<script>
export default {
  name: 'role_selector',
  methods: {
    setRole(role) {
      this.$emit('updateRole', role);
    },
  },
};
</script>

<style lang='scss'>
.hero-btn {
  border-radius: 0.25rem;
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem 6rem;
  width: 100%;
}

@screen md {
  .hero-btn {
    display: inline;
    width: auto;
  }
}
</style>
