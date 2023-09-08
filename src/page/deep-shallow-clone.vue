<template>
  <div>
    <h1>深浅拷贝</h1>
    <el-link type="warning" icon="el-icon-document" href="https://blog.csdn.net/weixin_37719279/article/details/81240658" target="_blank">参考CSDN</el-link>
  </div>
</template>

<script>
import {shallowClone, deepClone} from '@/toolFunc';
import _ from 'lodash';

export default {
	data() {
		return {
			obj1: {
				a: 'chenxin',
				b: {
					a: 'cx',
					b: 123
				},
				c: [1, 2, 3],
				d: () => {
					console.log('函数123');
				}
			},
			obj2: null,
		};
	},
	methods: {},
	mounted() {
		// 分别测试以下方法
		//this.obj2 = this.obj1; //赋值
		//this.obj2 = shallowClone(this.obj1);
		this.obj2 = deepClone(this.obj1);
		//this.obj2 = JSON.parse(JSON.stringify(this.obj1)); //2个JSON方法实现深拷贝
		//this.obj2 = _.clone(this.obj1); //浅拷贝
		//this.obj2 = _.cloneDeep(this.obj1); //深拷贝
		//this.obj2 = structuredClone(this.obj1); //深拷贝

		console.log(this.obj1, this.obj2);
		console.log('----------------------------------');
		// 更改拷贝对象中的a,b,c,d，看看源对象是否变化
		this.obj2.a = 'wenqing';
		this.obj2.b.a = 'wq';
		this.obj2.b.b = 456;
		this.obj2.c = [4, 5, 6];
		this.obj2.d = () => {
			console.log('函数456');
		};
		console.log(this.obj1, this.obj2);
		console.log('-----------调用函数-------------');
		this.obj1.d();
		this.obj2.d();
	},
};
</script>

<style scoped>

</style>