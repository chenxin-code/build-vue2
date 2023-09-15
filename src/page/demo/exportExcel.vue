<template>
  <div style="padding: 15px 0;">
    <el-button type="success" icon="el-icon-download" @click="exportExcel()"/>
    <el-link type="warning" icon="el-icon-document"
             href="https://blog.csdn.net/weixin_42232622/article/details/127834241" target="_blank">参考CSDN
    </el-link>
  </div>
</template>

<script>
// import XLSX from 'xlsx';//使用import有的属性无法找到
const XLSX = require('xlsx');

export default {
	data() {
		return {
			excelData: [
				['第1列', '第2列', '第3列'],
				['a', 'b', 'c'],
				['d', 'e', 'f'],
			]
		};
	},
	methods: {
		exportExcel() {
			let fileName = '前端生成';
			let workBook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workBook, XLSX.utils.aoa_to_sheet(this.excelData), fileName);
			XLSX.writeFile(workBook, fileName + '.xlsx');
		},
	},
};
</script>

<style scoped>

</style>