<template>
  <p>当前环境：{{node_environment}}</p>
</template>

<script>
export default {
	computed: {
		node_environment() {
			return process.env.NODE_ENV;
		}
	},
	mounted() {
		console.log('当前环境：' + process.env.NODE_ENV);
	},
};
</script>

<style scoped>

</style>