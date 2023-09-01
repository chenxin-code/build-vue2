<template>
  <p></p>
</template>

<script>
import _ from 'lodash';

export default {
	mounted() {
		_.times(10, (i) => {
			console.log(`循环第${i}次`);
		});
	},

};
</script>

<style scoped>

</style>