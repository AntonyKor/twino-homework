<template>
  <div id="app">
    <h1>Suitabitity test</h1>
    <ProgressBar
      :groupsNumber="groups.length"
      :currentGroup="currentGroupIndex"
      :currentGroupProgress="currentGroupProgress"
    />
    <template v-if="!isOverviewShown">
      <GroupStatus
        v-if="groups[openedGroupIndex]"
        :groupProgress="openedGroupProgress"
        :groupName="groups[openedGroupIndex].title"
      />
      <QuestionBlock
        v-if="openedQuestion"
        :question="openedQuestion"
        @set-answer="setAnswer"
      />
      <p v-if="isErrorShown" class="error">Please provide answer</p>
      <button
        v-if="currentGroupIndex === groups.length"
        @click="isOverviewShown = true"
        class="next"
      >
        View overview
      </button>
      <button v-if="!isOpenedQuestionLast" @click="openNext" class="next">
        Next question
      </button>
      <button
        v-if="openedGroupIndex || openedQuestionIndex"
        @click="openPrevious"
        class="previous"
      >
        Previous question
      </button>
    </template>
    <OverviewScreen
      v-else
      :groups="groups"
      @question-select="handleQuestionClick"
    />
  </div>
</template>

<script>
import ProgressBar from "@/components/ProgressBar.vue";
import GroupStatus from "@/components/GroupStatus.vue";
import QuestionBlock from "@/components/QuestionBlock.vue";
import OverviewScreen from "@/components/OverviewScreen.vue";
import { getQuestions } from "@/api";

export default {
  components: {
    ProgressBar,
    GroupStatus,
    QuestionBlock,
    OverviewScreen,
  },

  async created() {
    this.groups = await getQuestions();
  },

  data() {
    return {
      groups: [],
      openedGroupIndex: 0,
      openedQuestionIndex: 0,
      isErrorShown: false,
      isOverviewShown: false,
    };
  },

  computed: {
    currentGroupIndex() {
      const index =
        this.groups.findIndex(
          (group) =>
            !group.questions.every((question) => question.answer !== undefined)
        ) ?? this.groups.length;

      return index === -1 ? this.groups.length : index;
    },
    currentGroupProgress() {
      return this.getGroupStatus(this.currentGroupIndex);
    },
    openedGroupProgress() {
      return this.getGroupStatus(this.openedGroupIndex);
    },
    openedQuestion() {
      return this.groups[this.openedGroupIndex]?.questions[
        this.openedQuestionIndex
      ];
    },
    isOpenedQuestionLast() {
      return (
        this.groups.length - 1 === this.openedGroupIndex &&
        this.groups[this.openedGroupIndex].questions.length - 1 ===
          this.openedQuestionIndex
      );
    },
  },

  methods: {
    getGroupStatus(groupIndex) {
      if (!this.groups[groupIndex]) {
        return 0;
      }

      const { questions } = this.groups[groupIndex];
      const answeredQuestions = questions.reduce(
        (acc, question) => (question.answer !== undefined ? acc + 1 : acc),
        0
      );
      return (answeredQuestions / questions.length) * 100;
    },
    setAnswer(answer) {
      this.$set(
        this.groups[this.openedGroupIndex].questions[this.openedQuestionIndex],
        "answer",
        answer
      );
      this.isErrorShown = false;
    },
    openNext() {
      if (this.openedQuestion.answer === undefined) {
        this.isErrorShown = true;
        return;
      }

      this.openedQuestionIndex++;

      if (
        this.groups[this.openedGroupIndex]?.questions.length <=
        this.openedQuestionIndex
      ) {
        this.openedQuestionIndex = 0;
        this.openedGroupIndex++;
      }
    },
    openPrevious() {
      this.isErrorShown = false;
      this.openedQuestionIndex--;
      if (this.openedQuestionIndex < 0) {
        this.openedQuestionIndex = 0;

        this.openedGroupIndex = this.openedGroupIndex
          ? this.openedGroupIndex - 1
          : 0;
      }
    },
    handleQuestionClick(data) {
      this.openedGroupIndex = data.groupIndex;
      this.openedQuestionIndex = data.questionIndex;
      this.isOverviewShown = false;
    },
  },
};
</script>

<style lang="scss">
#app {
  max-width: 1090px;
  min-width: 240px;
  margin: 0 30px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #213560;

  h1 {
    font-size: 3rem;
  }

  .error {
    margin: 30px 0;
    padding: 10px;
    background-color: #fff6f4;
    border: 2px solid #fe513a;
    border-radius: 5px;
    text-align: center;
  }

  .next {
    display: block;
    margin-bottom: 20px;
    padding: 20px;
    width: 100%;
    background-color: #2e50b6;
    border: 0;
    border-radius: 5px;
    outline: none;
    color: #fff;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .previous {
    display: block;
    margin-bottom: 20px;
    width: 100%;
    background: none;
    border: 0;
    outline: none;
    color: #0052b4;
    font-size: 1.1rem;
    text-decoration: underline;
  }
}
</style>
