<template>
  <div>
    <el-divider>DEMO</el-divider>
    <el-button-group>
      <el-button :type="$route.path === '/demo/' + item.path ? 'primary' : ''"
                 @click="$router.push({ path: '/demo/' + item.path });"
                 :disabled="$route.path === '/demo/' + item.path"
                 size="medium"
                 v-for="(item,index) in demoIndex" :key="index">
        {{ item.title }}
      </el-button>
    </el-button-group>
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
				{title: '前端生成Excel', path: 'exportExcel'},
				{title: '迷宫', path: 'maze'},
				{title: '3D地球', path: '3d-earth'},
        {title: '摄像头', path: 'camera'},
        {title: 'B站蒙版弹幕', path: 'bilibili-mask-barrage'},
			],
		};
	},
	filters: {},
	methods: {},
	mounted() {
		console.log('$route', this.$route, '$router', this.$router);
	},
};
</script>

<style scoped>
</style>
