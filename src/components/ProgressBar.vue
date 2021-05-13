<template>
  <div class="progress-bar" :style="barStyles">
    <div
      v-for="n in groupsNumber"
      :key="n"
      :class="{
        filled: n - 1 < currentGroup,
        active: n - 1 === currentGroup,
      }"
      class="group"
    >
      <div
        v-if="n - 1 === currentGroup"
        :style="currentGroupProgressStyles"
        class="filled"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groupsNumber: {
      type: Number,
      required: true,
    },
    currentGroup: {
      type: Number,
      required: true,
    },
    currentGroupProgress: {
      type: Number,
      required: true,
    },
  },

  computed: {
    barStyles() {
      return { gridTemplateColumns: `repeat(${this.groupsNumber}, 1fr)` };
    },

    currentGroupProgressStyles() {
      return { width: `${this.currentGroupProgress}%` };
    },
  },
};
</script>

<style scoped lang="scss">
.progress-bar {
  display: grid;
  grid-gap: 12px;
}

.group {
  background-color: #eef1f8;
  height: 6px;
}

.filled {
  background-color: #81c784;
}

.active {
  position: relative;
  background-color: #d9eeda;

  & > div {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
