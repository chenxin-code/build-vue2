<template>
  <div>
    <referLink href="https://blog.csdn.net/qq_44979541/article/details/129765021"/>
    <video ref="video" :width="width" :height="height" autoplay/>
    <canvas ref="canvas" :width="width" :height="height"/>
    <el-button-group>
      <el-button icon="el-icon-video-camera" round @click="openCamera()">打开摄像头</el-button>
      <el-button type="primary" icon="el-icon-camera" round @click="photograph()">拍照</el-button>
    </el-button-group>
  </div>
</template>

<script>
import referLink from '@/component/refer-link';

export default {
  components: {
    referLink,
  },
  data() {
    return {
      width: 300,
      height: 300,
    };
  },
  methods: {
    // 调用权限（打开摄像头功能）
    openCamera() {
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = (constraints) => {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise((resolve, reject) => {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {width: this.width, height: this.height, transform: 'scaleX(-1)'}
      }).then((stream) => {
        // 旧的浏览器可能没有srcObject
        if ('srcObject' in this.$refs.video) {
          this.$refs.video.srcObject = stream;
        } else {
          // 避免在新的浏览器中使用它，因为它正在被弃用。
          this.$refs.video.src = window.URL.createObjectURL(stream);
        }
        this.$refs.video.onloadedmetadata = () => {
          this.$refs.video.play();
        };
      }).catch(err => {
        console.log(err);
      });
    },
    //  绘制图片（拍照功能）
    photograph() {
      // 点击，canvas画图
      this.$refs.canvas.getContext('2d').drawImage(this.$refs.video, 0, 0, this.width, this.height);
      // 获取图片base64链接
      const file = this.$refs.canvas.toDataURL('image/png');
      new FormData().append('file', this.base64ToFile(file, (new Date()).valueOf() + '.png'));
    },
    // base64图片转file的方法（base64图片, 设置生成file的文件名）
    base64ToFile(base64, fileName) {
      // 将base64按照 , 进行分割 将前缀  与后续内容分隔开
      const data = base64.split(',');
      // 利用正则表达式 从前缀中获取图片的类型信息（image/png、image/jpeg、image/webp等）
      const type = data[0].match(/:(.*?);/)[1];
      // 从图片的类型信息中 获取具体的文件格式后缀（png、jpeg、webp）
      const suffix = type.split('/')[1];
      // 使用atob()对base64数据进行解码  结果是一个文件数据流 以字符串的格式输出
      const bstr = window.atob(data[1]);
      // 获取解码结果字符串的长度
      let n = bstr.length;
      // 根据解码结果字符串的长度创建一个等长的整形数字数组
      // 但在创建时 所有元素初始值都为 0
      const u8arr = new Uint8Array(n);
      // 将整形数组的每个元素填充为解码结果字符串对应位置字符的UTF-16 编码单元
      while (n--) {
        // charCodeAt()：获取给定索引处字符对应的 UTF-16 代码单元
        u8arr[n] = bstr.charCodeAt(n);
      }
      // 利用构造函数创建File文件对象
      return new File([u8arr], `${fileName}.${suffix}`, {
        type: type
      });
    },
  },
  mounted() {
    this.openCamera();
  },
  unmounted() {
    // 关闭摄像头
    this.$refs.video.srcObject.getTracks()[0].stop();
  },
};
</script>

<style lang="less" scoped>
//视频、图片水平翻转
video,
canvas {
  transform: scaleX(-1);
}
</style>
