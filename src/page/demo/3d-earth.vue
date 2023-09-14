<template>
  <div class="universe">
    <div class="button-box">
      <button @click="rotation = !rotation">{{ rotation ? '关闭自转' : '开启自转' }}</button>
    </div>
    <div style="width: 100%; height: 100%;">
      <div ref="earth" style="width: 100%; height: 100%;"></div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as TWEEN from '@tweenjs/tween.js';

let scene;
export default {
	data() {
		return {
			earthDom: null,
			webGLRenderer: null,
			animationType: true, // 地球入场动画
			rotation: true, // 自转
			perspectiveCamera: null,
			fov: 100,
		};
	},
	methods: {
		// 渲染
		render() {
			this.webGLRenderer.clear();
			// 地球入场动画
			if (this.animationType) {
				this.fov -= 0.6;
				if (this.fov <= 45) {
					this.animationType = false;
					this.perspectiveCamera.position.set(0, 0, 200);
					this.perspectiveCamera.lookAt(0, 0, 0);
					this.orbitControlsAction();
				} else {
					this.perspectiveCamera = new THREE.PerspectiveCamera(this.fov, this.earthDom.clientWidth / this.earthDom.clientHeight, 1, 1000);
					this.perspectiveCamera.position.set(0, 0, 200);
					this.perspectiveCamera.lookAt(0, 0, 0);
				}
			}
			// 自转
			if (this.rotation) {
				scene.rotation.y += 0.003;
			}
			this.webGLRenderer.render(scene, this.perspectiveCamera);
			requestAnimationFrame(this.render);
			TWEEN.update();
		},
		orbitControlsAction() {
			let orbitControls = new OrbitControls(this.perspectiveCamera, this.webGLRenderer.domElement);
			orbitControls.enableDamping = true;
			orbitControls.enableZoom = true;
			orbitControls.autoRotate = false;
			orbitControls.autoRotateSpeed = 2;
			orbitControls.enablePan = true;
		},
	},
	mounted() {
		// 场景
		scene = new THREE.Scene();
		// 渲染
		this.webGLRenderer = new THREE.WebGLRenderer({antialias: true});
		this.earthDom = this.$refs.earth;
		this.webGLRenderer.setSize(this.earthDom.clientWidth, this.earthDom.clientHeight);
		this.webGLRenderer.setClearColor(0x000, 0);
		this.earthDom.appendChild(this.webGLRenderer.domElement);
		// 相机
		this.perspectiveCamera = new THREE.PerspectiveCamera(this.fov, this.earthDom.clientWidth / this.earthDom.clientHeight, 1, 1000);
		this.perspectiveCamera.position.set(0, 0, 200);
		this.perspectiveCamera.lookAt(0, 0, 0);
		this.orbitControlsAction();
		// 纹理贴图
		let textureLoader = new THREE.TextureLoader();
		textureLoader.load(require('@/img/earth.jpg'), function (texture) {
			// 创建地球
			let sphereGeometry = new THREE.SphereGeometry(70, 100, 100);
			// 设置颜色贴图属性值
			let meshBasicMaterial = new THREE.MeshBasicMaterial({map: texture});
			// 网格模型对象
			let mesh = new THREE.Mesh(sphereGeometry, meshBasicMaterial);
			// 唯一标识
			mesh.name = '3d-earth';
			// 添加到场景中
			scene.add(mesh);
		});
		this.render();
	},
};
</script>

<style lang="less" scoped>
.universe {
  width: 100%;
  height: 100%;
  background-image: url('./../../img/universe.png');
  background-size: 100% 130%;
  overflow: hidden;
  cursor: grab;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  .button-box {
    padding: 0 15px;
    width: 10%;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 0;

    button {
      width: 100%;
      height: 35px;
      font-size: 18px;
      font-family: cursive;
      color: #fff;
      background-color: #265a88;
      border: none;
      border-radius: 15px;
      cursor: pointer;

      &:hover {
        color: #265a88;
        background-color: #fff;
      }
    }
  }
}
</style>