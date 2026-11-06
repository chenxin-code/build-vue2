<template>
  <div>
    <el-divider>DEMO</el-divider>
    <div class="tab-container">
      <div class="arrow-left" v-if="showArrows" @click="scrollLeft">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="tab-row" ref="tabRow">
        <el-button-group>
          <el-button :type="$route.path === '/demo/' + item.path ? 'primary' : ''"
                     @click="$router.push({ path: '/demo/' + item.path });"
                     :disabled="$route.path === '/demo/' + item.path"
                     size="medium"
                     v-for="(item,index) in demoIndex" :key="index">
            {{ item.title }}
          </el-button>
        </el-button-group>
      </div>
      <div class="arrow-right" v-if="showArrows" @click="scrollRight">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { shuffle } from 'lodash';

export default {
	data() {
		return {
			showArrows: false,
			demoIndex: [
				{title: '水滴', path: 'water'},
				{title: '数据监控', path: 'data-monitor'},
				{title: '魔兽英雄PK', path: 'pk'},
				{title: '模拟双色球', path: 'ssq'},
				{title: '批量创建计划', path: 'batch-create-plan'},
				{title: '前端生成Excel', path: 'exportExcel'},
				{title: '迷宫', path: 'maze'},
				{title: '3D地球', path: '3d-earth'},
        {title: '摄像头', path: 'camera'},
        {title: 'B站蒙版弹幕', path: 'bilibili-mask-barrage'},
        {title: '父子组件通信', path: 'father-son-component'},
        {title: '兄弟组件通信', path: 'brother-component'},
        {title: '同步/异步组件测试', path: 'sync-async-component'},
        {title: '第三方接口测试', path: 'test-api'},
        {title: '冻结测试', path: 'Object.freeze'},
        {title: 'CSS示例', path: 'css'},
			],
		};
	},
	filters: {},
	methods: {
		checkOverflow() {
			const tabRow = this.$refs.tabRow;
			if (!tabRow) return;
			this.showArrows = tabRow.scrollWidth > tabRow.clientWidth;
		},
		scrollLeft() {
			const tabRow = this.$refs.tabRow;
			if (!tabRow) return;
			const buttonGroup = tabRow.querySelector('.el-button-group');
			const buttons = buttonGroup.querySelectorAll('.el-button');
			const currentScroll = tabRow.scrollLeft;
			let targetButton = null;
			for (let i = 0; i < buttons.length; i++) {
				const btn = buttons[i];
				if (btn.offsetLeft < currentScroll) {
					targetButton = btn;
				} else {
					break;
				}
			}
			if (targetButton) {
				tabRow.scrollTo({ left: targetButton.offsetLeft - 20, behavior: 'smooth' });
			} else {
				tabRow.scrollTo({ left: 0, behavior: 'smooth' });
			}
		},
		scrollRight() {
			const tabRow = this.$refs.tabRow;
			if (!tabRow) return;
			const buttonGroup = tabRow.querySelector('.el-button-group');
			const buttons = buttonGroup.querySelectorAll('.el-button');
			const currentScroll = tabRow.scrollLeft;
			const rightEdge = currentScroll + tabRow.clientWidth;
			let scrollAmount = tabRow.scrollWidth;
			for (const btn of buttons) {
				if (btn.offsetLeft + btn.offsetWidth > rightEdge) {
					scrollAmount = btn.offsetLeft - 20;
					break;
				}
			}
			tabRow.scrollTo({ left: Math.min(scrollAmount, tabRow.scrollWidth - tabRow.clientWidth), behavior: 'smooth' });
		},
	},
	mounted() {
		this.demoIndex = shuffle(this.demoIndex);
		this.$nextTick(() => {
			this.checkOverflow();
			window.addEventListener('resize', this.checkOverflow);
		});
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.checkOverflow);
	},
};
</script>

<style scoped>
.tab-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 10px;
}
.arrow-left,
.arrow-right {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 36px;
  cursor: pointer;
  color: #606266;
  flex-shrink: 0;
  transition: color 0.2s;
}
.arrow-left:hover,
.arrow-right:hover {
  color: #409eff;
}
.tab-row {
  overflow-x: auto;
  max-width: 80%;
  scrollbar-width: none;
}
.tab-row::-webkit-scrollbar {
  display: none;
}
.tab-row >>> .el-button-group {
  flex-wrap: nowrap;
  display: inline-flex;
}
</style>
