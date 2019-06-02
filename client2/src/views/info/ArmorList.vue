<template>
  <v-layout>
    <v-flex sm12 md6 offset-md3>
      <v-data-table :headers="headers" :items="desserts" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'armor_list',
  data() {
    return {
      armor: null,
    };
  },
  mounted() {
    this.$http.post('/api/dnd/equipment', { equipment_category: 'Armor' })
      .then((response) => {
        const armor = _.sortBy(response.data.content, ['name']);
        this.armor = armor;
        this.filtered_armor = armor;
      })
      .catch(() => {
        this.error = true;
      });
  },
};
</script>
