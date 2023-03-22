import axios from 'axios';
import jsonBigint from 'json-bigint';//解决前端精度丢失  ----  中科泰岳
import qs from 'qs';//是否使用qs序列化参数：取决于后端要如何接收数据

const jsonBigintString = jsonBigint({storeAsString: true});

//----------------------------------------- 百度新闻 -----------------------------------------//

//创建axios实例
export const baiduNews = axios.create({
    /*
    这是一个巧妙的用法
    baseURL = 脚手架配置文件(vue.config.js)中的选项 devServer.proxy.标识位
    确保所有请求都带有标识位
    */
    baseURL: '/baiduNews/',
    // 默认值是 0 (永不超时)
    timeout: 5000,
    /*
    允许在向服务器发送前，修改请求数据
    只能用于 PUT  POST  PATCH 这些请求方法
    可以修改请求头
    */
    transformRequest: [
        function (data, headers) {
            console.log('transformRequest', 'data', data, 'headers', headers);
            return data;
        }
    ],
    //允许在把响应数据传递给 then/catch 之前对它们进行修改
    transformResponse: [
        function (data) {
            //console.log('transformResponse', 'data', data);
            try {
                return jsonBigintString.parse(data);
            } catch (e) {
                return data;
            }
        }
    ],
});
//请求拦截
baiduNews.interceptors.request.use(config => {
    // loading 开启
    // ......

    console.log('请求拦截', 'config', config);
    if (process.env.NODE_ENV === '生产环境') {
        config.headers.Authorization = 'Bearer xxxxxxxxx';
    } else {
        config.headers.Authorization = 'Bearer xxxxxxxxx';
    }
    if (config.method === 'post') {
        config.data = qs.stringify({
            ...config.data,
        });
    } else if (config.method === 'get') {
        config.params = {
            ...config.params,
        };
    }
    return config;
}, error => {
    return Promise.reject(error);
});
//响应拦截
baiduNews.interceptors.response.use(response => {
    // loading 关闭
    // ......

    console.log('响应拦截', 'response', response);
    // 2xx 范围内的状态码都会触发该函数

    let reLogin = false;
    if (reLogin) {
        alert('用户信息失效, 请重新登录');
    }
    return response;
}, error => {
    // loading 关闭
    // ......

    // 超出 2xx 范围的状态码都会触发该函数
    return Promise.reject(error);
});

//----------------------------------------- 淘宝搜索提示 -----------------------------------------//

//创建axios实例
export const taobaoSearchSuggest = axios.create({
    /*
    这是一个巧妙的用法
    baseURL = 脚手架配置文件(vue.config.js)中的选项 devServer.proxy.标识位
    确保所有请求都带有标识位
    */
    baseURL: '/taobaoSearchSuggest/',
    // 默认值是 0 (永不超时)
    timeout: 5000,
});