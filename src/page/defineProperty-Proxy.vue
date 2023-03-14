<template>
  <div>
    <h1>vue2:defineProperty</h1>
    <h1>vue3:Proxy</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj1: {},
      obj2: {},
    };
  },
  methods: {
    func1() {
      Object.defineProperty(this.obj1, 'name', {
        get: () => {
          console.log('defineProperty-get-钩子');
          return '陈昕';
        },
        set: (value) => {
          console.log('defineProperty-set-钩子', value);
        }
      });
      console.log(this.obj1.name);
      this.obj1.name = 'chenxin';
    },
    func2() {
      const proxyObj = new Proxy(this.obj2, {
        get: (obj, prop) => {
          console.log('Proxy-get-钩子', obj, prop);
          return Reflect.get(obj, prop);
        },
        set: (obj, prop, value) => {
          console.log('Proxy-set-钩子', obj, prop, value);
          return Reflect.set(obj, prop, value);
        }
      });
      proxyObj.name = '刘文卿';
      proxyObj.age = 11;
      console.log(proxyObj.name);
      console.log(proxyObj.age);
    },
  },
  mounted() {
    this.func1();
    this.func2();
  }
}
</script>

<style scoped>

</style>