<template>
  <div class='input-group' v-on="listeners">

    <span class='input-group-btn'>
      <button class='btn btn-default' type='button' @click="decrease"
        :disabled="disabled || readonly || !decreasable">
        -
      </button>
    </span>

    <input class='form-control' :type="type" :name="name" v-model.number="currentValue" :min="min"
      :max="max" :step="step" @change="change" @paste="paste" :readonly="readonly || !inputtable"
      :disabled="disabled || (!decreasable && !increasable)" :placeholder="placeholder"
      autocomplete="off">

    <span class='input-group-btn'>
      <button class='btn btn-default' type='button' @click="increase"
        :disabled="disabled || readonly || !increasable">
        +
      </button>
    </span>

  </div>
</template>

<script>
const { isNaN } = Number;
const REGEXP_NUMBER = /^-?(?:\d+|\d+\.\d+|\.\d+)(?:[eE][-+]?\d+)?$/;
const REGEXP_DECIMALS = /\.\d*(?:0|9){10}\d*$/;
const normalizeDecimalNumber = (value, times = 100000000000) => (
  REGEXP_DECIMALS.test(value) ? (Math.round(value * times) / times) : value
);

export default {
  name: 'number-input',

  data() {
    return {
      currentValue: NaN,
    };
  },

  model: {
    event: 'change',
  },

  props: {
    disabled: Boolean,

    inputtable: {
      type: Boolean,
      default: true,
    },

    max: {
      type: Number,
      default: Infinity,
    },

    min: {
      type: Number,
      default: -Infinity,
    },

    name: String,
    placeholder: String,
    readonly: Boolean,
    rounded: Boolean,

    step: {
      type: Number,
      default: 1,
    },

    type: {
      type: String,
      default: 'text',
    },

    value: Number,
  },

  computed: {
    /**
       * Indicate if the value is increasable.
       * @returns {boolean} Return `true` if it is decreasable, else `false`.
       */
    increasable() {
      const num = this.currentValue;
      return isNaN(num) || num < this.max;
    },

    /**
       * Indicate if the value is decreasable.
       * @returns {boolean} Return `true` if it is decreasable, else `false`.
       */
    decreasable() {
      const num = this.currentValue;
      return isNaN(num) || num > this.min;
    },

    /**
       * Filter listeners
       * @returns {Object} Return filtered listeners.
       */
    listeners() {
      const listeners = { ...this.$listeners };
      delete listeners.change;
      return listeners;
    },
  },

  methods: {
    /**
       * Change event handler.
       * @param {string} value - The new value.
       */
    change(event) {
      let { value } = event.target;
      if (!REGEXP_NUMBER.test(value)) {
        value = 0;
      }
      this.setValue(Math.min(this.max, Math.max(this.min, value)));
    },

    /**
       * Paste event handler.
       * @param {Event} event - Event object.
       */
    paste(event) {
      if (!REGEXP_NUMBER.test(event.clipboardData.getData('text'))) {
        event.preventDefault();
      }
    },

    /**
       * Decrease the value.
       */
    decrease() {
      if (this.decreasable) {
        let { currentValue } = this;

        if (isNaN(currentValue)) {
          currentValue = 0;
        }

        this.setValue(Math.min(this.max, Math.max(
          this.min,
          normalizeDecimalNumber(currentValue - this.step),
        )));
      }
    },

    /**
       * Increase the value.
       */
    increase() {
      if (this.increasable) {
        let { currentValue } = this;

        if (isNaN(currentValue)) {
          currentValue = 0;
        }

        this.setValue(Math.min(this.max, Math.max(
          this.min,
          normalizeDecimalNumber(currentValue + this.step),
        )));
      }
    },

    /**
       * Set new value and dispatch change event.
       * @param {number} value - The new value to set.
       */
    setValue(value) {
      const oldValue = this.currentValue;
      let newValue = this.rounded ? Math.round(value) : value;

      if (this.min <= this.max) {
        newValue = Math.min(this.max, Math.max(this.min, newValue));
      }

      this.currentValue = newValue;
      this.$emit('change', newValue, oldValue);
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value !== this.currentValue) {
          this.setValue(value);
        }
      },
    },
  },
};
</script>

<style scoped>
* {
  text-align: center;
}
</style>
