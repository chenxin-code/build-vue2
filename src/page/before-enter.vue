<template>
  <div>
    <h2>组件内的守卫（3个）</h2>
  </div>
</template>

<script>
export default {
  mounted() {},
  beforeRouteEnter(to, from, next) {
    console.log('组件内的守卫（1） -- beforeRouteEnter','to',to,'from', from, 'next', next);
    // 不能访问this，守卫在导航确认前被调用，即将登场的新组件还没被创建
    next(vm => {
      // 通过 `vm` 访问组件实例
      console.log(vm);
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log('组件内的守卫（2） -- beforeRouteUpdate','to',to,'from', from, 'next', next);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('组件内的守卫（3） -- beforeRouteLeave','to',to,'from', from, 'next', next);
    next();
  },
};
</script>

<style scoped>

</style>