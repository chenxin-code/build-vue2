<template>
  <p></p>
</template>

<script>
export default {
	methods: {
		abcdef() {
			// 无效代码 是否会被打包
		}
	},
	mounted() {},
	deactivated() {
		console.log('deactivated');// 缓存
	},
	activated() {
		console.log('activated');// 缓存
	},
	beforeUnmount() {
		console.log('beforeDestroy');// 不缓存
	},
	unmounted() {
		console.log('destroyed');// 不缓存
	},
};
</script>

<style scoped>

</style>