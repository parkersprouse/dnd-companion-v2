<template>
  <v-alert v-if='error' :value='true' type='error'>
    Failed to load starting equipment options
  </v-alert>
  <div v-else-if='!equipment' class='text-xs-center'>
    <v-progress-circular indeterminate :size='40' :width='4'></v-progress-circular>
  </div>
  <div v-else>
    <div class='dynamic-row'>
      <div v-for='num in equipment.choices_to_make' class='col' :key='num'>
        {{ num }}
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'starting_equipment_panel',
  props: {
    klass: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      error: false,
      equipment: null,
    };
  },
  mounted() {
    this.$http.post('/api/dnd/starting_equipment', { class: { name: this.klass } })
      .then((response) => {
        this.equipment = response.data.content[0];
      })
      .catch(() => {
        this.error = true;
      });
  },
  computed: {

  },
};
</script>
