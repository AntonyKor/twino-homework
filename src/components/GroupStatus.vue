<template>
  <div class="group-status">
    <h2>{{ groupName }}</h2>
    <p>{{ Math.round(groupProgress) }}% completed</p>
  </div>
</template>

<script>
export default {
  props: {
    groupProgress: {
      type: Number,
      required: true,
    },
    groupName: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="scss">
.group-status {
  margin-top: 30px;
  text-align: center;

  h2 {
    font-size: 1rem;

    @media screen and (min-width: 360px) {
      margin: 0 20px 0 0;
    }
  }

  p {
    margin: 0;
    color: #9e9fa2;
    font-size: 1.3rem;
  }

  @media screen and (min-width: 360px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
