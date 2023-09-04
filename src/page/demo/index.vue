<template>
  <div>
    <el-divider>demo秀</el-divider>
    <el-button :type="$route.path === '/demo/' + item.path ? 'primary' : ''"
               @click="$router.push({ path: '/demo/' + item.path });"
               :disabled="$route.path === '/demo/' + item.path"
               v-for="(item,index) in demoIndex" :key="index">
      {{ item.title }}
    </el-button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
	data() {
		return {
			demoIndex: [
				{title: '水滴', path: 'water'},
				{title: '数据监控', path: 'data-monitor'},
				{title: '魔兽英雄PK', path: 'pk'},
				{title: '模拟双色球', path: 'ssq'},
				{title: '中软PI4版本批量创建计划', path: 'chinasofti-PI4'},
			],
		};
	},
	methods: {},
	mounted() {
		console.log('$route', this.$route, '$router', this.$router);
	},
};
</script>

<style scoped>
</style>