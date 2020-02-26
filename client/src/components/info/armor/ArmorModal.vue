<template>
  <modal v-model='show'>
    <template v-slot:title>
      {{ item.name }}
    </template>
    <template v-slot:content>
      Content
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  name: 'armor_modal',
  components: {
    'modal': Modal,
  },
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
  computed: {
    armor_class() {
      if (!this.item.armor_class) return null;
      const dex_modifier = this.item.armor_class.dex_bonus ? ' + dex. modifier' : '';
      const max_bonus = this.item.armor_class.max_bonus ? `(max ${this.item.armor_class.max_bonus})` : '';
      return `${this.item.armor_class.base} ${dex_modifier} ${max_bonus}`;
    },

    item() {
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
      if (!new_val) this.$emit('input', null);
    },

    value(new_val) {
      this.show = !!new_val;
    },
  },
};
</script>
