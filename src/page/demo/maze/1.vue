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
			answerStep: 0, // 播放动画延时栈数
		};
	},
	methods: {
		/**
     * 求解
     */
		getMazePath(x, y) {
			if (this.isRange(x, y)) {
				this.pathVisited[x][y] = true; // 求解时访问过
				// 渲染当前点
				this.timeOutRender(x, y, 2);
				if (x === this.exitX && y === this.exitY) {
					return true; // 出口
				}
				// 遍历该点的四个方向是否可继续遍历
				for (let i = 0; i < 4; i++) {
					let newX = x + this.range[i][0];
					let newY = y + this.range[i][1];
					// 没有越界 是路 且没有被访问，继续访问
					if (this.isRange(newX, newY) && this.basicMap[newX][newY] === 1 && !this.pathVisited[newX][newY]) {
						if (this.getMazePath(newX, newY)) {
							return true;
						}
					}
				}
				// 没有return终止，回溯 遍历完四个方向都没有找到出口和其他能行的路（死胡同） 则表示该点不是解的路径上的点 还原为路
				this.timeOutRender(x, y, 1);
				return false;
			}
		},

		/**
     * 延时动画
     * @param x
     * @param y
     * @param t
     */
		timeOutRender(x, y, t) {
			setTimeout(() => {
				this.basicMap[x][y] = t;
				this.$forceUpdate();// 必须强制更新
				this.renderMap();
			}, this.answerStep++ * 30);
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

		// 渲染地图
		this.renderMap();
		// 处理生成迷宫
		const createStep = this.createMaze();
		const t = setInterval(() => {
			let n = createStep.next();
			// 渲染地图
			this.renderMap();
			if (n.done) {
				// 求解
				this.getMazePath(1, 1);
				clearInterval(t);
			}
		}, 10);
	},
};
</script>