/*
 * 迷宫通用逻辑
 */
export default {
	data() {
		return {
			basicMap: [], // 迷宫数据
			visited: [], // 逻辑访问数据
			range: [[-1, 0], [0, 1], [1, 0], [0, -1]], // 偏移量
			pathVisited: [], // 求解访问数据
			exitX: 0,
			exitY: 0,
			className: ['wall', 'road', 'path'],
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
			// mapDom.innerHTML = dom;
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
						this.$forceUpdate();// 必须强制更新
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
	},
};
