<template>
  <div>
    <h1>兄弟组件vuex通信</h1>
    <div style="display: flex;">
      <brother1 />
      <brother2 />
      <brother3 />
    </div>
  </div>
</template>

<script>
import brother1 from './brother1';
import brother2 from './brother2';
import brother3 from './brother3';
export default {
  components:{
    brother1,
    brother2,
    brother3,
  }
}
</script>

<style scoped>

</style>