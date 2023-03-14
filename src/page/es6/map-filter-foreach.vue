<template>
  <h4>map <br/> filter <br/> forEach</h4>
</template>

<script>
export default {
  data() {
    return {
      arr: ['北京', '上海', '广州', '杭州'],
    };
  },
  methods: {},
  mounted() {
    // forEach 遍历数组 没有返回值
    let newArr1 = this.arr.forEach((item, index) => {
      console.log(index, item);
    });//编辑器黄色警告
    console.log('forEach返回', newArr1);
    // map 遍历数组 有返回值，根据回调里的返回值生成一个新数组
    let newArr2 = this.arr.map((item, index) => {
      console.log(index, item);
      return item + '市';
    });
    console.log('map返回', newArr2);
    // filter 遍历数组 有返回值，根据回调里的返回值true/false来决定循环的当前项要不要被添加到返回的新数组里
    let newArr3 = this.arr.filter((item, index) => {
      console.log(index, item);
      return item.indexOf('州') !== -1;
    });
    console.log('filter返回', newArr3);
  },
}
</script>

<style scoped>

</style>