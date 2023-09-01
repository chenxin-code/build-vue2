<template>
  <div>
    <div>
      <h1>同步组件</h1>
      <h1>异步组件</h1>
    </div>
    <div>
      <div>
        <div>
          <div>
            <bigContent v-if="showBigContent"/>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
// import bigContent from '@/component/big-content'; // 同步组件
const bigContent = () => import('@/component/big-content');// 异步组件

export default {
	components: {
		bigContent,
	},
	data() {
		return {
			showBigContent: false,
		};
	},
	mounted() {
		setTimeout(() => {
			this.showBigContent = true;
			console.log('虚拟DOM', this._vnode);
		}, 3000);
	},
};
</script>

<style scoped>

</style>