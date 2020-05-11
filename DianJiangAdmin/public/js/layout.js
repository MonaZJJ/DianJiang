$(function () {
    Layout.init();
})

var Layout = {
    layoutTpl: `{{each NoticeList as value i}}
        <li class="clearfix">
            <p class="info-text">{{NoticeList[i].Body}}</p>
            <p class="info-time">{{NoticeList[i].AddTime | convertNotificationTime}}</p>
            <img class="info-read" src="/public/images/true.png" data-nid={{NoticeList[i].NId}}>
        </li>
    {{/each}}`,
    sidebarTpl: "{{each PermissionsList as value i}}" +
    "<li class='{{PermissionsList[i].Action | selectFirstSide}}'>" +
    "<a href='{{PermissionsList[i].Action | selectFirstUrl}}'>" +
    "<i  class='iconfont {{PermissionsList[i].IconClass == '' ? 'icon-yingyong' : PermissionsList[i].IconClass }}'></i>" +
    "<span>{{PermissionsList[i].Title}}</span>" +
    "{{if PermissionsList[i].ChildList && PermissionsList[i].ChildList.length>0}}" +
    "<span class='pull-right-container'>" +
    "<i class='fa fa-angle-right pull-right'></i>" +
    "</span>" +
    "{{/if}}" +
    "</a>" +
    "{{if PermissionsList[i].ChildList && PermissionsList[i].ChildList.length>0}}" +
    "<ul class='treeview-menu'>" +
    "{{each PermissionsList[i].ChildList as value j}}" +
    "<li class='{{PermissionsList[i].ChildList[j].Action | selectSecondSide}}' >" +
    "<a href='{{PermissionsList[i].ChildList[j].Action}}'>" +
    "<i class='fa'></i>" +
    "<span>{{PermissionsList[i].ChildList[j].Title}}</span>" +
    "</a>" +
    "</li>" +
    "{{/each}}" +
    "</ul>" +
    "{{/if}}" +
    "</li>" +
    "{{/each}}",
    storeSideBarTpl: `
     <li class=""><a href="/"><i class="iconfont icon-shouye"></i><span>首页</span></a></li>
        <li class="active"><a href="#"><i class="iconfont icon-shangchengxinxi"></i><span>商城设置</span><span
                class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>
            <ul class="treeview-menu menu-open" style="display: block;">
                <li class=""><a href="/homePage/advertisingSet"><i class="fa fa-circle-o"></i><span>广告设置</span></a></li>
                <li class=""><a href="/homePage/productRecommend"><i class="fa fa-circle-o"></i><span>首页商品推荐</span></a>
                </li>
                <li class=""><a href="/homePage/feedbackList"><i class="fa fa-circle-o"></i><span>意见反馈</span></a></li>
                <li class=""><a href="/homePage/aboutUs"><i class="fa fa-circle-o"></i><span>关于我们</span></a></li>
            </ul>
        </li>
        <li class=""><a href="#"><i class="iconfont icon-shangpin"></i><span>商品管理</span><span
                class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>
            <ul class="treeview-menu">
                <li class=""><a href="/product"><i class="fa fa-circle-o"></i><span>商品发布</span></a></li>
                <li class=""><a href="/product/productList"><i class="fa fa-circle-o"></i><span>商品列表</span></a></li>
                <li class=""><a href="/product/classifyList"><i class="fa fa-circle-o"></i><span>商品分类</span></a></li>
                <li class=""><a href="/product/typeList"><i class="fa fa-circle-o"></i><span>商品属性</span></a></li>
                <li class=""><a href="/product/productLabel"><i class="fa fa-circle-o"></i><span>商品标签</span></a></li>
            </ul>
        </li>
        <li class=""><a href="#"><i class="iconfont icon-dingdan"></i><span>订单管理</span><span
                class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>
            <ul class="treeview-menu">
                <li class=""><a href="/order/orderList"><i class="fa fa-circle-o"></i><span>订单列表</span></a></li>
                <li class=""><a href="/order/orderSettings"><i class="fa fa-circle-o"></i><span>订单设置</span></a></li>
                <li class=""><a href="/order/orderService"><i class="fa fa-circle-o"></i><span>售后服务</span></a></li>
            </ul>
        </li>
        <li class=""><a href="#"><i class="iconfont icon-huiyuanguanli"></i><span>运营商管理</span><span
                class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>
            <ul class="treeview-menu">
                <li class=""><a href="/operator/operatorList"><i class="fa fa-circle-o"></i><span>运营商列表</span></a></li>
            </ul>
        </li>
        <li class=""><a href="#"><i class="iconfont icon-shangchengxinxi"></i><span>社区管理</span><span
                class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>
            <ul class="treeview-menu">
                <li class=""><a href="/community/communityApply"><i class="fa fa-circle-o"></i><span>申请列表</span></a>
                </li>
                <li class=""><a href="/community/communityList"><i class="fa fa-circle-o"></i><span>社区列表</span></a></li>
            </ul>
        </li>
        <li class=""><a href="#"><i class="iconfont icon-icon_bell"></i><span>支付配送</span><span
                class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>
            <ul class="treeview-menu">
                <li class=""><a href="/mall/logisticCompany"><i class="fa fa-circle-o"></i><span>物流公司</span></a></li>
                <li class=""><a href="/mall/freightTemplate"><i class="fa fa-circle-o"></i><span>运费模板</span></a></li>
            </ul>
        </li>
        <li class=""><a href="#"><i class="iconfont icon-paimingkaoqian-01"></i><span>分销管理</span><span
                class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>
            <ul class="treeview-menu">
                <li class=""><a href="/distribution/UserList"><i class="fa fa-circle-o"></i><span>分销列表</span></a></li>
                <li class=""><a href="/distribution/distributorGrade"><i class="fa fa-circle-o"></i><span>分销等级列表</span></a>
                </li>
                <li class=""><a href="/distribution/commissionList"><i class="fa fa-circle-o"></i><span>佣金列表</span></a>
                </li>
                <li class=""><a href="/distribution/commissionSetting"><i
                        class="fa fa-circle-o"></i><span>佣金设置</span></a></li>
            </ul>
        </li>
        <li class=""><a href="#"><i class="iconfont icon-benbanzushengchandingdanguanli"></i><span>权限管理</span><span
                class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>
            <ul class="treeview-menu">
                <li class=""><a href="/jurisdiction/departmentManagement"><i
                        class="fa fa-circle-o"></i><span>部门管理</span></a></li>
                <li class=""><a href="/jurisdiction/jurisdictionOperation"><i
                        class="fa fa-circle-o"></i><span>管理员操作</span></a></li>
                <li class=""><a href="/jurisdiction/jurisdictionJournal"><i class="fa fa-circle-o"></i><span>操作日志</span></a>
                </li>
            </ul>
        </li>
    `,
    init: function () {
        //辅助函数（侧边栏选中）
        template.defaults.imports.selectFirstUrl = Common.selectFirstUrl;
        template.defaults.imports.selectSecondSide = Common.selectSecondSide;
        template.defaults.imports.selectFirstSide = Common.selectFirstSide;

        //加载左侧菜单列表
        Layout.adminPermissionsList();

        $('body').on("click", '#logout', function () {
            Layout.logout();
        });
        //标记已读
        $("#infoList").on("click", ".info-read", function () {
            var nid = $(this).attr("data-nid");
            Layout.updateIsRead(nid);
        });

        //标记全部已读
        $("#markAll").on("click", function () {
            Layout.updateAllIsRead();
        });

        //给页面图片添加error
        $("#userImg-small,#userImg-big,#userImg-mid").on("error", function () {
            $(this).attr("src", "/public/dist/img/user2-160x160.jpg");
        });

        $('body').on("click", '#menuSideBar .treeview-menu li', function () {
            localStorage.setItem('PageIndex', "1")
            localStorage.setItem('PageSize', "10")
        });

        $('.skin-blue').height('1000px')

        //使用辅助函数
        template.defaults.imports.convertNotificationTime = Common.convertNotificationTime;

        Layout.initUserInfo();

        if (localStorage.getItem('token') != null && localStorage.getItem('token') != '') {
            Layout.getIsNewOrder();
            window.setInterval(function () {
                Layout.timeActionWithOrder()
            }, 10000);
        }
    },
    //定时获取是否存在新的订单、刷新通知列表
    timeActionWithOrder: function () {
        Layout.getIsNewOrder();
    },
    //是否有新的订单通知
    getIsNewOrder: function () {
        var methodName = "/notice/AdminNotSignNoticeList";
        var data = {};
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                if (data.Data.Total > 0) {
                    Layout.getInformationList();
                }
            } else {
                // Common.showErrorMsg(data.Message);
            }
        }, null, true);

    },
    //加载用户头像昵称信息
    initUserInfo: function () {
        $("#userImg-small").attr("src", localStorage.Avatar);
        $("#userImg-big").attr("src", localStorage.Avatar);
        $("#userImg-mid").attr("src", localStorage.Avatar);
        $("#username").text("典匠生活");
        $("#username-mid").text(localStorage.UserName);
    },
    //标记全部已读
    updateAllIsRead: function () {
        var methodName = "/notice/AdminSetAllNoticeIsRead";
        var data = {};
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {

                $("#infoList").html("");
                $("#markAll").hide();
                $("#count").text(0);

            } else {
                Common.showErrorMsg(data.Message);
            }
        }, null, true);
    },
    //标记已读
    updateIsRead: function (NId) {
        var methodName = "/notice/AdminSetNoticeIsRead";
        var data = {
            NId: NId
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {

                Layout.getInformationList();

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //通知列表
    getInformationList: function () {
        var pageSize = 3;
        var methodName = "/notice/AdminNoticeList";
        var data = {
            IsRead: 0,
            Page: {
                PageSize: pageSize,
                PageIndex: 1
            }
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                //渲染html
                var render = template.compile(Layout.layoutTpl);
                var html = render(data.Data);
                $("#infoList").html(html);
                $("#count").text(data.Data.Total);
                if (data.Data.Total == 0) {
                    $("#markAll").hide();
                } else if (data.Data.Total > 0) {
                    $("#markAll").show();
                }
            } else {
                // Common.showErrorMsg(data.Message);
            }
        }, null, true);
    },
    //退出接口
    logout: function (isNoShowMsg) {
        $.ajax({
            url: "/account/adminAccount/Logout",
            type: "post",
            dataType: 'json',
            contentType: "application/json ; charset=utf-8",
        });

        localStorage.clear();

        if (isNoShowMsg) {
            window.location.href = "/account/login";
        } else {
            Common.showSuccessMsg("退出成功!", function () {
                window.location.href = "/account/login";
            });
        }
    },
    //获取管理员权限列表
    adminPermissionsList: function () {
        var methodName = "/admin/GetAdminPermissionsList";

        SignRequest.set(methodName, {}, function (data) {
            if (data.Code == "100") {

                //渲染html
                var render = template.compile(Layout.sidebarTpl);

                console.log(data)

                var html = render(data.Data);

                $(".sidebar-menu").html(html);

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    }
}