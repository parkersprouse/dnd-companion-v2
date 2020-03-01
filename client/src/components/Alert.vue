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

<style lang='scss'>
.alert {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  width: 100%;

  .alert__icon {
    border-bottom-left-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
    font-size: 1.125rem;
    padding: 0.75rem;
    text-align: center;
  }

  .alert__content {
    border-bottom-right-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    border-width: 1px;
    flex: 1;
    padding: 0.75rem;
  }

  &.alert--error {
    .alert__icon {
      @apply bg-red-700 text-red-300;
    }

    .alert__content {
      @apply bg-red-200 text-red-700 border-red-300;
    }
  }

  &.alert--info {
    .alert__icon {
      @apply bg-blue-700 text-blue-300;
    }

    .alert__content {
      @apply bg-blue-200 text-blue-700 border-blue-300;
    }
  }

  &.alert--success {
    .alert__icon {
      @apply bg-green-700 text-green-300;
    }

    .alert__content {
      @apply bg-green-200 text-green-700 border-green-300;
    }
  }

  &.alert--warning {
    .alert__icon {
      @apply bg-yellow-700 text-yellow-300;
    }

    .alert__content {
      @apply bg-yellow-200 text-yellow-700 border-yellow-300;
    }
  }
}
</style>
