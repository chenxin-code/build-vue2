<template>
  <div style="padding: 15px 0">
    <div class="row">
      <div class="col">字母</div>
      <div class="col">时间</div>
      <div class="col" v-for="(item,index) in lineData" :key="index">{{item}}</div>
    </div>
    <div class="row" v-for="(item1,index1) in rowData" :key="index1">
      <div class="col">{{item1.rowName}}</div>
      <div class="col">
        <el-radio-group v-model="item1.time">
          <el-radio :label="1">每月</el-radio>
          <el-radio :label="2">每季</el-radio>
          <el-radio :label="3">每年</el-radio>
        </el-radio-group>
      </div>
      <div class="col" v-for="(item2,index2) in item1.colData" :key="index2">
        <el-input v-model="item2.content" placeholder="请输入内容" clearable />
      </div>
    </div>
    <el-button type="primary" icon="el-icon-plus" style="margin-top: 10px" @click="submit()">批量创建</el-button>
    <el-alert
        :description="JSON.stringify(submitArr)"
        type="success"
        :closable="false"
        center
        style="margin-top: 10px;width: 600px"/>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
	data() {
		return {
			rowData: [],
			lineData: [],
      submitArr: []
		};
	},
	methods: {
    submit() {
      this.submitArr = [];
      this.rowData.forEach(item1 => {
        item1.colData.forEach(item2 => {
          if (item2.content) {
            this.submitArr.push({
              rowName: item1.rowName,
              time: item1.time,
              colName: item2.colName,
              content: item2.content,
            });
          }
        });
      });
      console.log('submitArr', this.submitArr);
    }
	},
  mounted() {
    // 动态产品线
    this.lineData = ['产品线1', '产品线2', '产品线3', '产品线4', '产品线5'];
    let colData = [];
    this.lineData.forEach(item => {
      colData.push({
        colName: item,
        content: null,
      });
    });
    // 动态字母
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach(item => {
      this.rowData.push({
        rowName: item,
        time: 1,
        colData: _.cloneDeep(colData), // 必须使用深拷贝
      });
    });
  }
};
</script>

<style lang="less" scoped>
.row {
  margin: 3px 0;
  display: flex;
  .col {
    flex: 1;
    margin: 3px 8px;
    padding: 2px 5px;
    background-color: #f1f1f1;
    border-radius: 5px;
    text-align: center;
  }
}
</style>