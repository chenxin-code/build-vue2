<template>
  <div id="map"
       :style="{ 'height': 30 * basicMap.length + 'px', 'width': basicMap[0]?30 * basicMap[0].length + 'px':'auto' }">
    <div class="line" v-for="(item1,index1) in basicMap" :key="index1">
      <div :class="[className[item2]]" v-for="(item2,index2) in item1" :key="index2"></div>
    </div>
  </div>
</template>

<script>
import mazeCommon from '@/mixins/maze-common';

export default {
	mixins: [mazeCommon],
	data() {
		return {
			prePath: [], // 上一次访问数据
		};
	},
	methods: {
		/**
     * 求解
     */
		* getMazePath(x, y) {
			let stack = [];
			stack.unshift({x, y}); // 入栈
			while (stack.length > 0) {
				let curPos = stack.pop();
				this.pathVisited[curPos.x][curPos.y] = true; // 求解时访问过
				this.basicMap[curPos.x][curPos.y] = 3;
				this.$forceUpdate();//必须强制更新
				this.renderMap();
				yield;
				// 找到出口
				if (curPos.x === this.exitX && curPos.y === this.exitY) {
					// 绘制解
					this.basicMap[curPos.x][curPos.y] = 2;
					this.$forceUpdate();//必须强制更新
					this.renderMap();
					let prePos = this.prePath[curPos.x][curPos.y]; // 获取上个点
					while (prePos != null) {
						this.basicMap[prePos.x][prePos.y] = 2;// 渲染上一个点
						this.$forceUpdate();//必须强制更新
						this.renderMap();
						yield;
						prePos = this.prePath[prePos.x][prePos.y]; // 获取上上个点
					}
					break;
				}

				for (let i = 0; i < 4; i++) {
					let newX = curPos.x + this.range[i][0];
					let newY = curPos.y + this.range[i][1];
					if (this.isRange(newX, newY) && this.basicMap[newX][newY] === 1 && !this.pathVisited[newX][newY]) {
						this.prePath[newX][newY] = {x: curPos.x, y: curPos.y}; // 记录新的点以及该点由谁走过来
						stack.push({x: newX, y: newY}); // 入栈
					}
				}
			}
		},
	},
	mounted() {
		// 创建29*29的地图，路的四面都为墙
		this.createBasis(29, 29);
		// 设置开始和结束点为左上角和右下角
		this.basicMap[1][1] = 1;
		this.exitX = this.basicMap[0].length - 2;
		this.exitY = this.basicMap.length - 2;
		this.basicMap[this.exitX][this.exitY] = 1;
		this.$forceUpdate();//必须强制更新

		// 渲染地图
		this.renderMap();
		// 处理生成迷宫
		const createStep = this.createMaze();
		const t = setInterval(() => {
			let n = createStep.next();
			// 渲染地图
			this.renderMap();
			if (n.done) {
				clearInterval(t);
				// 求解
				const answerStep = this.getMazePath(1, 1);
				const t2 = setInterval(() => {
					let n2 = answerStep.next();
					// 渲染地图
					this.renderMap();
					if (n2.done) {
						clearInterval(t2);
					}
				}, 30);
			}
		}, 10);
	},
};
</script>