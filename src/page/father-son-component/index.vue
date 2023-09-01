<template>
  <div style="padding: 20px;background-color: lightgreen;">
    <h1>父子组件通信</h1>
    <p>我有金钱（<span style="color: red;">{{ money }}</span>）传给儿子</p>
    <p>我有消息（<span style="color: red;">{{ _provided.msg }}</span>）传给儿子、儿子的儿子</p>
    <button style="margin-bottom: 5px;cursor: pointer;" @click="$refs.son.moneyPlus1()">$refs调用子组件方法（金钱+1）</button>
    <br/>
    <button style="margin-bottom: 20px;cursor: pointer;" @click="$children[0].moneyPlus1()">$children调用子组件方法（金钱+1）
    </button>
    <son :money="money" @moneyMinus1="moneyMinus1()" ref="son"/>
  </div>
</template>

<script>
import son from './son';

export default {
	components: {son},
	data() {
		return {
			money: 100,
		};
	},
	provide() {
		//非响应式
		return {
			msg: 'xxxxxx',
		};
	},
	methods: {
		moneyMinus1() {
			this.money--;
		},
	},
	mounted() {
	},
};
</script>

<style scoped>
</style>