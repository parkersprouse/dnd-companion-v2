<template>
  <div v-if='armor'>
    <div class='row'>
      <div class='col-md-4'>
        <dl>
          <dt>Category</dt>
          <dd>{{ armor.armor_category }}</dd>
        </dl>
      </div>
      <div class='col-md-4'>
        <dl>
          <dt>Armor Class</dt>
          <dd>{{ `${armor.armor_class.base} ${armor.armor_class.dex_bonus ? ' + dex. modifier' : ''} ${armor.armor_class.max_bonus ? ` (max ${armor.armor_class.max_bonus})` : ''}` }}</dd>
        </dl>
      </div>
      <div class='col-md-4'>
        <dl>
          <dt>Stealth Disadvantage</dt>
          <dd>{{ armor.stealth_disadvantage ? 'Yes' : 'No' }}</dd>
        </dl>
      </div>
    </div>
    <div class='row'>
      <div class='col-md-4'>
        <dl>
          <dt>Minimum Strength</dt>
          <dd>{{ armor.str_minimum || '-' }}</dd>
        </dl>
      </div>
      <div class='col-md-4'>
        <dl>
          <dt>Price</dt>
          <dd>{{ armor.cost ? `${armor.cost.quantity} ${armor.cost.unit}` : '-' }}</dd>
        </dl>
      </div>
      <div class='col-md-4'>
        <dl>
          <dt>Weight</dt>
          <dd>{{ armor.weight ? `${armor.weight} lbs.` : '-' }}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'armor-details',
  props: ['armor'],
};
</script>
