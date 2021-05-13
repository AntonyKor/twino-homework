<template>
  <span>
    <input
      v-bind="$attrs"
      :checked="modelValue === value"
      :value="value"
      @change="$emit('change', value)"
      type="radio"
      class="radio"
    />
    <span class="checkmark"></span>
  </span>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    modelValue: { type: [String, Number], default: "" },
    value: { type: [String, Number], required: true },
  },
};
</script>

<style lang="scss" scoped>
.radio {
  display: none;

  &:checked ~ .checkmark {
    border: 5px solid #2e50b6;
  }
}

.checkmark {
  content: "";
  display: inline-block;
  box-sizing: border-box;
  height: 24px;
  width: 24px;
  border: 1px solid #9e9fa2;
  border-radius: 50%;
  margin-right: 12px;
}
</style>
