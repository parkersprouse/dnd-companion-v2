<template>
  <div v-if='equipment'>

    <div class='row'>
      <div class='col-md-4'>
        <dl>
          <dt>Category</dt>
          <dd style='white-space: pre-wrap;'>{{ category }}</dd>
        </dl>
      </div>
      <div class='col-md-4'>
        <dl>
          <dt>Price</dt>
          <dd>{{ cost }}</dd>
        </dl>
      </div>
      <div class='col-md-4'>
        <dl>
          <dt>Weight</dt>
          <dd>{{ weight }}</dd>
        </dl>
      </div>
    </div>

    <div class='row' v-if='equipment.capacity || equipment.speed'>
      <div class='col-md-4' v-if='equipment.capacity'>
        <dl>
          <dt>Capacity</dt>
          <dd>{{ equipment.capacity }}</dd>
        </dl>
      </div>
      <div class='col-md-4' v-if='equipment.speed'>
        <dl>
          <dt>Speed</dt>
          <dd>{{ speed }}</dd>
        </dl>
      </div>
    </div>

    <div class='row' v-if='equipment.desc'>
      <div class='col-md-12'>
        <dl>
          <dt>Description</dt>
          <dd>
            <p v-for='item in equipment.desc' :key='item'>{{ item }}</p>
          </dd>
        </dl>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'equipment-details',
  props: ['equipment'],
  computed: {
    category() {
      if (!this.equipment.equipment_category) return '-';

      let category = this.equipment.equipment_category;
      if (this.equipment.gear_category) category += `\n${this.equipment.gear_category}`;
      if (this.equipment.tool_category) category += `\n${this.equipment.tool_category}`;
      if (this.equipment.vehicle_category) category += `\n${this.equipment.vehicle_category}`;
      return category;
    },
    cost() {
      if (!this.equipment.cost) return '-';

      return `${this.equipment.cost.quantity} ${this.equipment.cost.unit}`;
    },
    speed() {
      return `${this.equipment.speed.quantity} ${this.equipment.speed.unit}`;
    },
    weight() {
      if (!this.equipment.weight) return '-';

      return `${this.equipment.weight} lb.`;
    },
  },
};
</script>
