<template>
  <div>
    <h2>我喜欢吃{{ food }}</h2>
    <select :value="food" @change="changeFood">
      <option value="西瓜">西瓜</option>
      <option value="黄瓜">黄瓜</option>
      <option value="南瓜">南瓜</option>
    </select>
  </div>
</template>

<script>
import eventBus from '@/eventBus';

export default {
  data() {
    return {
      food: '西瓜',
    };
  },
  methods: {
    changeFood(e) {
      this.food = e.target.value;
      console.log('B $emit');
      eventBus.$emit('Bchange', e.target.value);
    },
  },
  mounted() {
    eventBus.$on('Achange', (value) => {
      console.log('B $on');
      this.food = value;
    });
  },
}
</script>

<style scoped>
div {
  margin: 5px;
  border: 1px solid orangered;
}
</style>