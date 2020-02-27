<template>
  <div class='alert' :class='type_class.type'>
    <div class='alert__icon'>
      <i :class='type_class.icon'></i>
    </div>
    <div class='alert__content'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alert',
  props: {
    type: {
      default: 'info',
      type: String,
      validator: (val) => ['error', 'info', 'success', 'warning'].includes(val),
    },
  },
  computed: {
    type_class() {
      const types = {
        error: {
          icon: 'fas fa-times-circle',
          type: 'alert--error',
        },
        info: {
          icon: 'fas fa-info-circle',
          type: 'alert--info',
        },
        success: {
          icon: 'fas fa-check-circle',
          type: 'alert--success',
        },
        warning: {
          icon: 'fas fa-exclamation-triangle',
          type: 'alert--warning',
        },
      };

      return types[this.type];
    },
  },
};
</script>
