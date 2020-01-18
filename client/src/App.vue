<template>
  <div class='container p-4'>
    <router-link class='pointer' :to='{ name: "index" }'>
      <h1 class='text-center font-semibold text-5xl mb-6'>D&D Companion</h1>
    </router-link>
    <router-view />
  </div>
</template>
