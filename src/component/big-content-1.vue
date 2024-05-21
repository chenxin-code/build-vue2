<template>
  <!--  大组件使用场景：①异步组件方式引入 -->
  <div class="big-content-1-box">
    <div class="item" v-for="n in 9999" :key="n"/>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.big-content-1-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px 0;
  border: 2px solid orangered;

  .item {
    width: 4px;
    height: 4px;
    margin: 0.1em;
    background-color: lightpink;
  }
}
</style>