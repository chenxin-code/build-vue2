<template>
  <div>
    <button @click="getBaiduNews()">百度新闻</button>
    <hr/>
    <input v-model="query">
    <button @click="getTaobaoSearchSuggest()">淘宝搜索提示</button>
  </div>
</template>

<script>
import {baiduNews, taobaoSearchSuggest} from '@/api';
import {debounce1, debounce2} from '@/toolFunc';

export default {
	data() {
		return {
			query: '周杰伦'
		};
	},
	methods: {
		getBaiduNews() {
			debounce1(() => {
				baiduNews({
					methods: 'get',
					url: 'widget',
					params: {
						id: 'LocalNews',
						loc: 5496,
						ajax: 'json',
					},
				}).then(resp => {
					console.log('baiduNews', resp.data.data.LocalNews.data.rows);
				});
			});
		},
		getTaobaoSearchSuggest() {
			debounce2(() => {
				taobaoSearchSuggest({
					methods: 'get',
					url: 'sug',
					params: {
						code: 'utf-8',
						q: this.query,
					},
				}).then(resp => {
					console.log('taobaoSearchSuggest', resp.data.result);
				});
			});
		}
	},
	mounted() {
		this.getBaiduNews();
		this.getTaobaoSearchSuggest();
	},
};
</script>

<style scoped>
button {
  display: block;
  margin-bottom: 5px;
}
</style>