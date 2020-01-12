<template>
  <v-alert v-if='error' :value='true' type='error'>
    Failed to load starting equipment options
  </v-alert>
  <div v-else-if='!equipment' class='text-xs-center'>
    <v-progress-circular indeterminate :size='40' :width='4'></v-progress-circular>
  </div>
  <div v-else class='starting-equipment-list'>
    <div v-for='num in equipment.choices_to_make' :key='num'>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class='headline'>Choice {{ num }}</h3>
            <div v-for='(choice, index) in choices(num)' :key='`choice_${choice}_${index}`'>
              <div class='select-from'>
                Select {{ choice.choose }} from:
              </div>
              <ul class='list'>
                <li v-for='item in sort(choice.from)' :key='item.name'>
                  {{ item.quantity }}x {{ item.name }}
                </li>
              </ul>
              <div v-if='index !== choices(num).length - 1' class='or-separator'>OR</div>
            </div>
          </div>
        </v-card-title>
      </v-card>
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
  methods: {
    choices(index) {
      if (!this.equipment || !this.equipment[`choice_${index}`]) return [];
      return this.equipment[`choice_${index}`];
    },
    sort(items) {
      return _.sortBy(items, ['name']);
    },
  },
};
</script>

<style lang='scss' scoped>
  .or-separator {
    font-weight: bold;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    text-align: center;
  }

  .headline {
    text-align: center;
    margin-bottom: 1rem;
  }

  .v-card__title {
    padding-top: 0;

    > div {
      width: 100%;
    }
  }
</style>
