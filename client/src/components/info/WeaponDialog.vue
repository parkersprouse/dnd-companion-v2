<template>
  <v-dialog v-model='show' content-class='info-dialog' scrollable>
    <v-card>
      <v-btn class='close-dialog' @click='show = false' icon><v-icon>fa-times</v-icon></v-btn>
      <v-card-title class='headline blue-grey lighten-5'>{{ item.name }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list three-line>

          <v-list-tile class='info-dialog-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Category</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ item.weapon_category   }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile class='info-dialog-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Range</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary' v-html='range'>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile class='info-dialog-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Damage</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ damage  }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile class='info-dialog-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Properties</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                <div v-for='(prop, index) in item.properties' :key='index'>
                  <weapon-property-popover :property='prop.name' />
                </div>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile class='info-dialog-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Price</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ price }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile class='info-dialog-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Weight</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ weight }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if='item.special' class='info-dialog-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Special Details</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                <div v-for='special in item.special' :key='special'>{{ special }}</div>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import WeaponPropertyPopover from '@/components/info/WeaponPropertyPopover.vue';

export default {
  name: 'weapon_dialog',
  props: {
    value: {
      required: false,
      type: Object,
    },
  },
  components: {
    'weapon-property-popover': WeaponPropertyPopover,
  },
  data() {
    return {
      popover: false,
      show: false,
    };
  },
  methods: {
    close() {
      this.$emit('input', null);
    },
  },
  computed: {
    damage() {
      let dmg = '-';

      if (this.item.damage && this.item.damage.damage_type) {
        if (this.item.damage.dice_value === 0) {
          dmg = `${this.item.damage.dice_count} ${this.item.damage.damage_type.name}`;
        } else {
          dmg = `${this.item.damage.dice_count}d${this.item.damage.dice_value} ${this.item.damage.damage_type.name}`;
        }
      }

      if (this.item['2h_damage'] && this.item['2h_damage'].damage_type) {
        if (this.item['2h_damage'].dice_value === 0) {
          dmg += ` (${this.item['2h_damage'].dice_count} ${this.item['2h_damage'].damage_type.name})`;
        } else {
          dmg += ` (${this.item['2h_damage'].dice_count}d${this.item['2h_damage'].dice_value} ${this.item['2h_damage'].damage_type.name})`;
        }
      }

      return dmg;
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

    range() {
      let range = 'N/A';
      if (this.item.weapon_range) {
        range = `<div>${this.item.weapon_range}</div>`;

        if (this.item.weapon_range === 'Ranged' && this.item.ammo_range) {
          range = `<div>Ranged: ${this.item.ammo_range.normal} / ${this.item.ammo_range.long}</div>`;
        }

        if (this.item.throw_range) {
          range += `<div>Thrown: ${this.item.throw_range.normal} / ${this.item.throw_range.long}</div>`;
        }
      }
      return range;
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
