import axios from 'axios';
import jsonBigint from 'json-bigint';//解决前端精度丢失

const jsonBigintString = jsonBigint({storeAsString: true});

// 创建axios实例 -- 百度新闻
export const baiduNews = axios.create({
    /*
    * 这是一个巧妙的用法
    * baseURL = 脚手架配置文件(vue.config.js)中的选项 devServer.proxy.标识位
    * 确保所有请求都带有标识位
    */
    baseURL: '/baiduNews/',
    // 默认值是 0 (永不超时)
    timeout: 5000,
    //允许你在把响应数据传递给 then 或者 catch 之前对它们进行修改
    transformResponse: [
        function (data) {
            try {
                return jsonBigintString.parse(data);
            } catch (e) {
                return data;
            }
        }
    ],
});

// 创建axios实例 -- 淘宝搜索提示
export const taobaoSearchSuggest = axios.create({
    /*
    * 这是一个巧妙的用法
    * baseURL = 脚手架配置文件(vue.config.js)中的选项 devServer.proxy.标识位
    * 确保所有请求都带有标识位
    */
    baseURL: '/taobaoSearchSuggest/',
    // 默认值是 0 (永不超时)
    timeout: 5000,
});