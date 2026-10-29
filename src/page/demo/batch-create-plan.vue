<template>
  <div class="container">
    <div class="year-selector">
      <el-button-group>
        <el-button :type="yearCount === n ? 'primary' : ''" size="small" v-for="n in 5" :key="n" @click="yearCount = n">未来{{ n }}年</el-button>
      </el-button-group>
    </div>
    <div class="table-wrapper">
      <div class="row header-row">
        <div class="col header-col label-col">产品</div>
        <div class="col header-col time-col">时间</div>
        <div class="col header-col input-col" v-for="(item,index) in lineData" :key="index">{{item}}</div>
      </div>
      <div class="row data-row" v-for="(item1,index1) in rowData" :key="index1">
        <div class="col label-col">{{item1.product}}</div>
        <div class="col time-col">
          <el-button-group class="time-btn-group">
            <el-button :type="item1.time === 1 ? 'primary' : ''" size="mini" @click="item1.time = 1">每月</el-button>
            <el-button :type="item1.time === 2 ? 'primary' : ''" size="mini" @click="item1.time = 2">每季</el-button>
            <el-button :type="item1.time === 3 ? 'primary' : ''" size="mini" @click="item1.time = 3">每年</el-button>
          </el-button-group>
        </div>
        <div class="col input-col" v-for="(item2,index2) in item1.colData" :key="index2">
          <el-input v-model="item2.content" clearable size="small" />
        </div>
      </div>
    </div>
    <el-button type="primary" icon="el-icon-plus" style="margin-top: 16px" @click="submit()">批量创建计划</el-button>
    <el-dialog title="批量创建计划预览" :visible.sync="dialogVisible" width="70%" class="center-dialog">
      <div class="dialog-stats">共 <strong>{{ submitArr.length }}</strong> 个计划</div>
      <div class="table-container">
        <el-table :data="submitArr" border stripe style="width: 100%" max-height="400">
          <el-table-column prop="product" label="产品" width="80" align="center" />
          <el-table-column prop="line" label="产品线" width="100" align="center" />
          <el-table-column prop="timeText" label="时间" width="120" align="center" />
          <el-table-column prop="content" label="内容" />
        </el-table>
      </div>
      <div class="json-container">
        <el-alert
            :description="JSON.stringify(submitArr)"
            type="success"
            :closable="false"/>
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
	data() {
		return {
			rowData: [],
			lineData: ['产品线1', '产品线2', '产品线3', '产品线4', '产品线5'], // 动态产品线
      submitArr: [],
      yearCount: 1,
      dialogVisible: false
		};
	},
	methods: {
    submit() {
      this.submitArr = [];
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1; // getMonth() 返回 0-11

      this.rowData.forEach(item1 => {
        item1.colData.forEach(item2 => {
          if (item2.content) {
            if (item1.time === 3) {
              // 未来N年，不含今年
              for (let i = 1; i <= this.yearCount; i++) {
                this.submitArr.push({
                  product: item1.product,
                  line: item2.line,
                  content: item2.content,
                  year: currentYear + i,
                  timeText: `${currentYear + i}年`,
                });
              }
            } else if (item1.time === 2) {
              // 今年剩余季度（不含当前季度）+未来N年
              const currentQuarter = Math.ceil(currentMonth / 3);
              for (let quarter = currentQuarter + 1; quarter <= 4; quarter++) {
                this.submitArr.push({
                  product: item1.product,
                  line: item2.line,
                  content: item2.content,
                  year: currentYear,
                  quarter: quarter,
                  timeText: `${currentYear}年Q${quarter}`,
                });
              }
              // 未来N年
              for (let i = 1; i <= this.yearCount; i++) {
                [1, 2, 3, 4].forEach(quarter => {
                  this.submitArr.push({
                    product: item1.product,
                    line: item2.line,
                    content: item2.content,
                    year: currentYear + i,
                    quarter: quarter,
                    timeText: `${currentYear + i}年Q${quarter}`,
                  });
                });
              }
            } else if (item1.time === 1) {
              // 今年剩余月份+未来N年
              for (let month = currentMonth + 1; month <= 12; month++) {
                this.submitArr.push({
                  product: item1.product,
                  line: item2.line,
                  content: item2.content,
                  year: currentYear,
                  month: month,
                  timeText: `${currentYear}年${month}月`,
                });
              }
              // 未来N年
              for (let i = 1; i <= this.yearCount; i++) {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(month => {
                  this.submitArr.push({
                    product: item1.product,
                    line: item2.line,
                    content: item2.content,
                    year: currentYear + i,
                    month: month,
                    timeText: `${currentYear + i}年${month}月`,
                  });
                });
              }
            }
          }
        });
      });
      console.log('submitArr', this.submitArr);
      console.log('总计划数：', this.submitArr.length);
      this.dialogVisible = true;
    }
	},
  mounted() {
    let colData = [];
    this.lineData.forEach(item => {
      colData.push({
        line: item,
        content: null,
      });
    });
    // 动态产品
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(item => {
      this.rowData.push({
        product: item,
        time: 1,
        colData: _.cloneDeep(colData), // 必须使用深拷贝
      });
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.year-selector {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 10px;
}

.table-wrapper {
  width: 100%;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e4e7ed;

  &:last-child {
    border-bottom: none;
  }
}

.header-row {
  background: linear-gradient(135deg, #f5f7fa 0%, #ebeef5 100%);

  .header-col {
    font-weight: 600;
    color: #303133;
    font-size: 14px;
    padding: 12px 8px;
  }
}

.data-row {
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f7fa;
  }

  &:nth-child(even) {
    background-color: #fafafa;

    &:hover {
      background-color: #f0f2f5;
    }
  }
}

.col {
  flex: 1;
  padding: 8px;
  text-align: center;
}

.label-col {
  font-weight: 500;
  color: #606266;
  font-size: 15px;
}

.time-col {
  min-width: 180px;
}

.time-btn-group {
  .el-button {
    padding: 5px 10px;
    font-size: 12px;
  }
}

.input-col {
  min-width: 0;
}

.dialog-stats {
  margin-bottom: 12px;
  font-size: 14px;
  color: #606266;
  text-align: center;

  strong {
    color: #409eff;
    font-size: 18px;
  }
}

.table-container {
  display: flex;
  justify-content: center;
}

.json-container {
  margin-top: 12px;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #e1f3d8;
  border-radius: 4px;
  padding: 10px;
  background: #f0f9eb;

  ::v-deep .el-alert__description {
    font-family: monospace;
    font-size: 12px;
    word-break: break-all;
    white-space: normal;
  }
}

.center-dialog {
  ::v-deep .el-dialog__header {
    text-align: center;
  }

  ::v-deep .el-dialog__footer {
    text-align: center;
  }
}
</style>
