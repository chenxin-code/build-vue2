<template>
  <div class="refer-link">
    <el-link
        type="primary"
        icon="el-icon-document"
        target="_blank"
        ref="elLink"
        v-bind="$attrs"
        v-on="$listeners">参考
    </el-link>
  </div>
</template>

<script>
/*
参考：https://blog.csdn.net/cwin8951/article/details/130971885
*/
export default {
  mounted() {
    console.log('$attrs', this.$attrs);
    console.log('$listeners', this.$listeners);

    // 继承
    for (const [key, value] of Object.entries(this.$refs.elLink)) {
      if (!(key.includes('$') || key.includes('_'))) {
        console.log('继承', key, value);
        this[key] = value;
      }
    }
  },
};
</script>

<style lang="less" scoped>
.refer-link {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;

  .el-link {
    font-size: 14px;
    padding: 10px 20px;
    background: #409eff;
    color: #fff !important;
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(64, 158, 255, 0.4);
    transition: all 0.3s ease;
    text-decoration: none !important;
    font-weight: 500;
    display: inline-flex;
    align-items: center;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(64, 158, 255, 0.6);
      text-decoration: none !important;
    }

    &.is-underline:hover::after {
      content: none !important;
    }

    .el-icon-document {
      margin-right: 6px;
      font-size: 16px;
    }
  }
}
</style>
