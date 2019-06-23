<template>
  <div id='info-page'>
    <!-- Error Alert -->
    <v-alert v-if='error' :value='true' type='error'>
      Failed to load class
    </v-alert>

    <!-- Loading Indicator -->
    <div v-else-if='!klass' class='text-xs-center'>
      <v-progress-circular indeterminate :size='70' :width='7'></v-progress-circular>
    </div>

    <div v-else>
      <h1 class='page-title'>{{ klass.name }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'class_info',
  data() {
    return {
      error: false,
      klass: null,
      shown_item: null,
    };
  },
  mounted() {
    this.$http.post('/api/dnd/classes', { name: this.$route.params.class })
      .then((response) => {
        this.klass = response.data.content[0];
      })
      .catch(() => {
        this.error = true;
      });
  },
};
</script>
