<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="百度新闻" name="百度新闻">
        <el-button type="primary" @click="getBaiduNews()">get</el-button>
      </el-tab-pane>
      <el-tab-pane label="淘宝搜索提示" name="淘宝搜索提示">
        <el-input v-model="query" placeholder="请输入内容" prefix-icon="el-icon-search" style="width: 300px;margin-right: 10px;" clearable />
        <el-button type="primary" @click="getTaobaoSearchSuggest()">get</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {baiduNews, taobaoSearchSuggest} from '@/api';
import {debounce1, debounce2} from '@/toolFunc';

export default {
	data() {
		return {
			activeName: '百度新闻',
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
</style>