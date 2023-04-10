import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "hash",
    //mode: "history",
    routes: [
        //首页
        {
            path: '/',
            redirect: '/test-api',
        },
        {
            path: "/brother-component",
            component: resolve => require(["@/page/brother-component"], resolve),
        },
        {
            path: "/father-son-component",
            component: resolve => require(["@/page/father-son-component"], resolve),
        },
        {
            path: "/test-api",
            component: resolve => require(["@/page/test-api"], resolve),
        },
        {
            path: "/before-enter",
            component: resolve => require(["@/page/before-enter"], resolve),
            // 路由独享的守卫
            beforeEnter: (to, from, next) => {
                console.log('路由独享的守卫', 'to', to, 'from', from, 'next', next);
                next();
            },
        },
        {
            path: "/test-keepalive",
            component: resolve => require(["@/page/test-keepalive"], resolve),
            // 路由元信息
            meta: {
                keepAlive: true, // 缓存
                //keepAlive: false // 不缓存
            },
        },
        {
            path: "/css",
            component: resolve => require(["@/page/css/index"], resolve),
            //嵌套路由
            children: [
                {
                    path: 'flex',
                    component: resolve => require(["@/page/css/flex"], resolve),
                },
            ],
        },
        {
            path: "/es6",
            component: resolve => require(["@/page/es6/index"], resolve),
            //嵌套路由
            children: [
                {
                    path: 'forin-forof-foreach',
                    component: resolve => require(["@/page/es6/forin-forof-foreach"], resolve),
                },
                {
                    path: 'map-filter-foreach',
                    component: resolve => require(["@/page/es6/map-filter-foreach"], resolve),
                },
            ],
        },
        {
            path: "/demo",
            component: resolve => require(["@/page/demo/index"], resolve),
            //嵌套路由
            children: [
                {
                    path: 'water',
                    component: resolve => require(["@/page/demo/water"], resolve),
                },
                {
                    path: 'data-monitor',
                    component: resolve => require(["@/page/demo/data-monitor"], resolve),
                },
                {
                    path: 'pk',
                    component: resolve => require(["@/page/demo/pk"], resolve),
                },
                {
                    path: 'ssq',
                    component: resolve => require(["@/page/demo/ssq"], resolve),
                },
            ],
        },
        {
            path: "/env",
            component: resolve => require(["@/page/env"], resolve),
        },
        {
            path: "/async-component",
            component: resolve => require(["@/page/async-component"], resolve),
        },
        {
            path: "/deep-shallow-clone",
            component: resolve => require(["@/page/deep-shallow-clone"], resolve),
        },
        {
            path: "/defineProperty-Proxy",
            component: resolve => require(["@/page/defineProperty-Proxy"], resolve)
        },
        {
            path: "/Object.freeze",
            component: resolve => require(["@/page/Object.freeze"], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['@/page/404'], resolve)
        },
        //一定放最后
        {
            path: '*',
            redirect: '/404'
        }
    ],
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
    console.log('全局前置守卫', 'to', to, 'from', from, 'next', next);

    // 移动端/PC端页面  ----  杭州利鹏ERP
    var viewport = document.getElementsByName('viewport')[0];
    if (typeof viewport !== 'undefined') {
        viewport.parentElement.removeChild(viewport);
    }
    let isMobile = true;
    if (isMobile) {
        var meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width,initial-scale=1.0,user-scalable=no';
        document.getElementsByTagName('head')[0].appendChild(meta);
    }

    // 是否登录
    let login = '已登录';
    if (login === '已登录') {
        next();
    } else {
        next({
            path: '登录页面的path',
            query: {redirect: to.fullPath}//登录成功后跳回来
        });
    }

    // 是否有权限
    let auth = '有权限';
    if (auth === '有权限') {
        next();
    } else {
        next(false);
    }

});

// 全局后置钩子
router.afterEach((to, from) => {
    console.log('全局后置钩子', 'to', to, 'from', from);
});

export default router;