<template>
  <div>
    <el-link type="warning" icon="el-icon-document"
             href="https://blog.csdn.net/weixin_43840202/article/details/117398825" target="_blank">参考CSDN
    </el-link>

    <el-button-group>
      <el-button :type="$route.path === '/demo/maze/' + item.path ? 'primary' : ''"
                 @click="$router.push({ path: '/demo/maze/' + item.path });"
                 :disabled="$route.path === '/demo/maze/' + item.path"
                 size="small"
                 v-for="(item,index) in mazeIndex" :key="index">
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
			mazeIndex: [
				{title: '深度优先、递归求解', path: '1'},
				{title: '非递归、栈、深度优先', path: '2'},
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