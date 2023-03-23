<template>
  <div>
    <h1>兄弟组件vuex通信</h1>
    <div style="display: flex;">
      <brother1 />
      <brother2 />
      <brother3 />
    </div>
    <h1>兄弟组件eventBus通信</h1>
    <div style="display: flex;">
      <brotherA />
      <brotherB />
    </div>
  </div>
</template>

<script>
import brother1 from './brother1';
import brother2 from './brother2';
import brother3 from './brother3';
import brotherA from './brotherA';
import brotherB from './brotherB';
export default {
  components:{
    brother1,
    brother2,
    brother3,
    brotherA,
    brotherB,
  }
}
</script>

<style scoped>

</style>