<template>
  <div class='modal-container' :class='{ "modal--hidden": !show }' @click='close'>
    <div class='modal' @click.stop=''>
      <div class='modal__header'>
        <div class='modal__title'>
          <slot name='title'></slot>
        </div>
        <div class='modal__close' @click='close'>
          <i class='fas fa-times'></i>
        </div>
      </div>
      <div class='modal__body'>
        <slot name='content'></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    value: {
      required: false,
      type: Boolean,
    },
  },
  data() {
    return {
      show: null,
    };
  },
  mounted() {
    this.show = this.value;
  },
  methods: {
    close() {
      this.show = false;
      this.$emit('input', false);
    },
  },
  watch: {
    show(new_val) {
      const body = document.querySelector('body');
      if (new_val) {
        body.classList.add('body-blocked');
      } else {
        body.classList.remove('body-blocked');
      }
    },

    value(new_val) {
      this.show = new_val;
    },
  },
};
</script>

<style lang='scss'>
.modal-container {
  align-items: center;
  background-color: rgba(16, 22, 26, .7);
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 100;

  &.modal--hidden {
    display: none !important;
  }

  .modal {
    border-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    border-width: 1px;
    box-shadow: 0 0 0 1px rgba(16, 22, 26, .1), 0 4px 8px rgba(16, 22, 26, .2),
                0 18px 46px 6px rgba(16, 22, 26, .2);
    width: 600px;
    z-index: 101;

    .modal__header {
      @apply bg-gray-100 border-gray-500;
      border-width: 0;
      border-bottom-width: 1px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      display: flex;
      justify-content: space-between;
      min-height: 1.5rem;
      padding: 0.5rem;

      .modal__title {
        flex-grow: 1;
      }

      .modal__close {
        cursor: pointer;
        text-align: center;
        width: 20px;
      }
    }

    .modal__body {
      @apply bg-gray-200;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      padding: 1rem;
    }
  }
}
</style>
