<template>
  <div>
    <h2>玩转css</h2>
    <button @click="$router.push({ path: '/css/flex' });">flex布局</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
  },
}
</script>

<style scoped>
button {
  display: block;
  margin-bottom: 5px;
}
</style>