<template>
  <div :class="{ collapsed: isCollapsed }" class="collapsible">
    <header>
      <h3>{{ title }}</h3>
      <button @click="isCollapsed = !isCollapsed">
        Show {{ isCollapsed ? "more" : "less" }}
      </button>
    </header>
    <div class="content"><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },

  data() {
    return { isCollapsed: true };
  },
};
</script>

<style scoped lang="scss">
.collapsible {
  padding: 30px 0;
  border-bottom: 1px solid #9e9fa2;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin-left: 25px;
    position: relative;
    background: none;
    border: none;
    outline: none;
    color: #2e50b6;
    font-weight: bold;
    cursor: pointer;

    &:before {
      position: absolute;
      content: "";
      display: block;
      width: 10px;
      height: 3px;
      background-color: #2e50b6;
      top: 50%;
      left: -15px;
      transform: translateY(-50%);
    }
  }
}

.content {
  margin-top: 30px;
}

.collapsed {
  .content {
    height: 0px;
    margin-top: 0;
    overflow: hidden;
  }

  header button:after {
    position: absolute;
    content: "";
    display: block;
    width: 10px;
    height: 3px;
    background-color: #2e50b6;
    top: 50%;
    left: -15px;
    transform: translateY(-50%) rotate(0.25turn);
  }
}
</style>
