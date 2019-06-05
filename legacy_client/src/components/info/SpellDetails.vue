<template>
  <div v-if='spell'>

    <div class='row'>
      <div class='col-md-4'>
        <dl>
          <dt>Level</dt>
          <dd>{{ spell.level || 'Cantrip' }}</dd>
        </dl>
      </div>
      <div class='col-md-4'>
        <dl>
          <dt>School</dt>
          <dd>
            <span class='info-link' id='spell_school'>{{ spell.school.name }}</span>
            <uiv-popover placement='left' target='#spell_school' :title='spell.school.name' trigger='hover'>
              <template slot='popover'>
                <spell-school-popup-details :school='spell.school.name' />
              </template>
            </uiv-popover>
          </dd>
        </dl>
      </div>
      <div class='col-md-4'>
        <dl>
          <dt>Classes</dt>
          <dd>{{ classes }}</dd>
        </dl>
      </div>
    </div>

    <div class='row'>
      <div class='col-md-4'>
        <dl>
          <dt>Range</dt>
          <dd>{{ spell.range }}</dd>
        </dl>
      </div>
      <div class='col-md-4'>
        <dl>
          <dt>Casting Time</dt>
          <dd>{{ spell.casting_time }}</dd>
        </dl>
      </div>
      <div class='col-md-4'>
        <dl>
          <dt>Duration</dt>
          <dd>{{ spell.duration }}</dd>
        </dl>
      </div>
    </div>

    <div class='row'>
      <div class='col-md-4'>
        <dl>
          <dt>Components</dt>
          <dd>
            <div>{{ components }}</div>
            <div v-if='spell.material'>{{ spell.material }}</div>
          </dd>
        </dl>
      </div>
      <div class='col-md-4'>
        <dl>
          <dt>Concentration</dt>
          <dd>{{ spell.concentration }}</dd>
        </dl>
      </div>
      <div class='col-md-4'>
        <dl>
          <dt>Ritual</dt>
          <dd>{{ spell.ritual }}</dd>
        </dl>
      </div>
    </div>

    <div class='row'>
      <div class='col-xs-12'>
        <dl>
          <dt>Details</dt>
          <dd>
            <p v-for='item in spell.desc' :key='item'>{{ item }}</p>
          </dd>
        </dl>
      </div>
    </div>

    <div class='row' v-if='spell.higher_level'>
      <div class='col-xs-12'>
        <dl>
          <dt>Higher Levels</dt>
          <dd>
            <p v-for='item in spell.higher_level' :key='item'>{{ item }}</p>
          </dd>
        </dl>
      </div>
    </div>

  </div>
</template>

<script>
import _ from 'lodash';
import SpellSchoolPopupDetails from './popups/SpellSchoolPopupDetails.vue';

export default {
  name: 'spell-details',
  props: ['spell'],
  components: {
    'spell-school-popup-details': SpellSchoolPopupDetails,
  },
  computed: {
    classes() {
      return _.join(_.map(this.spell.classes, sc => sc.name), ', ');
    },
    components() {
      return _.join(this.spell.components, ', ');
    },
  },
};
</script>
