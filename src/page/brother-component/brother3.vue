<template>
  <div>
    <h2>{{ year }}年退货数据</h2>
    <select :value="year" @change="changeYear">
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
    </select>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		...mapState(['year'])
	},
	methods: {
		changeYear(e) {
			// commit 调用 mutations
			this.$store.commit('changeYear', e.target.value);
			// dispatch 调用 actions
			// this.$store.dispatch('changeYear', e.target.value);
		},
	},
};
</script>

<style scoped>
div {
  margin: 5px;
  border: 1px solid dodgerblue;
}
</style>