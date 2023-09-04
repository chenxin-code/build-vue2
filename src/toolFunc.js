let timer = null;

//防抖1
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

//防抖2
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

//浅拷贝
export function shallowClone(iniObj) {
	console.log('shallowClone');
	var obj = {};
	for (var i in iniObj) {
		obj[i] = iniObj[i];
	}
	return obj;
}

//深拷贝
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