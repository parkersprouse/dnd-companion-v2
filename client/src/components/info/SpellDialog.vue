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
              <v-list-tile-title>Level</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ item.level || 'Cantrip'  }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile class='info-list-tile'>
            <v-list-tile-content>
              <v-list-tile-title>School</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ school }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile class='info-list-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Classes</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ classes }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile class='info-list-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Range</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ item.range }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile class='info-list-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Casting Time</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ item.casting_time  }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile class='info-list-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Duration</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ item.duration }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile class='info-list-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Components</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary multiline'>
                <div>{{ components }}</div>
                <div v-if='item.components && item.components.includes("M")'>
                  {{ material }}
                </div>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile class='info-list-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Concentration</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ item.concentration  }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile class='info-list-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Ritual</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary'>
                {{ item.ritual }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile class='info-list-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Details</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary multiline'>
                <div v-for='entry in item.desc' :key='entry'>{{ entry }}</div>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider v-if='item.higher_level'></v-divider>

          <v-list-tile v-if='item.higher_level' class='info-list-tile'>
            <v-list-tile-content>
              <v-list-tile-title>Details</v-list-tile-title>
              <v-list-tile-sub-title class='text--primary multiline'>
                <div v-for='entry in item.higher_level' :key='entry'>{{ entry }}</div>
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
  name: 'spell_dialog',
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
      let { material } = item;
      if (material.endsWidth('.')) material = material.slice(0, -1);
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
