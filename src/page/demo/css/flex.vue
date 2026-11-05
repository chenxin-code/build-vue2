<template>
  <div>
    <br/>
    justify-content:
    <select v-model="justifyContent">
      <option :value="item" v-for="(item,index) in justifyContentList" :key="index">{{ item }}</option>
    </select>
    （横轴方向上的对齐方式）
    <br/><br/>
    align-items:
    <select v-model="alignItems">
      <option :value="item" v-for="(item,index) in alignItemsList" :key="index">{{ item }}</option>
    </select>
    （纵轴方向上的对齐方式）
    <br/><br/>
    <div class="box" :style="{ 'justify-content': justifyContent, 'align-items': alignItems }">
      <div style="background-color: orangered;"></div>
      <div style="background-color: yellow;"></div>
      <div style="background-color: deepskyblue;"></div>
      <div style="background-color: lawngreen;"></div>
    </div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			justifyContent: 'flex-start', // 默认值
			justifyContentList: [// 可选值
				'flex-start',
				'flex-end',
				'space-between',
				'space-evenly',
				'space-around',
				'center',
				'stretch',
			],
			alignItems: 'flex-start', // 默认值
			alignItemsList: [// 可选值
				'flex-start',
				'flex-end',
				'center',
				'stretch',
				'baseline',
			],
		};
	},
};
</script>

<style scoped>
.box {
  height: 400px;
  border: 1px solid #000;
  background-color: lightgrey;
  display: flex;
}

.box > div {
  width: 100px;
  height: 100px;
}
</style>