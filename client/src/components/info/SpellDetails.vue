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
          <dd>{{ spell.school.name }}</dd>
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

  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'spell-details',
  props: ['spell'],
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
