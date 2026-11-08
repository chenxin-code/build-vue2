# build-vue2

Vue 2 学习项目，包含丰富的 DEMO 示例，涵盖组件通信、路由守卫、性能优化、3D 可视化、弹幕动画等前端核心技能。

## 在线演示

访问 https://chenxin-code.github.io/build-vue2/

## 技术栈

- **框架**: Vue 2.6 + Vue Router 3 + Vuex 3
- **UI 组件**: Element UI
- **可视化**: Three.js (3D地球)、Highcharts (数据图表)
- **工具库**: Axios、Lodash、xlsx (Excel导出)
- **构建工具**: Vue CLI 4.5
- **样式**: Less

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器 (默认 http://localhost:8080)
npm run serve

# 生产环境构建
npm run build

# 代码检查
npm run lint

# 代码修复
npm run fix
```

## 路由结构

### DEMO 示例 (`/demo/*`)

| 路由 | 示例 | 说明 |
|------|------|------|
| 视觉效果 | `/demo/water` | 水滴动画 |
| 数据展示 | `/demo/data-monitor` | 数据监控面板 |
| 游戏互动 | `/demo/pk` | 魔兽英雄PK |
| 模拟抽奖 | `/demo/ssq` | 模拟双色球 |
| 批量操作 | `/demo/batch-create-plan` | 批量创建计划 |
| 文件导出 | `/demo/exportExcel` | 前端生成 Excel |
| 迷宫游戏 | `/demo/maze/1`、`/demo/maze/2` | 迷宫示例 |
| 3D 可视化 | `/demo/3d-earth` | Three.js 3D 地球 |
| 摄像头 | `/demo/camera` | 摄像头调用 |
| 弹幕动画 | `/demo/bilibili-mask-barrage` | B站蒙版弹幕 |
| 组件通信 | `/demo/father-son-component` | 父子组件通信 |
| 兄弟通信 | `/demo/brother-component` | 兄弟组件通信 (EventBus) |
| 异步组件 | `/demo/sync-async-component` | 同步/异步组件加载 |
| 接口测试 | `/demo/test-api` | 第三方接口调用 |
| 性能优化 | `/demo/Object.freeze` | Object.freeze 冻结测试 |
| CSS 布局 | `/demo/css/flex` | Flex 布局示例 |

### 其他功能

| 路由 | 说明 |
|------|------|
| `/defer` | 白屏优化 - 组件延迟加载 |
| `/es6` | ES6 语法示例 (嵌套路由) |
| `/lodash` | Lodash 工具库使用 |
| `/env` | 环境变量配置 |
| `/deep-shallow-clone` | 深拷贝 vs 浅拷贝 |
| `/defineProperty-Proxy` | Vue 2/3 响应式原理对比 |
| `/before-enter` | 路由独享守卫示例 |
| `/test-keepalive` | keep-alive 缓存测试 |

## 项目结构

```
src/
├── api/              # API 接口
├── component/        # 公共组件
├── mixins/           # 混入 (迷宫游戏逻辑)
├── page/             # 页面组件
│   ├── demo/         # DEMO 示例页面
│   └── es6/          # ES6 语法页面
├── store/            # Vuex 状态管理
├── App.vue           # 根组件
├── main.js           # 入口文件
├── router.js         # 路由配置 (含全局守卫)
└── eventBus.js       # 事件总线
```

## 特性亮点

- **路由守卫**: 全局前置/后置守卫、路由独享守卫、meta 元信息控制
- **组件通信**: Props/$emit、EventBus、Vuex 多种方式
- **性能优化**: 路由懒加载、组件异步加载、Object.freeze 冻结大数据
- **可视化**: Three.js 3D 地球、Highcharts 实时数据图表
- **动画效果**: 水滴动画、B站蒙版弹幕、迷宫生成算法

## 配置参考

- [Vue CLI 配置文档](https://cli.vuejs.org/zh/config/)
- [Vue 2 官方文档](https://cn.vuejs.org/v2/guide/)
