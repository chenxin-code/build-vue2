<template>
  <div class="container">
    <el-tabs v-model="activeName" type="border-card" stretch>
      <el-tab-pane label="百度新闻" name="百度新闻">
        <div class="tab-pane center">
          <el-button type="primary" @click="getBaiduNews()">GET</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="淘宝搜索提示" name="淘宝搜索提示">
        <div class="tab-pane">
          <el-input v-model="query" placeholder="请输入内容" prefix-icon="el-icon-search" clearable/>
          <el-button type="primary" @click="getTaobaoSearchSuggest()">GET</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%" top="5vh">
      <div class="dialog-stats">共 <strong>{{ tableData.length }}</strong> 条数据</div>
      <el-table :data="tableData" border stripe max-height="400" style="width: 100%">
        <el-table-column v-for="col in tableHeaders" :key="col.key"
                         :prop="col.key" :label="col.label" :width="col.width"
                         :align="col.align || 'center'">
          <template slot-scope="scope">
            <el-link v-if="col.key === 'url'" type="primary" :href="scope.row[col.key]" target="_blank" icon="el-icon-link" />
            <span v-else>{{ scope.row[col.key] }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="json-container">
        <el-alert :description="jsonContent" type="success" :closable="false"/>
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { baiduNews, taobaoSearchSuggest } from '@/api';
import { debounce1, debounce2 } from '@/toolFunc';

export default {
  data() {
    return {
      activeName: '百度新闻',
      query: '热干面',
      dialogVisible: false,
      dialogTitle: '',
      tableHeaders: [],
      tableData: [],
      jsonContent: '',
    };
  },
  methods: {
    getBaiduNews() {
      debounce1(() => {
        baiduNews({
          method: 'get',
          url: 'widget',
          params: {
            id: 'LocalNews',
            loc: 5496,
            ajax: 'json',
          },
        }).then(resp => {
          this.showResultDialog('百度新闻', resp.data);
        }).catch(err => {
          this.$message.error('百度新闻请求失败: ' + err.message);
        });
      });
    },
    getTaobaoSearchSuggest() {
      debounce2(() => {
        if (!this.query || !this.query.trim()) {
          this.$message.warning('请输入搜索内容');
          return;
        }
        taobaoSearchSuggest({
          method: 'get',
          url: 'sug',
          params: {
            code: 'utf-8',
            q: this.query,
          },
        }).then(resp => {
          this.showResultDialog('淘宝搜索提示', resp.data);
        }).catch(err => {
          this.$message.error('淘宝搜索提示请求失败: ' + err.message);
        });
      });
    },
    showResultDialog(title, data) {
      this.tableData = [];
      this.tableHeaders = [];

      if (title === '百度新闻') {
        const localNews = data?.data?.LocalNews?.data;
        const first = Array.isArray(localNews?.rows?.first) ? localNews.rows.first : [];
        const second = Array.isArray(localNews?.rows?.second) ? localNews.rows.second : [];
        const items = [...first, ...second];

        if (items.length > 0) {
          this.tableHeaders = [
            { key: 'title', label: '标题' },
            { key: 'time', label: '时间' },
            { key: 'url', label: '链接' },
          ];
          this.tableData = items.map(item => ({
            title: item.title || '',
            time: item.time || '',
            url: item.url || '',
          }));
        }
      } else if (title === '淘宝搜索提示') {
        const items = Array.isArray(data) ? data : (data.result || []);
        if (items.length > 0) {
          if (Array.isArray(items[0])) {
            this.tableHeaders = [
              { key: 'keyword', label: '搜索词' },
              { key: 'heat', label: '热度' },
            ];
            this.tableData = items.map(item => ({ keyword: item[0], heat: item[1] }));
          }
        }
      }

      this.jsonContent = JSON.stringify(data);
      this.dialogTitle = title;
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 0;
}

.tab-pane {
  display: flex;
  align-items: center;
  gap: 10px;

  /deep/ .el-input {
    flex: 1;
  }

  &.center {
    justify-content: center;
  }
}

/deep/ .el-dialog__header {
  text-align: center;
}

/deep/ .el-dialog__footer {
  text-align: center;
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

.json-container {
  margin-top: 16px;
}
</style>
