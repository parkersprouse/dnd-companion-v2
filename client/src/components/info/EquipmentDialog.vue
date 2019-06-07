<template>
  <v-dialog v-model='show' content-class='info-list'>
    <v-card>
      <v-btn class='close-dialog' @click='show = false' icon><v-icon>fa-times</v-icon></v-btn>
      <v-card-title class='headline blue-grey lighten-5'>{{ item.name }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list three-line>

          <v-list-tile class='info-list-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Category</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                <div>{{ item.equipment_category }}</div>
                <div v-if='item.gear_category'>{{ item.gear_category }}</div>
                <div v-if='item.tool_category'>{{ item.tool_category }}</div>
                <div v-if='item.vehicle_category '>{{ item.vehicle_category }}</div>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile class='info-list-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Price</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ price }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider v-if='item.weight || item.capacity'></v-divider>

          <v-list-tile v-if='item.weight' class='info-list-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Weight</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ item.weight }} lbs.
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-else-if='item.capacity' class='info-list-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Capacity</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ item.capacity }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider v-if='item.speed'></v-divider>

          <v-list-tile v-if='item.speed' class='info-list-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Speed</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ item.speed.quantity }} {{ item.speed.unit }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider v-if='item.desc'></v-divider>

          <v-list-tile v-if='item.desc' class='info-list-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Description</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                <div v-for='item in item.desc' class='multiline' :key='item'>{{ item }}</div>
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
  name: 'equipment_dialog',
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
