<template>
  <div>
    <p style="font-weight: bold;color: #0dc3c3;">
      模拟双色球<br/><br/>
      曾闻：多买少买多少要买，早中晚中早晚要中。<br/>
      现赋：多买少买不如不买，早中晚中中了也亏。<br/>
      加赋：数学学得好，彩票买得少。
    </p>
    <input type="number" style="width: 80px;" v-model="zhushu" oninput="value=value.replace(/^(0+)|[^\d]+/g,'')"/>
    <button style="cursor: pointer;" @click="jixuan()" :disabled="zhushu <= 0">机选{{ zhushu }}注</button>
    <br/><br/>
    <div v-for="(item,index) in jixuanResult" :key="index">
      <span class="jx-red-ball" :class="{match:item.red_format[0].match}">{{ item.red_format[0].num }}</span>
      <span class="jx-red-ball" :class="{match:item.red_format[1].match}">{{ item.red_format[1].num }}</span>
      <span class="jx-red-ball" :class="{match:item.red_format[2].match}">{{ item.red_format[2].num }}</span>
      <span class="jx-red-ball" :class="{match:item.red_format[3].match}">{{ item.red_format[3].num }}</span>
      <span class="jx-red-ball" :class="{match:item.red_format[4].match}">{{ item.red_format[4].num }}</span>
      <span class="jx-red-ball" :class="{match:item.red_format[5].match}">{{ item.red_format[5].num }}</span>
      <span class="jx-blue-ball" :class="{match:item.blue_format[0].match}">{{ item.blue_format[0].num }}</span>
      <span style="color: orangered;" v-show="item.duijiang > 0">+{{ item.duijiang }}</span>
      <br/>
    </div>
    <br/>
    <button style="width: 80px;cursor: pointer;" @click="kaijiang()" :disabled="jixuanResult.length === 0">开奖</button>
    <br/><br/>
    <span class="kj-red-ball" v-if="kj_red1">{{ kj_red1 }}</span>
    <span class="kj-red-ball" v-else>??</span>
    <span class="kj-red-ball" v-if="kj_red2">{{ kj_red2 }}</span>
    <span class="kj-red-ball" v-else>??</span>
    <span class="kj-red-ball" v-if="kj_red3">{{ kj_red3 }}</span>
    <span class="kj-red-ball" v-else>??</span>
    <span class="kj-red-ball" v-if="kj_red4">{{ kj_red4 }}</span>
    <span class="kj-red-ball" v-else>??</span>
    <span class="kj-red-ball" v-if="kj_red5">{{ kj_red5 }}</span>
    <span class="kj-red-ball" v-else>??</span>
    <span class="kj-red-ball" v-if="kj_red6">{{ kj_red6 }}</span>
    <span class="kj-red-ball" v-else>??</span>
    <span class="kj-blue-ball" v-if="kj_blue">{{ kj_blue }}</span>
    <span class="kj-blue-ball" v-else>??</span>
    <br/><br/>
    累计<span style="color: limegreen;">-{{ leijiCost }}</span>元
    <br/>
    累计<span style="color: orangered;">+{{ leijiZhongjiang }}</span>元
  </div>
</template>

<script>
import {getRandomElementFromArray} from '@/toolFunc';

export default {
  data() {
    return {
      zhushu: 5,
      jixuanResult: [],
      redBall: [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        '31', '32', '33',
      ],
      blueBall: [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15', '16',
      ],
      // 开奖
      kj_red1: null,
      kj_red2: null,
      kj_red3: null,
      kj_red4: null,
      kj_red5: null,
      kj_red6: null,
      kj_blue: null,
      // 累计
      leijiCost: 0,
      leijiZhongjiang: 0,
    };
  },
  methods: {
    jixuan() {
      let jixuanResult = [];
      for (let i = 0; i < this.zhushu; i++) {
        let red = this.bubbleSort(getRandomElementFromArray(this.redBall, 6));
        let blue = getRandomElementFromArray(this.blueBall, 1);
        let red_format = [];
        let blue_format = [];
        red.forEach(item => {
          red_format.push({
            num: item,
            match: false,
          });
        });
        blue.forEach(item => {
          blue_format.push({
            num: item,
            match: false,
          });
        });
        jixuanResult.push({
          red_format: red_format,
          blue_format: blue_format,
          duijiang: 0, // 兑奖金额
        });
      }
      this.jixuanResult = jixuanResult;
    },
    kaijiang() {
      let kj_redBall = this.bubbleSort(getRandomElementFromArray(this.redBall, 6)),
          kj_blueBall = getRandomElementFromArray(this.blueBall, 1);
      this.kj_red1 = kj_redBall[0];
      this.kj_red2 = kj_redBall[1];
      this.kj_red3 = kj_redBall[2];
      this.kj_red4 = kj_redBall[3];
      this.kj_red5 = kj_redBall[4];
      this.kj_red6 = kj_redBall[5];
      this.kj_blue = kj_blueBall[0];
      // 是否匹配，兑奖金额
      this.jixuanResult.forEach(item1 => {
        let redMatchNum = 0, blueMatchNum = 0;
        item1.red_format.forEach(item2 => {
          item2.match = !!kj_redBall.includes(item2.num);
          if (item2.match) {
            redMatchNum++;
          }
        });
        item1.blue_format.forEach(item2 => {
          item2.match = !!kj_blueBall.includes(item2.num);
          if (item2.match) {
            blueMatchNum++;
          }
        });
        // 根据官网中奖规则编写
        if (blueMatchNum === 0) {
          if (redMatchNum === 4) {
            item1.duijiang = 10;
          } else if (redMatchNum === 5) {
            item1.duijiang = 200;
          } else if (redMatchNum === 6) {
            item1.duijiang = 50000;// 二等奖
          } else {
            item1.duijiang = 0;
          }
        } else if (blueMatchNum === 1) {
          if (redMatchNum === 0 || redMatchNum === 1 || redMatchNum === 2) {
            item1.duijiang = 5;
          } else if (redMatchNum === 3) {
            item1.duijiang = 10;
          } else if (redMatchNum === 4) {
            item1.duijiang = 200;
          } else if (redMatchNum === 5) {
            item1.duijiang = 3000;
          } else if (redMatchNum === 6) {
            item1.duijiang = 5000000;// 一等奖
          } else {
            item1.duijiang = 0;
          }
        } else {
          item1.duijiang = 0;
        }
        this.leijiZhongjiang += item1.duijiang;
      });
      this.leijiCost += this.jixuanResult.length * 2;
    },
    // 冒泡排序
    bubbleSort(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
          if (arr[j] > arr[j + 1]) {
            let temp = arr[j + 1];
            arr[j + 1] = arr[j];
            arr[j] = temp;
          }
        }
      }
      return arr;
    },
  },
  mounted() {
  },
  watch: {},
};
</script>

<style scoped>
.jx-red-ball {
  font-size: 12px;
  color: #f54646;
  border: 1px solid #f54646;
  border-radius: 50%;
  padding: 1px;
}

.jx-red-ball.match {
  color: #fff;
  background-color: #f54646;
}

.jx-blue-ball {
  font-size: 12px;
  color: #39f;
  border: 1px solid #39f;
  border-radius: 50%;
  padding: 1px;
}

.jx-blue-ball.match {
  color: #fff;
  background-color: #39f;
}

.kj-red-ball {
  color: #fff;
  background-color: #f54646;
  border: 2px solid #f54646;
  border-radius: 50%;
  padding: 2px;
}

.kj-blue-ball {
  color: #fff;
  background-color: #39f;
  border: 2px solid #39f;
  border-radius: 50%;
  padding: 2px;
}
</style>
