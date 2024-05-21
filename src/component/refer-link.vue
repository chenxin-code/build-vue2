<template>
  <div class="refer-link">
    <el-link
        type="success"
        icon="el-icon-document"
        target="_blank"
        v-bind="$attrs"
        v-on="$listeners">参考
    </el-link>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('$attrs', this.$attrs);
    console.log('$listeners', this.$listeners);
  },
};
</script>

<style lang="less" scoped>
.refer-link {
  position: fixed;
  bottom: 12px;
  right: 18px;

  .el-link {
    font-size: 18px;
  }
}
</style>