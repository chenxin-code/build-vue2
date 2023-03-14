<template>
  <div>
    <h2>{{ $store.state.year }}年销量数据</h2>
    <select v-model="$store.state.year">
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped>
div {
  margin: 5px;
  border: 1px solid dodgerblue;
}
</style>