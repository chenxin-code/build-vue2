<template>
  <div>
    <h1>深浅拷贝</h1>
    <a href="https://blog.csdn.net/weixin_37719279/article/details/81240658" target="_blank">参考CSDN好文</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj1: {
        a: "chenxin",
        b: {
          a: "cx",
          b: 123
        },
        c: [1, 2, 3],
        d: () => {
          console.log("函数123");
        }
      },
      obj2: null,
    }
  },
  methods: {
    //赋值
    assignment(iniObj) {
      console.log('assignment');
      return iniObj;
    },
    //浅拷贝
    shallowClone(iniObj) {
      console.log('shallowClone');
      var obj = {};
      for (var i in iniObj) {
        obj[i] = iniObj[i];
      }
      return obj;
    },
    //深拷贝
    deepClone(iniObj, finalObj, first = true) {
      if (first) {
        console.log('deepClone');
      }
      var obj = finalObj || {};
      for (var i in iniObj) {
        var prop = iniObj[i];
        // 避免相互引用对象导致死循环，如iniObj.a = iniObj的情况
        if (prop === obj) {
          continue;
        }
        if (typeof prop === 'object') {
          obj[i] = (prop.constructor === Array) ? [] : {};
          this.deepClone(prop, obj[i], false);
        } else {
          obj[i] = prop;
        }
      }
      return obj;
    },
    //2个JSON方法实现深拷贝
    json2(iniObj) {
      console.log('json2');
      return JSON.parse(JSON.stringify(iniObj));
    },
  },
  mounted() {
    // 分别测试4个方法
    //this.obj2 = this.assignment(this.obj1);
    //this.obj2 = this.shallowClone(this.obj1);
    this.obj2 = this.deepClone(this.obj1);
    //this.obj2 = this.json2(this.obj1);
    console.log(this.obj1, this.obj2);
    console.log('----------------------------------');
    // 更改拷贝对象中的a,b,c,d，看看源对象是否变化
    this.obj2.a = "wenqing";
    this.obj2.b.a = "wq";
    this.obj2.b.b = 456;
    this.obj2.c = [4, 5, 6];
    this.obj2.d = () => {
      console.log("函数456");
    };
    console.log(this.obj1, this.obj2);
    console.log('-----------调用函数-------------');
    this.obj1.d();
    this.obj2.d();
  },
}
</script>

<style scoped>

</style>