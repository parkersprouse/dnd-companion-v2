<template>
  <thead>
    <tr>
      <th class='sortable' :class='sortedClassFor("name")' @click='sortBy("name")'>
        Name
      </th>
      <th class='sortable' :class='sortedClassFor("category")' @click='sortBy("category")'>
        Category
      </th>
      <th class='sortable' :class='sortedClassFor("ac")' @click='sortBy("ac")'>
        Armor Class (AC)
      </th>
      <th class='sortable' :class='sortedClassFor("str")' @click='sortBy("str")'>
        Min. Strength
      </th>
      <th class='sortable' :class='sortedClassFor("stealth")' @click='sortBy("stealth")'>
        Stealth
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: 'armor_table_header',
  data() {
    return {
      sorted_attr: 'name',
      sorted_dir: 'desc',
    };
  },
  methods: {
    sortBy(attr) {
      if (this.sorted_attr === attr && this.sorted_dir === 'desc') this.sorted_dir = 'asc';
      else this.sorted_dir = 'desc';

      this.sorted_attr = attr;
      this.$emit('sortBy', attr, this.sorted_dir);
    },

    sortedClassFor(attr) {
      if (this.sorted_attr !== attr) return null;
      return ['sorted', this.sorted_dir];
    },
  },
};
</script>
