<template>
  <div style="padding: 20px;background-color: forestgreen;">
    <p>我接收了爸爸的金钱（<span style="color: red;">{{ money }}</span>）</p>
    <p>我通过<span style="color: blue;">inject</span>接收了爷爷的消息（<span style="color: blue;">{{ msg }}</span>）</p>
  </div>
</template>

<script>
export default {
	props: ['money'],
	inject: ['msg'],
};
</script>

<style scoped>
</style>
