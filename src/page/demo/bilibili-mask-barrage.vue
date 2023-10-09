<template>
  <div>
    <div class="container" ref="container">
      <video class="video" ref="video" src="@/res/bilibili-mask-barrage/dance-girl.mp4" controls/>
    </div>
    <div class="danmaku-editor">
      <img id="avatar-result" ref="avatarResult" src="@/res/bilibili-mask-barrage/avatar-none.svg"
           :data-empty="require('@/res/bilibili-mask-barrage/avatar-none.svg')" alt="avatar-none" title="选择头像"/>
      <div id="avatar-selector">
        <img src="@/res/bilibili-mask-barrage/avatar-01.svg" alt="" />
        <img src="@/res/bilibili-mask-barrage/avatar-02.svg" alt="" />
        <img src="@/res/bilibili-mask-barrage/avatar-03.svg" alt="" />
        <img src="@/res/bilibili-mask-barrage/avatar-04.svg" alt="" />
        <img src="@/res/bilibili-mask-barrage/avatar-05.svg" alt="" />
        <img src="@/res/bilibili-mask-barrage/avatar-06.svg" alt="" />
        <span>None</span>
      </div>
      <input class="danmaku_input" ref="danmaku_input" placeholder="填写弹幕内容..."/>
      <button class="danmaku_submit" @click="sendBarrage()">发送弹幕</button>
    </div>
  </div>
</template>

<script>
import Barrage from 'barrage-ui';
import {debounce1, getRandomElementFromArray} from '@/toolFunc';

export default {
  data() {
    return {
      // 弹幕实例
      barrage: null,
      // 模拟弹幕
      simBarrage: [
        // eslint-disable-next-line max-len
        '刮风这天我试过握着你手，但偏偏雨渐渐大到我看你不见，还要多久我才能在你身边，等到放晴的那天也许我会比较好一点，从前从前有个人爱你很久，但偏偏风渐渐把距离吹得好远，好不容易又能再多爱一天，但故事的最后你好像还是说了拜拜。',
        '我只能永远读着对白，读着我给你的伤害，我原谅不了我，就请你当作我已不在。',
        '前方高能！！非战斗人员迅速撤离！！',
        '我从未见过如此厚颜无耻之人',
        '迎面走来的你让我如此蠢蠢欲动',
        '下次一定',
        '火钳刘明',
        '爷青回',
        '真香！',
        '23333333333333',
        '66666666666666',
        '......',
      ],
    };
  },
  methods: {
    sendBarrage() {
      debounce1(() => {
        if (this.$refs.danmaku_input.value.trim()) {
          const result = this.barrage.add({
            time: this.$refs.video.currentTime * 1000,
            text: this.$refs.danmaku_input.value,
            avatar: this.$refs.avatarResult.dataset.url,
          });
          if (result) {
            this.$refs.danmaku_input.value = '';
            this.$message.success('弹幕插入成功！');
          } else {
            this.$message.error('当前进度弹幕过于饱和，请择机再试 ~(o_o)~');
          }
        }
      });
    },
  },
  mounted() {
    // 创建弹幕实例
    this.barrage = new Barrage({
      container: this.$refs.container, // 父级容器
    });
    const textList = Array.from({length: 999999}, () => {
      return getRandomElementFromArray(this.simBarrage, 1)[0];
    });
    const avatarList = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      require('@/res/bilibili-mask-barrage/avatar-01.svg'),
      require('@/res/bilibili-mask-barrage/avatar-02.svg'),
      require('@/res/bilibili-mask-barrage/avatar-03.svg'),
      require('@/res/bilibili-mask-barrage/avatar-04.svg'),
      require('@/res/bilibili-mask-barrage/avatar-05.svg'),
      require('@/res/bilibili-mask-barrage/avatar-06.svg'),
    ];
    // 重置画布高度，避免弹幕遮挡视频播放控件
    this.barrage.canvas.height = this.$refs.container.clientHeight - 80;
    this.barrage.setData(new Array(500).fill(null).map((d, i) => ({
      key: (() => new Array(2).fill(0).map(() => Math.random().toString(32).slice(2)).join(''))(),
      time: 500 * (i + Math.random()),
      avatar: (() => avatarList[Math.floor(avatarList.length * Math.random())])(),
      text: (() => textList[Math.floor(textList.length * Math.random())])(),
      color: (() => ['#f00', '#0f0', '#ff0', '#fff', '#fff', '#fff', '#fff'][Math.floor(6 * Math.random())])(),
      createdAt: Date.now() + Math.random() * 24 * 3600 * 1000,
    })));
    // 新建一个画布来实时绘制视频（纯绘图，不用添加进页面）
    const vCanvas = document.createElement('canvas');
    vCanvas.width = this.$refs.video.clientWidth;
    vCanvas.height = this.$refs.video.clientHeight;
    const vContext = vCanvas.getContext('2d');
    // 实时绘制视频到画布
    this.barrage.afterRender = () => {
      vContext.drawImage(this.$refs.video, 0, 0, vCanvas.width, vCanvas.height);
    };
    // 渲染前读取画布 vCanvas 的数据，并处理为蒙版图像
    this.barrage.beforeRender = () => {
      console.log('设置蒙版图像');
      // 读取图像
      const frame = vContext.getImageData(0, 0, vCanvas.width, vCanvas.height);
      // 图像总像素个数
      const pxCount = frame.data.length / 4;
      // 将 frame 构造成我们需要的蒙版图像
      for (let i = 0; i < pxCount; i++) {
        // 这里不用 ES6 解构赋值的写法，主要为了保证计算性能
        const r = frame.data[i * 4];
        const g = frame.data[i * 4 + 1];
        const b = frame.data[i * 4 + 2];
        // 将黑色区域以外的内容设为透明（透明 = 遮挡弹幕）
        if (r > 15 || g > 15 || b > 15) {
          frame.data[4 * i + 3] = 0;
        }
      }
      // 设置蒙版
      this.barrage.setMask(frame);
    };
    // 绑定播放事件
    this.$refs.video.addEventListener(
        'play',
        () => {
          this.barrage.play();
        },
        false
    );
    // 绑定暂停事件
    this.$refs.video.addEventListener(
        'pause',
        () => {
          this.barrage.pause();
        },
        false
    );
    // 播放进度事件
    this.$refs.video.addEventListener(
        'seeked',
        () => {
          this.barrage.goto(this.$refs.video.currentTime * 1000);
        },
        false
    );
    // 显示/隐藏头像面板
    this.$refs.avatarResult.addEventListener(
        'click',
        (e) => {
          const avatarSelector = document.getElementById('avatar-selector');
          if (e.target.className === 'expanded') {
            e.target.className = '';
            avatarSelector.className = '';
          } else {
            e.target.className = 'expanded';
            avatarSelector.className = 'show';
          }
        },
        false
    );
    // 选择头像
    document.getElementById('avatar-selector').addEventListener(
        'click',
        (e) => {
          const avatarResultNode = this.$refs.avatarResult;
          if (e.target.tagName.toLowerCase() === 'img') {
            avatarResultNode.src = e.target.src;
            avatarResultNode.dataset.url = e.target.src;
          } else {
            avatarResultNode.src = avatarResultNode.dataset.empty;
            avatarResultNode.dataset.url = '';
          }
          avatarResultNode.className = '';
          document.getElementById('avatar-selector').className = '';
        },
        false
    );
  },
};
</script>

