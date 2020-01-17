<template>
  <div class='flex-basis-full md:flex-basis-half'>
    <div class='text-center mb-4'>
      <a class='link' @click='$emit("updateRole", "player");'>Switch to Player</a>
    </div>
    <div class='box'>
      <div class='flex flex-wrap justify-between mb-6 border-b'>
        <div class=''>
          <h1 class='font-semibold text-3xl self-end'>Games</h1>
        </div>
        <div class='self-center'>
          <router-link class='btn btn--primary' :to='{ name: "create_game" }'>
            <i class='fas fa-plus-square mr-2'></i>Create Game
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'games_list',
};
</script>
