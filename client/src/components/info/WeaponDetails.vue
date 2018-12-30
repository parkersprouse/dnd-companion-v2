<template>
  <div v-if='weapon'>
    <div class='row'>
      <div class='col-md-4'>
        <dl>
          <dt>Category</dt>
          <dd>{{ weapon.weapon_category }}</dd>
        </dl>
      </div>
      <div class='col-md-4'>
        <dl>
          <dt>Range</dt>
          <dd>{{ weapon.weapon_range }}</dd>
        </dl>
      </div>
      <div class='col-md-4'>
        <dl>
          <dt>Damage</dt>
          <dd>{{ damage }}</dd>
        </dl>
      </div>
    </div>
    <div class='row'>
      <div class='col-md-4'>
        <dl>
          <dt>Properties</dt>
          <dd>
            <div v-for='(prop, index) in weapon.properties' :key='index'>
              <span class='info-link' :id='`prop${index}`'>{{ prop.name }}</span>
              <uiv-popover placement='left' :target='`#prop${index}`' :title='prop.name' trigger='hover'>
                <template slot="popover">
                  <weapon-property-popup-details :property='prop.name' />
                </template>
              </uiv-popover>
            </div>
          </dd>
        </dl>
      </div>
      <div class='col-md-4'>
        <dl>
          <dt>Price</dt>
          <dd>{{ weapon.cost ? `${weapon.cost.quantity} ${weapon.cost.unit}` : '-' }}</dd>
        </dl>
      </div>
      <div class='col-md-4'>
        <dl>
          <dt>Weight</dt>
          <dd>{{ weapon.weight ? `${weapon.weight} lbs.` : '-' }}</dd>
        </dl>
      </div>
    </div>
    <div class='row' v-if='weapon.special'>
      <div class='col-xs-12'>
        <dl>
          <dt>Special Details</dt>
          <dd>
            <p v-for='special in weapon.special' :key='special'>{{ special }}</p>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import WeaponPropertyPopupDetails from './WeaponPropertyPopupDetails.vue';

export default {
  name: 'weapon-details',
  components: {
    'weapon-property-popup-details': WeaponPropertyPopupDetails,
  },
  props: ['weapon'],
  computed: {
    damage() {
      let dmg = '-';
      if (this.weapon.damage && this.weapon.damage.damage_type) {
        if (this.weapon.damage.dice_value === 0) {
          dmg = `${this.weapon.damage.dice_count} ${this.weapon.damage.damage_type.name}`;
        }
        else {
          dmg = `${this.weapon.damage.dice_count}d${this.weapon.damage.dice_value} ${this.weapon.damage.damage_type.name}`;
        }
      }
      return dmg;
    },
  },
};
</script>
