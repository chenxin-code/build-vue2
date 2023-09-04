<template>
  <div>
    <el-divider>中软PI4版本批量创建计划</el-divider>
    <div class="row">
      <div class="col">固定8种</div>
      <div class="col">选择时间</div>
      <div class="col" v-for="(item,index) in lineData" :key="index">{{item}}</div>
    </div>
    <div class="row" v-for="(item1,index1) in rowData" :key="index1">
      <div class="col">{{item1.rowName}}</div>
      <div class="col">
        <el-radio-group v-model="item1.radio">
          <el-radio :label="1">时间1</el-radio>
          <el-radio :label="2">时间2</el-radio>
          <el-radio :label="3">时间3</el-radio>
        </el-radio-group>
      </div>
      <div class="col" v-for="(item2,index2) in item1.colData" :key="index2">
        <el-input v-model="item2.input" placeholder="请输入产品线"></el-input>
      </div>
    </div>
    <el-button type="primary" @click="submit()">批量创建</el-button>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
	data() {
		return {
			rowData: [],
			lineData: []
		};
	},
	methods: {
		submit() {
			let arr = [];
			this.rowData.forEach(item1 => {
				item1.colData.forEach(item2 => {
					if(item2.input){
						arr.push({
							rowName: item1.rowName,
							radio: item1.radio,
							colName: item2.colName,
							input: item2.input,
						});
					}
				});
			});
			console.log(arr);
		}
	},
	mounted() {
		//动态的产品线接口返回
		this.lineData = ['产品线1', '产品线2', '产品线3', '产品线4'];
		let colData = [];
		this.lineData.forEach(item=>{
			colData.push({
				colName: item,
				input: null,
			});
		});
		//固定8种
		['A','B','C','D','E','F','G','H'].forEach(item=>{
			this.rowData.push({
				rowName: item,
				radio: 1,
				colData: _.cloneDeep(colData),//必须使用深拷贝
			});
		});
	}
};
</script>

<style lang="less" scoped>
.row {
  display: flex;
  .col {
    flex: 1;
    margin: 3px 8px;
    padding: 2px 5px;
    background-color: #A1A3B1;
    border-radius: 5px;
    text-align: center;
  }
}
</style>