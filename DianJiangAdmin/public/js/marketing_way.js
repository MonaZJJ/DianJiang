$(function () {
    MarketingWay.init()
});
var MarketingWay = {

    //优惠券类型名称
    couponTypeName: "",
    //优惠券类型状态
    state: "0",
    //编辑的时候记录id
    couponId: "",
    PageIndex: 1,
    userNameTpl: `
         {{each List as value i}}
         <option value="{{List[i].UId}}">{{List[i].UserName}}</option>
         {{/each}}
    `,

    init: function () {

        MarketingWay.initBootstrapTable()

        //全选
        $("#selAll").on("change", function () {
            if ($(this).is(':checked')) {
                $(".checkbox").prop("checked", true);
            } else {
                $(".checkbox").prop("checked", false);
            }
        });

        // 分页条数设置
        $("#pagesize_dropdown").on("change", function () {
            MarketingWay.projectDestoryQuery();
        });

        //添加优惠券模态框出现的时候
        $('#coupon_add_modal').on('show.bs.modal', function () {
            MarketingWay.PageIndex = 1;
            $('#SpecifyProductBox').hide();
            //把模态框内的内容清空
            MarketingWay.resetData();
        });

        //点击查询按钮
        $('body').on("click", '#search', function () {
            MarketingWay.projectQuery()
        });

        //重置按钮
        $("#resetBtn").click(function () {
            $("#coupon_name").val("");
        })

        //保存按钮点击
        $('body').on('click', '#saveData', function () {
            //优惠券名称
            if (!Validate.emptyValidateAndFocus("#coupon_name_add", "请输入优惠券名称", "")) {
                return false;
            }
            //面值
            if (!Validate.emptyValidateAndFocus("#denomination", "请输入面值", "")) {
                return false;
            }

            //张数
            if (!Validate.emptyValidateAndFocus("#TotalAmount", "请输入张数", "")) {
                return false;
            }

            //订单金额
            if (!Validate.emptyValidateAndFocus("#orderAmout", "请输入订单金额", "")) {
                return false;
            }
            //有效期
            if (!Validate.emptyValidateAndFocus("#start_time", "请选择有效日期", "")) {
                return false;
            }
            //有效期
            if (!Validate.emptyValidateAndFocus("#end_time", "请选择有效日期", "")) {
                return false;
            }
            //有效期
            if (!Validate.emptyValidateAndFocus("#sendStart_time_add", "请选择发放日期", "")) {
                return false;
            }
            //有效期
            if (!Validate.emptyValidateAndFocus("#sendEnd_time_add", "请选择发放日期", "")) {
                return false;
            }
            //订单金额必须大于面值
            if($("#orderAmout").val<$("#denomination").val()){
                Common.showInfoMsg("订单金额必须大于面值")
            }
            MarketingWay.adminAddCouponType();
        });

        //点击编辑
        $('body').on('click', '.editCoupon', function () {
            var id = $(this).attr("data-id");
            MarketingWay.couponId = id;
            MarketingWay.adminEditCouponTypeInfo(id)
        });

        //编辑模态框的确认按钮
        $('body').on("click", '#editSaveData', function () {
            //订单金额必须大于面值
            if($("#orderAmout").val<$("#denomination").val()){
                Common.showInfoMsg("订单金额必须大于面值")
            }
            MarketingWay.adminEditCouponType()
        });


        //使失效
        $('body').on("click", '.takeEffect', function () {
            var id = $(this).attr("data-id");
            MarketingWay.adminCouponTypeState(id)
        });
        //删除按钮
        $('body').on('click', '.delectCoupon', function () {
            var id = $(this).attr("data-id");
            Common.confirmDialog("是否确认删除？", function () {
                MarketingWay.adminDelCouponType(id)
            })
        })

        //发放优惠券
        $("body").on("click", ".sendCoupon", function () {
            var id = $(this).attr("data-id");
            MarketingWay.couponId = id;
            MarketingWay.getUserList();
        })

        //点击保存发放
        $("#sendData").click(function () {
           MarketingWay.sendCoupon( MarketingWay.couponId);
        })


        //有效期
        laydate.render({
            elem: '#start_time', //指定元素

        });
        laydate.render({
            elem: '#end_time', //指定元素
        });
        //有效期
        laydate.render({
            elem: '#start_time_edit', //指定元素
        });
        laydate.render({
            elem: '#end_time_edit', //指定元素
        });

        //发放时间
        laydate.render({
            elem: '#sendStart_time_add', //指定元素

        });
        laydate.render({
            elem: '#sendEnd_time_add', //指定元素
        });
        //有效期
        laydate.render({
            elem: '#sendStart_time_edit', //指定元素
        });
        laydate.render({
            elem: '#sendEnd_time_edit', //指定元素
        });
    },

    //获取用户列表
    getUserList: function () {
        var methodName = "/user/AdminGetUserList";
        var data = {};
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                var render = template.compile(MarketingWay.userNameTpl);
                var html = render(data.Data);
                $("#userName").html(html);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //发放优惠券
    sendCoupon: function (id) {
        var methodName = "/AdminCoupon/AdminSendCoupon";
        var data = {
            "CouponTypeId": id,
            "Uid": $("#userName").val(),
            "SendCount": 1
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("发放成功",function () {
                    $("#coupon_send_modal").modal("hide");
                    MarketingWay.projectQuery()
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //后台添加优惠劵类型
    adminAddCouponType: function () {
        //请求方法
        var methodName = "/CouponType/AdminAddCouponType";
        var data = {
            Name: $('#coupon_name_add').val(),
            Money: $('#denomination').val(),
            Count: Math.ceil($('#TotalAmount').val()),
            OrderMoney: $('#orderAmout').val(),
            UseStartTime: $('#start_time').val(),
            UseEndTime: $('#end_time').val(),
            SendStartTime: $('#sendStart_time_add').val(),
            SendEndTime: $('#sendEnd_time_add').val(),
            Description:$("#coupon_desc_add").val(),
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                Common.showSuccessMsg("添加优惠券成功", function () {
                    $('#coupon_add_modal').modal('hide');
                    MarketingWay.projectQuery()
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //添加优惠券模态框消失的时候数据重置
    resetData: function () {
        $('#orderAmout').val("");
        //日期清空
        $('#start_time').val("");
        $('#end_time').val("");
        $('#sendStart_time_add').val("");
        $('#sendEnd_time_add').val("");

        //发放总量
        $('#TotalAmount').val("");
        //面值
        $('#denomination').val("");
        //优惠券名称
        $('#coupon_name_add').val("");
    },

    //后台优惠劵类型信息
    adminEditCouponTypeInfo: function (id) {
        //请求方法
        var methodName = "/CouponType/AdminCouponTypeInfo";
        var data = {
            CouponTypeId: id
        };
        console.log(data);
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data);
            if (data.Code == "100") {
                $('#coupon_name_edit').val(data.Data.CouponTypeInfo.Name);
                $('#coupon_desc_edit').val(data.Data.CouponTypeInfo.Description);
                $('#denominationEdit').val(data.Data.CouponTypeInfo.Money);
                $('#TotalAmountEdit').val(data.Data.CouponTypeInfo.Count);
                //订单金额
                $('#orderAmoutEdit').val(data.Data.CouponTypeInfo.OrderAmountLower);
                //有效期
                $('#start_time_edit').val(moment(data.Data.CouponTypeInfo.UseStartTime).format("YYYY-MM-DD"));
                $('#end_time_edit').val(moment(data.Data.CouponTypeInfo.UseEndTime).format("YYYY-MM-DD"));

                //发放时间
                $('#sendStart_time_edit').val(moment(data.Data.CouponTypeInfo.SendStartTime).format("YYYY-MM-DD"));
                $('#sendEnd_time_edit').val(moment(data.Data.CouponTypeInfo.SendEndTime).format("YYYY-MM-DD"));

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //后台编辑优惠劵类型
    adminEditCouponType: function () {
        //请求方法
        var methodName = "/CouponType/AdminEditCouponType";
        var data = {
            "UseExpireTime": 0,
            CouponTypeId: MarketingWay.couponId,
            Name: $('#coupon_name_edit').val(),
            Money: $('#denominationEdit').val(),
            Count: Math.ceil($('#TotalAmountEdit').val()),
            OrderMoney: $('#orderAmoutEdit').val(),
            UseStartTime: $('#start_time_edit').val(),
            UseEndTime: $('#end_time_edit').val(),
            SendStartTime: $('#sendStart_time_edit').val(),
            SendEndTime: $('#sendEnd_time_edit').val(),
            Description:$("#coupon_desc_edit").val()
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data);
            if (data.Code == "100") {
                Common.showSuccessMsg("编辑成功", function () {
                    MarketingWay.projectQuery();
                    $('#coupon_edit_modal').modal('hide');
                });
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //后台更改优惠券状态
    adminCouponTypeState: function (id) {
        //请求方法
        var methodName = "/CouponType/AdminCouponTypeState";
        var data = {
            CouponTypeId: id,
        };
        console.log(data);
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data);
            if (data.Code == "100") {
                Common.showSuccessMsg("更改成功", function () {
                    //表格刷新
                    MarketingWay.projectQuery();
                });

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //后台删除优惠劵类型
    adminDelCouponType: function (id) {
        //请求方法
        var methodName = "/CouponType/AdminDelCouponType";
        var data = {
            couponTypeIdList: [
                id
            ],
        };
        console.log(data)
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                Common.showSuccessMsg("删除成功", function () {
                    //表格刷新
                    MarketingWay.projectQuery();
                });


            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //bootstrapTable
    initBootstrapTable: function () {
        $("#tb_coupon_list").bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/CouponType/AdminCouponTypeList',
            dataType: "json",
            striped: true, //使表格带有条纹
            pagination: true, //在表格底部显示分页工具栏
            pageSize: 10,
            pageNumber: 1,
            pageList: [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000],
            idField: "Id", //标识哪个字段为id主键
            showToggle: false, //名片格式
            cardView: false, //设置为True时显示名片（card）布局
            // showColumns: true, //显示隐藏列
            // showRefresh: true, //显示刷新按钮
            singleSelect: false, //复选框只能选择一条记录
            search: false, //是否显示右上角的搜索框
            clickToSelect: true, //点击行即可选中单选/复选框
            sidePagination: "server", //表格分页的位置
            queryParams: MarketingWay.queryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: MarketingWay.responseHandler,
            columns:
                [
                    {
                        field: 'Name',
                        title: '优惠券名称',
                        align: 'center',
                        valign: 'middle',
                    },
                    {
                        field: 'Money',
                        title: '面值(元)',
                        align: 'center',
                        valign: 'middle',

                    },
                    {
                        field: 'GetMode',
                        title: '使用条件',
                        align: 'center',
                        valign: 'middle',
                        formatter: function (value, row, index) {
                            if (value == "0") {
                                return "无限制"
                            } else if (value == "1") {
                                return "限领一张"
                            } else if (value == "2") {
                                return "每天限领一张"
                            }
                        }
                    },
                    {
                        field: 'SendStartTime ',
                        title: '有效期',
                        align: 'center',
                        valign: 'middle',
                        formatter: function (value, row, index) {
                            var start = moment(row.UseStartTime).format('YYYY-MM-DD');
                            var end = moment(row.UseEndTime).format('YYYY-MM-DD');
                            var html = `<span>${start} 至 ${end}</span>
                            `
                            console.log(html)
                            return html
                        }

                    },
                    {
                        field: 'RemainCount',
                        title: '剩余数量',
                        align: 'center',
                        valign: 'middle',

                    },
                    {
                        field: 'SendCount',
                        title: '领取人/张',
                        align: 'center',
                        valign: 'middle',
                        formatter: function (value, row, index) {
                            var html = `
                            <span>${row.SendPersonCount}/${row.SendCount}<span>
                            `
                            return html
                        }

                    },
                    {
                        field: 'UseIngCount',
                        title: '已使用',
                        align: 'center',
                        valign: 'middle',
                    },
                    {
                        field: 'CouponTypeId',
                        title: '操作',
                        align: 'center',
                        valign: 'middle',
                        formatter: function (value, row, index) {
                            var html = `                                 
                                    <a href="/marketMode/marketing_detail_list?CouponTypeId=${row.CouponTypeId}">活动详情</a>
                                    <a data-toggle="modal" class="editCoupon" data-target="#coupon_edit_modal" data-id="${row.CouponTypeId}">编辑</a>
                                    <a class="delectCoupon" data-id="${row.CouponTypeId}">删除</a>
                                    <a data-toggle="modal" class="sendCoupon" data-target="#coupon_send_modal" data-id="${row.CouponTypeId}">发放优惠券</a>
                                `;
                            return html
                        }

                    }
                ],
            silent: true, //刷新事件必须设置
            formatLoadingMessage: function () {
                return "请稍等，正在加载中...";
            },
            formatNoMatches: function () { //没有匹配的结果
                return '无符合条件的记录';
            },
            onLoadSuccess: function (data) {
                console.log(data);

                $('.caret').remove()

            },
            onLoadError: function (data) {
                $('#tb_coupon_list').bootstrapTable('removeAll');
            },
            // 1.点击每行进行函数的触发
            onClickRow: function (row, tr, flied) {
                // 书写自己的方法
            },
            //2. 点击前面的复选框进行对应的操作
            //点击全选框时触发的操作
            //点击全选框时触发的操作
            onCheckAll: function (rows) {

            },
            onUncheckAll: function (rows) {

            },
            //点击每一个单选框时触发的操作
            onCheck: function (row) {


            },
            //取消每一个单选框时对应的操作；
            onUncheck: function (row) {
                Array.prototype.remove = function (val) {
                    var index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                };

            }
        });
    },
    //bootstrap table post 参数 queryParams
    queryParams: function (params) {
        //配置参数
        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            minSize: $("#leftLabel").val(),
            maxSize: $("#rightLabel").val(),
            minPrice: $("#priceleftLabel").val(),
            maxPrice: $("#pricerightLabel").val(),
            CouponTypeName: MarketingWay.couponTypeName,
            State: MarketingWay.state,
            SendMode: MarketingWay.sendMode,
            Page: {
                PageSize: params.limit, //页面大小,
                PageIndex: (params.offset / params.limit) + 1 //页码
            }
        };
        console.log(temp)
        return temp;

    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseHandler: function (res) {
        console.log(res)
        if (res.Data != null) {
            console.log(res);
            return {
                "rows": res.Data.CouponTypeList,
                "total": res.Data.Total
            };
        } else {
            return {
                "rows": [],
                "total": 0
            };
        }
    },
    //表格刷新
    projectQuery: function (parame, id) {
        console.log(id)
        if (parame == "" || parame == undefined) {
            var obj = {
                CouponTypeName: $("#coupon_name").val(),
                State: $("#state_box").val(),
                SendMode: $("#payment").val(),
            };
        } else {
            var obj = parame;
        }


        $("#tb_coupon_list").bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + '/CouponType/AdminCouponTypeList',
                query: obj
            }
        );
    },
}

