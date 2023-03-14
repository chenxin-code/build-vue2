<template>
  <h4>for in <br/> for of <br/> forEach</h4>
</template>

<script>
export default {
  data() {
    return {
      arr: ['北京', '上海', '广州'],
      obj: {
        name: '文卿',
        sex: '男',
        age: 11,
      }
    };
  },
  methods: {},
  mounted() {
    //推荐 for in 遍历对象  推荐 for of 遍历数组
    console.log('arr', this.arr, 'obj', this.obj);
    Array.prototype.test = 'for in 把原型对象也遍历出来了';
    //for of 遍历数组（遍历对象会报错）
    for (let value of this.arr) {
      console.log(value);
    }
    //for in 遍历对象
    for (let key in this.obj) {
      console.log(key, this.obj[key]);
    }
    //for in 遍历数组（会遍历出原型对象）
    for (let key in this.arr) {
      console.log(key, this.arr[key]);
    }
    //forEach 遍历数组 只能通过抛出异常的方式中断
    try {
      this.arr.forEach((item, index) => {
        if (item === '广州') {
          throw 'forEach只能通过抛出异常的方式中断';
          //throw new Error('forEach只能通过抛出异常的方式中断');
        }
        console.log(index, item);
      })
    } catch (e) {
      console.log(e);
    }
    //for in 可以中断
    for (let index in this.arr) {
      console.log(this.arr[index]);
      if (this.arr[index] === '上海') {
        break;
      }
    }
  },
}
</script>

<style scoped>

</style>