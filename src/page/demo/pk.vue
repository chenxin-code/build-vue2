<template>
  <div>
    <p style="font-weight: bold;color: #0dc3c3;">
      魔兽英雄PK<br/><br/>
      山丘之王、剑圣PK，双方打得有来有回，可好玩了。
    </p>
    <b>山丘之王</b>
    <span style="color: darkgrey;" v-if="aDead">阵亡</span>
    <p>攻击力:{{ a.attack[0] }}~{{ a.attack[1] }}</p>
    <p>攻速:<span :style="{color:(mjzx?'limegreen':'#000')}">{{ (a.speed * (mjzx ? 0.8 : 1)).toFixed(2) }}</span>秒/次</p>
    <p>护甲:{{ a.armor }}</p>
    <p>生命值:{{ a.totalLife }}</p>
    <p>回血速度:<span :style="{color:(hxjz?'limegreen':'#000')}">
      {{ (a.recover * (hxjz ? 0.3333 : 1)).toFixed(2) }}
    </span>秒/血</p>
    <span :style="{color:(dizzing?'lightskyblue':'#000')}">被动技能:{{ a.skill[0] }}%几率击晕{{ a.skill[1] }}秒</span>
    <!--  解决图片防盗链：referrerPolicy="no-referrer"  -->
    <img :style="{visibility:(dizzing?'initial':'hidden')}"
         src="https://bkimg.cdn.bcebos.com/pic/08f790529822720e792d1d887bcb0a46f31fabe5" referrerPolicy="no-referrer"
         style="width: 25px;" alt=""/>
    <br/><br/>
    <input v-model="mjzx" :disabled="aDead" type="checkbox" id="mjzx" style="cursor: pointer;"/>
    <label for="mjzx" style="cursor: pointer;">敏捷之靴(攻速+20%)</label>
    <input v-model="hxjz" :disabled="aDead" type="checkbox" id="hxjz" style="cursor: pointer;"/>
    <label for="hxjz" style="cursor: pointer;">回血戒指(回血速度+200%)</label>
    <br/>
    <div class="life-bar" :style="'width: ' + (a.totalLife / 20) + 'px;'">
      <div class="blood" :style="'width: ' + (100 * a.curLife / a.totalLife) + '%;'"></div>
      <div class="life-num">{{ a.curLife }}/{{ a.totalLife }}</div>
    </div>
    <hr/>
    <b>剑圣</b>
    <span style="color: darkgrey;" v-if="bDead">阵亡</span>
    <span style="color: lightskyblue;" v-if="dizzing">晕</span>
    <span style="color: red;" v-if="hiting">{{ hitNum }}!</span>
    <p>攻击力:<span :style="{color:(gjzz?'limegreen':'#000')}">{{ b.attack[0] + (gjzz ? 12 : 0) }}</span>~<span
        :style="{color:(gjzz?'limegreen':'#000')}">{{ b.attack[1] + (gjzz ? 12 : 0) }}</span></p>
    <p>攻速:{{ b.speed }}秒/次</p>
    <p>护甲:<span :style="{color:(fyjz?'limegreen':'#000')}">{{ (b.armor / (fyjz ? 1.2 : 1)).toFixed(2) }}</span></p>
    <p>生命值:{{ b.totalLife }}</p>
    <p>回血速度:{{ b.recover }}秒/血</p>
    <span :style="{color:(hiting?'red':'#000')}">被动技能:{{ b.skill[0] }}%几率{{ b.skill[1] }}倍暴击</span>
    <!--  解决图片防盗链：referrerPolicy="no-referrer"  -->
    <img :style="{visibility:(hiting?'initial':'hidden')}"
         src="https://bkimg.cdn.bcebos.com/pic/83025aafa40f4bfb2cb0b3ab004f78f0f63618e8" referrerPolicy="no-referrer"
         style="width: 25px;" alt=""/>
    <br/><br/>
    <input v-model="gjzz" :disabled="bDead" type="checkbox" id="gjzz" style="cursor: pointer;"/>
    <label for="gjzz" style="cursor: pointer;">攻击之爪(攻击力+12)</label>
    <input v-model="fyjz" :disabled="bDead" type="checkbox" id="fyjz" style="cursor: pointer;"/>
    <label for="fyjz" style="cursor: pointer;">防御戒指(护甲+20%)</label>
    <br/>
    <div class="life-bar" :style="'width: ' + (b.totalLife / 20) + 'px;'">
      <div class="blood" :style="'width: ' + (100 * b.curLife / b.totalLife) + '%;'"></div>
      <div class="life-num">{{ b.curLife }}/{{ b.totalLife }}</div>
    </div>
    <hr/>
    <button style="width: 80px;cursor: pointer;" @click="pk()" :disabled="aDead || bDead || pking">PK</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 山丘之王
      a: {
        totalLife: 9833, // 总生命值
        curLife: 9833, // 当前生命值
        recover: 1.03, // 回血速度(n秒/血)
        attack: [59, 69], // 攻击力[下限,上限]
        speed: 1.59, // 攻速(n秒/次)
        armor: 0.71, // 护甲(0~1)
        skill: [15, 3], // 被动技能[几率%,击晕n秒]
      },
      // 剑圣
      b: {
        totalLife: 7258, // 总生命值
        curLife: 7258, // 当前生命值
        recover: 1.73, // 回血速度(n秒/血)
        attack: [66, 75], // 攻击力[下限,上限]
        speed: 1.13, // 攻速(n秒/次)
        armor: 0.86, // 护甲(0~1)
        skill: [15, 4], // 被动技能[几率%,n倍暴击]
      },
      aAb: null,
      bAa: null,
      aRecoverInterval: null,
      aDead: false,
      bDead: false,
      pking: false,
      dizzing: false, // b被击晕提示
      hiting: false, // b暴击提示
      hitNum: 0, // b暴击伤害
      mjzx: false, // a是否携带敏捷之靴
      hxjz: false, // a是否携带回血戒指
      gjzz: false, // b是否携带攻击之爪
      fyjz: false, // b是否携带防御戒指
    };
  },
  methods: {
    pk() {
      this.pking = true;
      this.attack('a', 'b');
      this.attack('b', 'a');
    },
    attack(from, to) {
      if (from === 'a' && to === 'b') {
        this.aAb = setInterval(() => {
          // 击晕
          if (Math.ceil(Math.random() * 100) < this.a.skill[0]) {
            clearTimeout(this.bash);
            this.dizzing = true;
            this.bash = setTimeout(() => {
              this.dizzing = false;
            }, this.a.skill[1] * 1000);
          }
          let temp = this.b.curLife - (
              this.getRandomNum(this.a.attack[0], this.a.attack[1]) * (this.b.armor / (this.fyjz ? 1.2 : 1))
          ).toFixed(0);
          this.b.curLife = temp < 0 ? 0 : temp;
          if (this.b.curLife === 0) {
            this.bDead = true;
            this.pking = false;
            clearInterval(this.aAb);
            clearInterval(this.bAa);
          }
        }, this.a.speed * (this.mjzx ? 0.8 : 1) * 1000);
      } else if (from === 'b' && to === 'a') {
        this.bAa = setInterval(() => {
          // 击晕
          if (this.dizzing) {
            return;
          }
          let gjzz;
          if (this.gjzz) {
            gjzz = 12;
          } else {
            gjzz = 0;
          }
          let attack = this.getRandomNum(this.b.attack[0] + gjzz, this.b.attack[1] + gjzz);
          // 暴击
          if (Math.ceil(Math.random() * 100) < this.b.skill[0]) {
            attack = attack * this.b.skill[1];
            this.hitNum = attack;
            this.hiting = true;
            setTimeout(() => {
              this.hiting = false;
            }, 1500);// 暴击提示1.5秒
          }
          let temp = this.a.curLife - (attack * this.a.armor).toFixed(0);
          this.a.curLife = temp < 0 ? 0 : temp;
          if (this.a.curLife === 0) {
            this.aDead = true;
            this.pking = false;
            clearInterval(this.aAb);
            clearInterval(this.bAa);
          }
        }, this.b.speed * 1000);
      }
    },
    aRecover() {
      this.aRecoverInterval = setInterval(() => {
        if (this.a.curLife > 0 && this.a.curLife < this.a.totalLife) {
          this.a.curLife++;
        }
      }, this.a.recover * (this.hxjz ? 0.3333 : 1) * 1000);
    },
    bRecover() {
      setInterval(() => {
        if (this.b.curLife > 0 && this.b.curLife < this.b.totalLife) {
          this.b.curLife++;
        }
      }, this.b.recover * 1000);
    },
    getRandomNum(m, n) {
      return Math.floor((n + 1 - m) * Math.random() + m);
    },
  },
  mounted() {
    this.aRecover();
    this.bRecover();
  },
  watch: {
    mjzx() {
      if (this.aAb && !this.aDead && !this.bDead) {
        clearInterval(this.aAb);
        this.attack('a', 'b');
      }
    },
    hxjz() {
      if (this.aRecoverInterval) {
        clearInterval(this.aRecoverInterval);
        this.aRecover();
      }
    },
  },
};
</script>

<style scoped>
.life-bar {
  margin: 10px 15px;
  height: 25px;
  background-color: #fff;
  border: 1px solid orange;
  overflow: hidden;
  position: relative;
}

.life-bar .blood {
  height: 100%;
  background-color: darkorange;
}

.life-bar .life-num {
  width: 100%;
  line-height: 25px;
  color: #000;
  font-size: 12px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: absolute;
  top: 0;
}
</style>
