<template>
  <div id="app">
    <!--部分缓存-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('根组件', this.$route.meta.keepAlive);
    console.log('虚拟DOM', this._vnode);
  },
}
</script>

<style>

</style>
