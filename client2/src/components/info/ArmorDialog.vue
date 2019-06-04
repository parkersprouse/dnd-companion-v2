<template>
  <v-dialog v-model='show' content-class='info-dialog'>
    <v-card>
      <v-btn class='close-dialog' @click='show = false' icon><v-icon>fa-times</v-icon></v-btn>
      <v-card-title class='headline blue-grey lighten-5'>{{ item.name }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list three-line>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Category</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ item.armor_category  }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Armor Class</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ armor_class }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Stealth Disadvantage</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ item.stealth_disadvantage ? 'Yes' : 'No'  }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Minimum Strength</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ item.str_minimum || '0' }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Price</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ price }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Weight</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ weight }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'armor_dialog',
  props: {
    value: {
      required: false,
      type: Object,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    close() {
      this.$emit('input', null);
    },
  },
  computed: {
    armor_class() {
      if (!this.item.armor_class) return null;
      const dex_modifier = this.item.armor_class.dex_bonus ? ' + dex. modifier' : '';
      const max_bonus = this.item.armor_class.max_bonus ? `(max ${this.item.armor_class.max_bonus})` : '';
      return `${this.item.armor_class.base} ${dex_modifier} ${max_bonus}`;
    },

    item() {
      // Attempting to access `value.attribute` when value is `null` will cause
      // the dialog to throw an error, so the best way to prevent any errors
      // from being thrown is to give the dialog a dummy object to attempt
      // the access the attributes of, which will not throw an error.
      return this.value || {};
    },

    price() {
      let price = 'N/A';
      if (this.item.cost) price = `${this.item.cost.quantity} ${this.item.cost.unit}`;
      return price;
    },

    weight() {
      let weight = 'N/A';
      if (this.item.weight) weight = `${this.item.weight} lbs.`;
      return weight;
    },
  },
  watch: {
    show(new_val) {
      if (!new_val) this.close();
    },

    value(new_val) {
      this.show = !!new_val;
    },
  },
};
</script>
