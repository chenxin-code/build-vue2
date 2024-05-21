<template>
  <div style="display: flex">
    <div style="flex: 1;margin: 0 10px">
      <el-divider>同步组件</el-divider>
      <el-button type="primary" @click="showBigContentSync = !showBigContentSync">change</el-button>
      <bigContentSync v-if="showBigContentSync"/>
    </div>
    <div style="flex: 1;margin: 0 10px">
      <el-divider>异步组件</el-divider>
      <el-button type="primary" @click="showBigContentAsync = !showBigContentAsync">change</el-button>
      <bigContentAsync v-if="showBigContentAsync"/>
    </div>
  </div>
</template>

<script>
import bigContentSync from '@/component/big-content-1.vue'; // 同步组件
const bigContentAsync = () => import('@/component/big-content-2.vue');// 异步组件

export default {
  components: {
    bigContentSync,
    bigContentAsync,
  },
  data() {
    return {
      showBigContentSync: false,
      showBigContentAsync: false,
    };
  },
  mounted() {},
};
</script>

<style scoped>

</style>