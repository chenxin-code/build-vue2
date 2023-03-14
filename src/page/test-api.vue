<template>
  <div>
    <button @click="getBaiduNews()">百度新闻</button>
    <hr />
    <input v-model="query">
    <button @click="getTaobaoSearchSuggest()">淘宝搜索提示</button>
  </div>
</template>

<script>
import {baiduNews, taobaoSearchSuggest} from '@/api';

export default {
  data(){
    return {
      query: '周杰伦'
    }
  },
  methods: {
    getBaiduNews(){
      baiduNews({
        url: 'widget?id=LocalNews&loc=5496&ajax=json',
      }).then(resp => {
        console.log('baiduNews', resp.data.data.LocalNews.data.rows);
      });
    },
    getTaobaoSearchSuggest(){
      taobaoSearchSuggest({
        url: 'sug?code=utf-8&q='+this.query,
      }).then(resp => {
        console.log('taobaoSearchSuggest', resp.data.result);
      });
    }
  },
  mounted() {
    this.getBaiduNews();
    this.getTaobaoSearchSuggest();
  },
}
</script>

<style scoped>
button {
  display: block;
  margin-bottom: 5px;
}
</style>