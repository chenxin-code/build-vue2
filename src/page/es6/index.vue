<template>
  <div>
    <el-divider>玩转es6</el-divider>
    <el-button-group>
      <el-button :type="$route.path === '/es6/' + item.path ? 'primary' : ''"
                 @click="$router.push({ path: '/es6/' + item.path });"
                 :disabled="$route.path === '/es6/' + item.path"
                 size="medium"
                 v-for="(item,index) in es6Index" :key="index">
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
			es6Index: [
				{title: 'forin-forof-foreach', path: 'forin-forof-foreach'},
				{title: 'map-filter-foreach', path: 'map-filter-foreach'},
			],
		};
	},
	methods: {},
	mounted() {
	},
};
</script>

<style scoped>
</style>