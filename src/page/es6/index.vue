<template>
  <div>
    <h2>玩转es6</h2>
    <button @click="$router.push({ path: '/es6/forin-forof-foreach' });">forin-forof-foreach</button>
    <button @click="$router.push({ path: '/es6/map-filter-foreach' });">map-filter-foreach</button>
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