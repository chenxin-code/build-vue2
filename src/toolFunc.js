let timer = null;

// 防抖1
export function debounce1(fn, delay = 200) {
	if (typeof fn !== 'function') {
		throw new Error('必须传入函数');
	}
	if (timer !== null) {
		clearTimeout(timer);
	}
	timer = setTimeout(function () {
		fn();
		clearTimeout(timer);
		timer = null;
	}, delay);
}

// 防抖2
export const debounce2 = function (action, delay = 200) {
	function delayBounces() {
		let ctx = this, args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			action.apply(ctx, args);
		}, delay);
	}

	return delayBounces();
};

// 浅拷贝
export function shallowClone(iniObj) {
	console.log('shallowClone');
	var obj = {};
	for (var i in iniObj) {
		obj[i] = iniObj[i];
	}
	return obj;
}

// 深拷贝
export function deepClone(iniObj, finalObj, first = true) {
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
			deepClone(prop, obj[i], false);
		} else {
			obj[i] = prop;
		}
	}
	return obj;
}

// 从数组里选出随机元素
export function getRandomElementFromArray(arr, num){
	var sData = arr.slice(0), i = arr.length, min = i - num, item, index;
	while (i-- > min) {
		index = Math.floor((i + 1) * Math.random());
		item = sData[index];
		sData[index] = sData[i];
		sData[i] = item;
	}
	return sData.slice(min);
}

// requestAnimationFrame 请求动画帧 （白屏优化）
import Vue from 'vue';
const vue = new Vue({
	data() {
		return {
			frameCount: 0,
		};
	},
});
export function defer(maxFrameCount = 999) {
	vue.$data.frameCount = 0;
	let rafId;
	const addFrameCount = () => {
		vue.$data.frameCount++;
		// 只要没到最大帧数就一直调用
		if (vue.$data.frameCount < maxFrameCount) {
			rafId = requestAnimationFrame(addFrameCount);
		}
	};
	addFrameCount();
	return (n) => {
		// console.log(vue.$data.frameCount >= n, vue.$data.frameCount, n);
		return vue.$data.frameCount >= n;// 判断当前渲染帧数是否大于自定义n
	};
}
