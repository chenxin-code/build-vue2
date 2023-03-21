<template>
  <div>
    <button @click="getData()">获取数据</button>
    <h2>数据长度：{{ list.length }}（响应式，耗时长）</h2>
    <button @click="getData(true)">获取数据并冻结</button>
    <h2>冻结数据长度：{{ listFreeze.length }}（非响应式，耗时短）</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      listFreeze: [],
    }
  },
  methods: {
    getData(freeze = false) {
      let arr = [];
      for (let i = 1; i <= 999999; i++) {
        arr.push({
          id: i,
          name: `name${i}`,
          address: {
            province: `province${i}`,
            city: `city${i}`,
          },
        });
      }
      console.log('生成好的数据', arr);
      if (freeze) {
        this.listFreeze = Object.freeze(arr);//耗时短
        console.log('非响应式数据【耗时短】', this.listFreeze);
      } else {
        this.list = arr;//耗时长
        console.log('响应式数据【耗时长】', this.list);
      }
    },
  },
  mounted() {
  },
}
</script>

<style scoped>

</style>