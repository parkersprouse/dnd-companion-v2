<template>
  <div>
    <h1 class='page-title'>Armor</h1>
    <alert v-if='error' type='error'>Failed to load armor</alert>
    <loader v-else-if='!items' />
    <div v-else>
      <div class='filter-controls'>

      </div>

      <div class='items-list'>
        <table class='items-list__table'>
          <table-header @sortBy='sortBy' />
          <tbody>
            <tr v-for='item in filtered_items' @click='select(item)' :key='item.name'>
              <td>{{ item.name }}</td>
              <td>{{ item.armor_category }}</td>
              <td>{{ armorClass(item.armor_class) }}</td>
              <td>{{ item.str_minimum || '-' }}</td>
              <td>{{ item.stealth_disadvantage ? 'Disadvantage' : '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <armor-modal v-model='selected_item' />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import ArmorModal from '@/components/info/armor/ArmorModal.vue';
import TableHeader from '@/components/info/armor/TableHeader.vue';

export default {
  name: 'armor_list',
  components: {
    'armor-modal': ArmorModal,
    'table-header': TableHeader,
  },
  data() {
    return {
      error: false,
      filtered_items: null,
      items: null,
      selected_item: null,
    };
  },
  mounted() {
    this.$http.post('/api/dnd/equipment', { equipment_category: 'Armor' })
      .then((response) => {
        const items = _.sortBy(response.data.content, ['name']);
        this.items = items;
        this.filtered_items = items;
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    armorClass(obj) {
      const dex_modifier = obj.dex_bonus ? ' + dex. modifier' : '';
      const max_bonus = obj.max_bonus ? ` (max ${obj.max_bonus})` : '';
      return `${obj.base} ${dex_modifier} ${max_bonus}`;
    },

    select(item) {
      this.selected_item = item;
    },

    sortBy(attr, dir) {
      const attr_map = {
        ac: 'armor_class.base',
        category: 'armor_category',
        name: 'name',
        stealth: 'stealth_disadvantage',
        str: 'str_minimum',
      };

      this.filtered_items = _.sortBy(this.filtered_items, [attr_map[attr]]);
      if (dir === 'asc') _.reverse(this.filtered_items);
    },
  },
};
</script>
