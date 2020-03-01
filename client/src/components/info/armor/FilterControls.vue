<template>
  <div class='filter-controls'>
    <div class='filter-controls__search'>
      <form class='form-v form--subtle'>
        <input class='input form__input' id='filter' type='text'>
        <label for='filter' class='form__label'>Filter</label>
      </form>
    </div>
    <div class='filter-controls__filters'>
      <div>
        <v-select :options="['All', 'Light', 'Medium', 'Heavy', 'Shield']" placeholder='Armor Category'></v-select>
      </div>
      <div>
        <v-select :options="['All', 'Yes', 'No']" placeholder='Minimum Strength'></v-select>
      </div>
      <div>
        <v-select :options="['All', 'Yes', 'No']" placeholder='Stealth Disadvantage'></v-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'armor_filter_controls',
};
</script>
