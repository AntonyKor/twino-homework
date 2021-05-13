<template>
  <div>
    <h3>{{ question.question }}</h3>
    <p v-for="(option, index) in question.answers" :key="option">
      <label>
        <BaseRadioButton v-model="answer" :value="index" name="answer" />
        {{ option }}
      </label>
    </p>
  </div>
</template>

<script>
import BaseRadioButton from "./BaseRadioButton.vue";

export default {
  components: {
    BaseRadioButton,
  },

  props: {
    question: {
      type: Object,
      required: true,
    },
  },

  computed: {
    answer: {
      get() {
        return this.question.answer;
      },
      set(answer) {
        this.$emit("set-answer", answer);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
label {
  display: flex;
  align-items: center;
}

div {
  margin-bottom: 30px;
}
</style>
