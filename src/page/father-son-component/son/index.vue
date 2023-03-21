<template>
  <div style="padding: 20px;background-color: mediumseagreen;">
    <p>我接收了父亲的金钱（<span style="color: red;">{{ money }}</span>），再把金钱（<span style="color: red;">{{ money }}</span>）传给儿子
    </p>
    <p>我接收了父亲的消息（<span style="color: red;">{{ msg }}</span>）</p>
    <button style="margin-bottom: 5px;cursor: pointer;" @click="$emit('moneyMinus1')">$emit调用父组件方法（金钱-1）</button>
    <br/>
    <button style="margin-bottom: 20px;cursor: pointer;" @click="$parent.moneyMinus1()">$parent调用父组件方法（金钱-1）</button>
    <son :money="money"/>
  </div>
</template>

<script>
import son from './son';

export default {
  props: ['money'],
  inject: ['msg'],
  components: {son},
  methods: {
    moneyPlus1() {
      this.$parent.money++;
    },
  },
}
</script>

<style scoped>
</style>