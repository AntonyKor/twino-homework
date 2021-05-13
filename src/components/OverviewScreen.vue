<template>
  <div>
    <h2>Answers owerview</h2>
    <CollapsibleBlock
      v-for="(group, groupIndex) in groups"
      :key="group.title"
      :title="group.title"
    >
      <div
        v-for="(question, questionIndex) in group.questions"
        :key="question.question"
      >
        <h4>{{ question.question }}</h4>
        <p>
          <a
            @click="$emit('question-select', { groupIndex, questionIndex })"
            href="#"
            >{{ question.answers[question.answer] }}</a
          >
        </p>
      </div>
    </CollapsibleBlock>
  </div>
</template>

<script>
import CollapsibleBlock from "./CollapsibleBlock.vue";

export default {
  components: {
    CollapsibleBlock,
  },
  props: {
    groups: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
h2 {
  font-size: 2rem;
}

h4 {
  margin: 30px 0 10px;
}

p {
  margin: 0;
}

a {
  color: #9e9fa2;
  text-decoration: none;
}
</style>
