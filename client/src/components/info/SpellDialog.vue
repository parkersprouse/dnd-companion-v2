<template>
  <v-dialog v-model='show' content-class='info-dialog' scrollable>
    <v-card>
      <v-btn class='close-dialog' @click='show = false' icon><v-icon>fa-times</v-icon></v-btn>
      <v-card-title class='headline blue-grey lighten-5'>{{ item.name }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text class='info-dialog-flex'>

        <div class='row thirds'>
          <div class='attribute'>
            <div class='attribute-title'>Level</div>
            <div class='attribute-content'>{{ item.level || 'Cantrip'  }}</div>
          </div>
          <div v-if='school' class='attribute'>
            <div class='attribute-title'>School</div>
            <div class='attribute-content'>
              <spell-school-popover :context='school' />
            </div>
          </div>
          <div class='attribute'>
            <div class='attribute-title'>Classes</div>
            <div class='attribute-content'>{{ classes }}</div>
          </div>
        </div>

        <div class='row thirds'>
          <div class='attribute'>
            <div class='attribute-title'>Range</div>
            <div class='attribute-content'>{{ item.range }}</div>
          </div>
          <div class='attribute'>
            <div class='attribute-title'>Casting Time</div>
            <div class='attribute-content'>{{ item.casting_time }}</div>
          </div>
          <div class='attribute'>
            <div class='attribute-title'>Duration</div>
            <div class='attribute-content'>{{ item.duration }}</div>
          </div>
        </div>

        <div class='row thirds'>
          <div class='attribute'>
            <div class='attribute-title'>Components</div>
            <div class='attribute-content'>
              <div>{{ components }}</div>
              <div v-if='item.components && item.components.includes("M")'>
                {{ material }}
              </div>
            </div>
          </div>
          <div class='attribute'>
            <div class='attribute-title'>Concentration</div>
            <div class='attribute-content'>{{ item.concentration }}</div>
          </div>
          <div class='attribute'>
            <div class='attribute-title'>Ritual</div>
            <div class='attribute-content'>{{ item.ritual }}</div>
          </div>
        </div>

        <div class='row whole'>
          <div class='attribute'>
            <div class='attribute-title'>Details</div>
            <div class='attribute-content multiline'>
              <div v-for='entry in item.desc' :key='entry'>{{ entry }}</div>
            </div>
          </div>
        </div>

        <div v-if='item.higher_level' class='row whole'>
          <div class='attribute'>
            <div class='attribute-title'>Higher Level</div>
            <div class='attribute-content multiline'>
              <div v-for='entry in item.higher_level' :key='entry'>{{ entry }}</div>
            </div>
          </div>
        </div>

      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import _ from 'lodash';
import SpellSchoolPopover from '@/components/info/SpellSchoolPopover.vue';

export default {
  name: 'spell_dialog',
  props: {
    value: {
      required: false,
      type: Object,
    },
  },
  components: {
    'spell-school-popover': SpellSchoolPopover,
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
    classes() {
      return _.join(_.map(this.item.classes, c => c.name), ', ');
    },

    components() {
      return _.join(this.item.components, ', ');
    },

    item() {
      // Attempting to access `value.attribute` when value is `null` will cause
      // the dialog to throw an error, so the best way to prevent any errors
      // from being thrown is to give the dialog a dummy object to attempt
      // the access the attributes of, which will not throw an error.
      return this.value || {};
    },

    material() {
      let { material } = this.item;
      if (material && material.endsWith('.')) material = material.slice(0, -1);
      return material;
    },

    school() {
      if (this.item.school) return this.item.school.name;
      return null;
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
