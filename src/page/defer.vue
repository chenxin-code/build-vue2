<template>
  <div>
    <div v-for="n in 999" :key="n">
      <bigContent1 v-if="useDefer(n)"/>
    </div>
  </div>
</template>

<script>
import bigContent1 from '@/component/big-content-1.vue';
import {defer} from '@/toolFunc';

export default {
  components: {
    bigContent1
  },
  data() {
    return {
      useDefer: ((n) => defer(n))(), // 白屏优化
    };
  },
};
</script>

<style lang="less" scoped>

</style>
