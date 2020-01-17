<template>
  <div class='flex-basis-full md:flex-basis-half'>
    <div class='text-center mb-4'>
      <a class='link' @click='$emit("updateRole", "player");'>Switch to Player</a>
    </div>
    <div class='box'>
      <h1 class='font-semibold text-3xl mb-6 border-b'>Games</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'games_list',
};
</script>
