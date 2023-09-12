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

<style lang="less" scoped>
//路由子组件的公共样式，因此父组件里需要使用深度选择器
/deep/ #map {
  border: 2px solid #6a6f77;
  margin: 0 auto;
}

/deep/ .line {
  height: 30px;
  width: 100%;
}

/deep/ .wall, /deep/ .road, /deep/ .path {
  width: 30px;
  height: 30px;
  display: inline-block;
}

/deep/ .wall {
  background: #45494c;
}

/deep/ .road {
  background: #ffffff;
}

/deep/ .path {
  background: #f57a7a;
}
</style>