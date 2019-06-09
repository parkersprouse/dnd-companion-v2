<template>
  <div>
    <!-- Error Alert -->
    <v-alert v-if='error' :value='true' type='error'>
      Failed to load race
    </v-alert>

    <!-- Loading Indicator -->
    <div v-else-if='!race' class='text-xs-center'>
      <v-progress-circular indeterminate :size='70' :width='7'></v-progress-circular>
    </div>

    <div v-else>
      <h1 class='page-title'>{{ race.name }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'race_info',
  data() {
    return {
      error: false,
      race: null,
    };
  },
  mounted() {
    this.$http.post('/api/dnd/races', { name: this.$route.params.race })
      .then((response) => {
        this.race = response.data.content[0];
      })
      .catch(() => {
        this.error = true;
      });
  },
};
</script>
