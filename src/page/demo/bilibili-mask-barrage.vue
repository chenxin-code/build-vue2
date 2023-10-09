<template>
  <div>
    <div id="container">
      <video id="video" src="@/res/bilibili-mask-barrage/demo.mp4" controls></video>
    </div>
    <div class="danmaku-editor">
      <img id="avatar-result" src="@/res/bilibili-mask-barrage/avatar-none.svg"
           data-empty="/res/bilibili-mask-barrage/avatar-none.svg" alt="avatar-none" title="选择头像">
      <div id="avatar-selector">
        <img src="@/res/bilibili-mask-barrage/avatar-01.svg" alt="">
        <img src="@/res/bilibili-mask-barrage/avatar-02.svg" alt="">
        <img src="@/res/bilibili-mask-barrage/avatar-03.svg" alt="">
        <img src="@/res/bilibili-mask-barrage/avatar-04.svg" alt="">
        <img src="@/res/bilibili-mask-barrage/avatar-05.svg" alt="">
        <img src="@/res/bilibili-mask-barrage/avatar-06.svg" alt="">
        <span>None</span>
      </div>
      <input type="text" id="danmaku_input" placeholder="填写弹幕内容...">
      <button id="danmaku_submit">发送弹幕</button>
    </div>
    <p id="msg_box"></p>
  </div>
</template>

<script>
import Barrage from 'barrage-ui';
import {getRandomElementFromArray} from '@/toolFunc';

export default {
  mounted() {

// 父级容器
    const container = document.getElementById('container');

// 创建弹幕实例
    const barrage = new Barrage({
      container: container,
    });

    const textList = Array.from({length: 999999}, () => {
      return getRandomElementFromArray([
        '从前从前有个人爱你很久但偏偏风渐渐把距离吹得好远',
        '天空灰的像哭过离开你以后并没有更自由',
        '我只能永远读着对白读着我给你的伤害',
        '......',
      ], 1)[0];
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
    barrage.canvas.height = container.clientHeight - 80;
    barrage.setData(new Array(500).fill(null).map((d, i) => ({
      key: (() => new Array(2).fill(0).map(() => Math.random().toString(32).slice(2)).join(''))(),
      time: 500 * (i + Math.random()),
      avatar: (() => avatarList[Math.floor(avatarList.length * Math.random())])(),
      text: (() => textList[Math.floor(textList.length * Math.random())])(),
      color: (() => ['#f00', '#0f0', '#ff0', '#fff', '#fff', '#fff', '#fff'][Math.floor(6 * Math.random())])(),
      createdAt: Date.now() + Math.random() * 24 * 3600 * 1000,
    })));

// 获取视频元素
    const video = document.getElementById('video');

// 新建一个画布来实时绘制视频（纯绘图，不用添加进页面）
    const vCanvas = document.createElement('canvas');
    vCanvas.width = video.clientWidth;
    vCanvas.height = video.clientHeight;
    const vContext = vCanvas.getContext('2d');

// 实时绘制视频到画布
    barrage.afterRender = () => {
      vContext.drawImage(video, 0, 0, vCanvas.width, vCanvas.height);
    };

// 渲染前读取画布 vCanvas 的数据，并处理为蒙版图像
    barrage.beforeRender = () => {
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

        // 将黑色区域以外的内容设为透明，透明 = 遮挡弹幕
        if (r > 15 || g > 15 || b > 15) {
          frame.data[4 * i + 3] = 0;
        }
      }

      // 设置蒙版
      barrage.setMask(frame);
    };

// 绑定播放事件
    video.addEventListener(
        'play',
        () => {
          barrage.play();
        },
        false
    );

// 绑定暂停事件
    video.addEventListener(
        'pause',
        () => {
          barrage.pause();
        },
        false
    );

// 播放进度事件
    video.addEventListener(
        'seeked',
        () => {
          barrage.goto(video.currentTime * 1000);
        },
        false
    );

// 点击按钮发送弹幕
    document.getElementById('danmaku_submit').onclick = e => {
      if (window.event) {
        window.event.cancelBubble = true;
      } else {
        e.stopPropagation();
      }

      const danmakuIpt = document.getElementById('danmaku_input');
      const msgBox = document.getElementById('msg_box');

      if (danmakuIpt.value.trim()) {
        const result = barrage.add({
          time: video.currentTime * 1000,
          text: danmakuIpt.value,
          avatar: document.getElementById('avatar-result').dataset.url,
        });

        if (result) {
          // 弹幕插入成功
          danmakuIpt.value = '';
          msgBox.style.color = 'green';
          msgBox.innerText = '弹幕插入成功！';
          setTimeout(() => {
            msgBox.innerText = '';
          }, 2000);
        } else {
          // 弹幕插入失败
          msgBox.style.color = 'red';
          msgBox.innerText = '当前进度弹幕过于饱和，请择机再试 ~(o_o)~';
          setTimeout(() => {
            msgBox.innerText = '';
          }, 2000);
        }
      }
    };

// 显示/隐藏头像面板
    document.getElementById('avatar-result').addEventListener(
        'click',
        function (e) {
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
        function (e) {
          const avatarResultNode = document.getElementById('avatar-result');

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
#container,
#video {
  width: 880px;
  height: 540px;
}

#container {
  margin: 0 auto;
  margin-top: 32px;
  background-color: #ddd;
}

#video::-webkit-media-controls-fullscreen-button {
  display: none;
}

.danmaku-editor {
  width: 880px;
  margin: 0 auto;
  margin-top: 16px;
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

#danmaku_input {
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

#danmaku_input:focus {
  color: #333;
  border-color: #333;
  background: #fff;
}

#danmaku_submit {
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

#danmaku_submit:active {
  background: #1b8963;
}

#msg_box {
  width: 880px;
  margin: 0 auto;
  margin-top: 16px;
  padding: 0 8px;
  box-sizing: border-box;
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
