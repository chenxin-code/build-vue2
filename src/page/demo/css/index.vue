<template>
  <div>
    <el-divider>CSS示例</el-divider>
    <el-button-group>
      <el-button @click="$router.push({ path: '/demo/css/flex' });" size="small">flex布局</el-button>
    </el-button-group>
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
};
</script>

<style scoped>
</style>
