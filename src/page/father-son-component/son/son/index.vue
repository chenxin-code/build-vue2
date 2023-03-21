<template>
  <div style="padding: 20px;background-color: forestgreen;">
    <p>我接收了父亲的金钱（<span style="color: red;">{{ money }}</span>）</p>
    <p>我接收了父亲的父亲的消息（<span style="color: red;">{{ msg }}</span>）</p>
  </div>
</template>

<script>
export default {
  props: ['money'],
  inject: ['msg'],
}
</script>

<style scoped>
</style>