<style scoped>
.container,
.video {
  width: 880px;
  height: 540px;
}

.container {
  margin: 15px auto;
  background-color: #ddd;
}

.video::-webkit-media-controls-fullscreen-button {
  display: none;
}

.danmaku-editor {
  width: 880px;
  margin: 15px auto;
  position: relative;
}

.danmaku-editor > * {
  display: inline-block;
  vertical-align: middle;
}

.danmaku-editor::after {
  content: '';
  clear: both;
  display: table;
}

.danmaku_input {
  float: left;
  box-sizing: border-box;
  width: calc(100% - 136px);
  padding: 8px 16px;
  padding-left: 52px;
  font-size: 18px;
  line-height: 1.5;
  color: #999;
  border: 1px solid #999;
  border-radius: 5px;
  background: transparent;
  transition: background 0.1s ease-in;
  outline: none;
}

.danmaku_input:focus {
  color: #333;
  border-color: #333;
  background: #fff;
}

.danmaku_submit {
  float: right;
  width: 120px;
  height: 45px;
  background: #3dab85;
  transition: background 0.1s ease-in;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.danmaku_submit:active {
  background: #1b8963;
}

/* 选择头像 */
#avatar-result {
  position: absolute;
  left: 12px;
  top: 7px;
  width: 22px;
  padding: 5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 0 0 rgba(50, 120, 6, 0.363);
  transition: all 300ms ease-in-out;
  cursor: pointer;
}

#avatar-result.expanded {
  background: rgba(255, 255, 255, 0);
  box-shadow: 0 0 0 2px rgba(50, 120, 6, 0.363);
}

#avatar-selector {
  opacity: 0;
  position: absolute;
  bottom: 45px;
  left: 0;
  width: 270px;
  height: 0;
  box-sizing: border-box;
  overflow: hidden;
  transition: all 300ms ease-in-out;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  padding: 5px;
  margin: 0;
  background: #fff;
}

#avatar-selector.show {
  opacity: 1;
  height: 140px;
}

#avatar-selector img,
#avatar-selector span {
  width: 35px;
  margin: 10px;
  padding: 5px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0);
  transition: box-shadow 200ms ease-in-out;
  border-radius: 3px;
  float: left;
  cursor: pointer;
}

#avatar-selector span {
  display: block;
  font-size: 10px;
  line-height: 35px;
  color: #999;
  text-align: center;
}

#avatar-selector img:hover,
#avatar-selector span:hover {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}
/* 选择头像 */
</style>
