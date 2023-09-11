<template>
  <div>
    <el-link type="warning" icon="el-icon-document"
             href="https://blog.csdn.net/weixin_43840202/article/details/117398825" target="_blank">参考CSDN
    </el-link>
    <div id="map" :style="{ 'height': 30 * basicMap.length + 'px', 'width': basicMap[0]?30 * basicMap[0].length + 'px':'auto' }">
      <div class="line" v-for="(item1,index1) in basicMap" :key="index1">
        <div :class="[className[item2]]" v-for="(item2,index2) in item1" :key="index2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			basicMap: [], // 迷宫数据
			visited: [], // 逻辑访问数据
			range: [[-1, 0], [0, 1], [1, 0], [0, -1]], // 偏移量
			pathVisited: [], //求解访问数据
			exitX: 0,
			exitY: 0,
			className: ['wall', 'road', 'path'],

			answerStep: 0, // 播放动画延时栈数


		};
	},
	methods: {
		/**
     * 生成地基，每个可通行的方格都间隔一堵墙
     */
		createBasis(x, y) {
			for (let i = 0; i < x; i++) {
				let line = new Array(y).fill(0);
				this.visited.push(new Array(y).fill(false));
				this.pathVisited.push(new Array(y).fill(false));
				if (i % 2 === 1) {
					for (let j = 0; j < line.length; j++) {
						if (j % 2 === 1) {
							line[j] = 1;
						}
					}
				}
				this.basicMap.push(line);
			}
		},
		/**
     * 渲染map
     */
		renderMap() {
			// const className = ['wall', 'road', 'path'];
			// let dom = '';
			// for (let i = 0; i < this.basicMap.length; i++) {
			// 	let line = '<div class="line">';
			// 	for (let j = 0; j < this.basicMap[i].length; j++) {
			// 		line += `<div class="${className[this.basicMap[i][j]]}"></div>`;
			// 	}
			// 	line += '</div>';
			// 	dom += line;
			// }
			// const mapDom = document.getElementById('map');
			// mapDom.style.height = 30 * this.basicMap.length + 'px';
			// mapDom.style.width = 30 * this.basicMap[0].length + 'px';
			//mapDom.innerHTML = dom;
		},
		/**
     * 判断是否越界
     * @param x
     * @param y
     * @returns {boolean|boolean}
     */
		isRange(x, y) {
			return x > 0 && x < this.basicMap.length - 1 && y > 0 && y < this.basicMap[0].length - 1;
		},
		* createMaze() {
			let stack = [];
			stack.push({x: 1, y: 1});
			this.visited[1][1] = true;
			while (stack.length > 0) {
				let curPos;
				if (Math.random() > 0.5) {
					curPos = stack.shift();
				} else {
					curPos = stack.pop();
				}
				for (let i = 0; i < 4; i++) {
					let newX = curPos.x + this.range[i][0] * 2;  // 两步是 *2
					let newY = curPos.y + this.range[i][1] * 2;
					// 坐标没有越界 且 没有被访问过
					if (this.isRange(newX, newY) && !this.visited[newX][newY]) {
						yield;
						this.basicMap[(newX + curPos.x) / 2][(newY + curPos.y) / 2] = 1;
						if (Math.random() > 0.5) {
							stack.push({x: newX, y: newY});
						} else {
							stack.unshift({x: newX, y: newY});
						}
						this.visited[newX][newY] = true;
					}
				}
			}
		},


		/*深度优先、递归求解*/


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
	}
};
</script>

<style scoped>
html, body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  text-align: center;
}

#map {
  display: inline-block;
  border: 2px solid #6a6f77;
  margin-top: 120px;
}

.line {
  height: 30px;
  width: 100%;
}

.wall, .road, .path {
  width: 30px;
  height: 30px;
  display: inline-block;
}

.wall {
  background: #45494c;
}

.road {
  background: #ffffff;
}

.path {
  background: #f57a7a;
}
</style>