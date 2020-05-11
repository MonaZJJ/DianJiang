import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export const asyncRouterMap = [{
        path: '/',
        name: 'index',
        meta: {
            title: '首页'
        },
        component: () =>
            import('../views/index/index'),
    },
    {
        path: '/classify',
        name: 'classify',
        meta: {
            title: '分类'
        },
        component: () =>
            import('../views/productCenter/classify'),
    },
    {
        path: '/member',
        name: 'member',
        meta: {
            title: '个人中心'
        },
        component: () =>
            import('../views/memberCenter/member'),
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: () =>
            import('../views/userCenter/login'),
    },
    {
        //授权中间页
        path: '/author',
        name: 'author',
        component: () =>
            import( /* webpackChunkName: "about" */ '../views/userCenter/author.vue'),
    },
    {
        path: "/profit",
        name: "profit",
        meta: {
            title: "我的收益"
        },
        component: () =>
            import("../views/memberCenter/profit")
    },
    {
        path: "/profitDetail",
        name: "profitDetail",
        meta: {
            title: "收益明细"
        },
        component: () =>
            import("../views/memberCenter/profitDetail")
    },
    {
        path: "/myCompany",
        name: "myCompany",
        meta: {
            title: "公司介绍"
        },
        component: () =>
            import("../views/memberCenter/myCompany")
    },
    {
        path: "/perfectInformation",
        name: "perfectInformation",
        meta: {
            title: "完善信息"
        },
        component: () =>
            import("../views/memberCenter/perfectInformation")
    },
    {
        path: "/withdraw",
        name: "withdraw",
        meta: {
            title: "佣金提现"
        },
        component: () =>
            import("../views/memberCenter/withdraw")
    },
    {
        path: "/integral",
        name: "integral",
        meta: {
            title: "我的积分"
        },
        component: () =>
            import("../views/memberCenter/integral")
    },
    {
        path: "/wallet",
        name: "wallet",
        meta: {
            title: "我的钱包"
        },
        component: () =>
            import("../views/memberCenter/wallet")
    },
    {
        path: "/business",
        name: "business",
        meta: {
            title: "成为供应商"
        },
        component: () =>
            import("../views/memberCenter/business")
    },
    {
        path: "/team",
        name: "team",
        meta: {
            title: "我的团队"
        },
        component: () =>
            import("../views/memberCenter/team")
    },
    {
        path: "/collect",
        name: "collect",
        meta: {
            title: "我的收藏"
        },
        component: () =>
            import("../views/memberCenter/collect")
    },
    {
        path: "/order",
        name: "order",
        meta: {
            title: "我的订单"
        },
        component: () =>
            import("../views/orderCenter/order")
    },
    {
        path: "/orderDetail",
        name: "orderDetail",
        meta: {
            title: "订单详情"
        },
        component: () =>
            import("../views/orderCenter/orderDetail")
    },
    {
        path: "/selfOrderDetail",
        name: "selfOrderDetail",
        meta: {
            title: "自提订单详情"
        },
        component: () =>
            import("../views/orderCenter/selfOrderDetail")
    },
    {
        path: "/logistics",
        name: "logistics",
        meta: {
            title: "查看物流"
        },
        component: () =>
            import("../views/orderCenter/logistics")
    },
    {
        path: "/chooseStore",
        name: "chooseStore",
        meta: {
            title: "选择门店列表"
        },
        component: () =>
            import("../views/storeCenter/chooseStore")
    },
    {
        path: "/orderAddress",
        name: "orderAddress",
        meta: {
            title: "订单收货地址"
        },
        component: () =>
            import("../views/addressCenter/orderAddress")
    },
    {
        path: "/myAddress",
        name: "myAddress",
        meta: {
            title: "我的收货地址"
        },
        component: () =>
            import("../views/addressCenter/myAddress")
    },
    {
        path: "/addAddress",
        name: "addAddress",
        meta: {
            title: "添加收货地址"
        },
        component: () =>
            import("../views/addressCenter/addAddress")
    },
    {
        path: "/editAddress",
        name: "editAddress",
        meta: {
            title: "编辑收货地址"
        },
        component: () =>
            import("../views/addressCenter/editAddress")
    },
    {
        path: '/productDetail',
        name: 'productDetail',
        meta: {
            title: '商品详情'
        },
        component: () =>
            import('../views/productCenter/productDetail'),
    },
    {
        path: '/productReviewList',
        name: 'productReviewList',
        meta: {
            title: '商品评价列表'
        },
        component: () =>
            import('../views/productCenter/productReviews'),
    },
    {
        path: '/integralDetail',
        name: 'integralDetail',
        meta: {
            title: '积分商品详情'
        },
        component: () =>
            import('../views/productCenter/integralDetail'),
    },
    {
        path: "/productAssess",
        name: "productAssess",
        meta: {
            title: "商品评论"
        },
        component: () =>
            import("../views/productCenter/productAssess")
    },
    {
        path: "/productRefund",
        name: "productRefund",
        meta: {
            title: "申请退款"
        },
        component: () =>
            import("../views/productCenter/productRefund")
    },
    {
        path: '/cart',
        name: 'cart',
        meta: {
            title: '购物车'
        },
        component: () =>
            import('../views/cartCenter/cart'),
    },
    {
        path: '/payOrder',
        name: 'payOrder',
        meta: {
            title: '订单结算'
        },
        component: () =>
            import('../views/productCenter/payOrder'),
    },
    {
        path: '/integralPayOrder',
        name: 'integralPayOrder',
        meta: {
            title: '积分订单结算'
        },
        component: () =>
            import('../views/productCenter/integralPayOrder'),
    },
    {
        path: "/storeMe",
        name: "storeMe",
        meta: {
            title: "门店"
        },
        component: () =>
            import("../views/storeCenter/storeMe")
    },
    {
        path: "/storeLogin",
        name: "storeLogin",
        meta: {
            title: "门店登录"
        },
        component: () =>
            import("../views/storeCenter/login")
    },
    {
        path: '/storeOrderList',
        name: 'storeOrderList',
        meta: {
            title: '售后订单'
        },
        component: () =>
            import('../views/storeCenter/storeOrderList'),
    },
    {
        path: '/afterSaleOrderDetail',
        name: 'afterSaleOrderDetail',
        meta: {
            title: '售后订单详情'
        },
        component: () =>
            import('../views/storeCenter/afterSaleOrderDetail'),
    },
    {
        path: "/storeOrderDetail",
        name: "storeOrderDetail",
        meta: {
            title: "门店订单详情"
        },
        component: () =>
            import("../views/storeCenter/storeOrderDetail")
    },
    {
        path: "/storeProfit",
        name: "storeProfit",
        meta: {
            title: "门店收益"
        },
        component: () =>
            import("../views/storeCenter/storeProfit")
    },
    {
        path: "/storeProfitDetail",
        name: "storeProfitDetail",
        meta: {
            title: "门店收益详情"
        },
        component: () =>
            import("../views/storeCenter/storeProfitDetail")
    },
    {
        path: "/storeTeam",
        name: "storeTeam",
        meta: {
            title: "门店团队"
        },
        component: () =>
            import("../views/storeCenter/storeTeam")
    },
    {
        path: "/storeWithdraw",
        name: "storeWithdraw",
        meta: {
            title: "门店提现"
        },
        component: () =>
            import("../views/storeCenter/storeWithdraw")
    },
    {
        path: "/storeTeam",
        name: "storeTeam",
        meta: {
            title: "门店团队"
        },
        component: () =>
            import("../views/storeCenter/storeTeam")
    },
    {
        path: "/statics",
        name: "statics",
        meta: {
            title: "门店统计"
        },
        component: () =>
            import("../views/storeCenter/statics")
    },
    {
        path: '/productList',
        name: 'productList',
        meta: {
            title: '产品列表'
        },
        component: () =>
            import('../views/productCenter/productList'),
    },
    {
        path: '/afterSaleList',
        name: 'afterSaleList',
        meta: {
            title: '售后列表'
        },
        component: () =>
            import('../views/orderCenter/afterSaleList'),
    },
    {
        path: '/afterSaleApply',
        name: 'afterSaleApply',
        meta: {
            title: '申请售后'
        },
        component: () =>
            import('../views/orderCenter/afterSaleApply'),
    },
    {
        path: '/afterSaleDetail',
        name: 'afterSaleDetail',
        meta: {
            title: '售后详情'
        },
        component: () =>
            import('../views/orderCenter/afterSaleDetail'),
    },
    {
        path: '/myCode',
        name: 'myCode',
        meta: {
            title: '我的二维码'
        },
        component: () =>
            import('../views/memberCenter/myCode'),
    },
    {
        path: '/storeCode',
        name: 'storeCode',
        meta: {
            title: '门店二维码'
        },
        component: () =>
            import('../views/storeCenter/storeCode'),
    },
    {
        path: '/rules',
        name: 'rules',
        meta: {
            title: '会员规则'
        },
        component: () =>
            import('../views/memberCenter/rules'),
    },
    {
        path: '/upgrade',
        name: 'upgrade',
        meta: {
            title: '个人中心'
        },
        component: () =>
            import('../views/memberCenter/upgrade'),
    },
    {
        path: '/deliverDoods',
        name: 'deliverDoods',
        meta: {
            title: '发货填写'
        },
        component: () =>
            import('../views/orderCenter/deliverDoods'),
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

export default new Router({
    mode: 'history', //后端支持可开
    scrollBehavior: () => ({
        y: 0
    }),
    routes: [...asyncRouterMap]
})