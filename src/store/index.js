import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//公共数据
const state = {
	year: '2022',
};
//计算属性
const getters = {};
/*
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
修改数据方法的集合，必须是同步
*/
const mutations = {
	changeYear(state, year) {
		console.log('commit 调用 mutations');
		state.year = year;
	},
};
/*
Action 类似于 mutation，不同在于：
Action 提交的是 mutation，而不是直接变更状态
Action 可以包含任意异步操作
*/
const actions = {
	changeYear(context, year) {
		console.log('dispatch 调用 actions');
		// commit 再回调 mutations
		context.commit('changeYear', year);
	},
};

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
});
