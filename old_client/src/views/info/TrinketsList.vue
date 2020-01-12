<template>
  <div id='info-page'>
    <h1 class='page-title'>Trinkets</h1>

    <!-- Error Alert -->
    <v-alert v-if='error' :value='true' type='error'>
      Failed to load trinkets
    </v-alert>

    <!-- Table Loading Indicator -->
    <div v-else-if='!filtered_items' class='text-xs-center'>
      <v-progress-circular indeterminate :size='70' :width='7'></v-progress-circular>
    </div>

    <!-- Table Display -->
    <div v-else>
      <!-- Filter Controls -->
      <div id='filter-controls'>
        <div class='w-full'>
          <v-text-field v-model='filter' clearable label='Filter'
                        prepend-inner-icon='fa-search'></v-text-field>
        </div>
      </div>

      <!-- Table -->
      <v-data-table v-if='filtered_items' class='elevation-1' :headers='headers' hide-actions
                   :items='filtered_items' must-sort :search='filter'
                    sort-icon='fa-arrow-up ml-2'>
        <template v-slot:items='props'>
          <tr>
            <td>{{ props.item.roll }}</td>
            <td>{{ props.item.desc }}</td>
          </tr>
        </template>
      </v-data-table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'trinkets_list',
  data() {
    return {
      error: false,
      filter: '',
      filtered_items: null,
      items: null,

      headers: [
        { text: 'd100 Roll', value: 'roll', class: 'info-table-column-header' },
        { text: 'Description', value: 'desc', class: 'info-table-column-header' },
      ],
    };
  },
  mounted() {
    this.$http.post('/api/dnd/trinkets')
      .then((response) => {
        this.items = response.data.content;
        this.filtered_items = response.data.content;
      })
      .catch(() => {
        this.error = true;
      });
  },
};
</script>
