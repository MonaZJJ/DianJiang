$(function () {
    CommissionList.init();
})

var CommissionList = {

    UId: 0,     //分销员id

    init: function () {
        // 日期控件初始化
        Common.initLaydateWithTime();
        CommissionList.initBootstrapTable();
        //表格分页每页显示数据
        $("#pagesize_dropdown").on("change", function () {
            CommissionList.projectDestroyQuery();
        });
        //查询按钮点击
        $('body').on('click', '#search', function () {
            CommissionList.projectDestroyQuery();
        })
        //查看佣金明细
        $('body').on('click', '.toCommission', function () {
            var id = $(this).attr('data-id');
            location.href = `/distribution/commissionSubsidiary?id=${id}`
        })

    },

    //bootstrapTable
    initBootstrapTable: function () {
        $('#productTable').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/sSplitComm/AdminDistUserAmountList',
            dataType: "json",
            striped: true, //使表格带有条纹
            pagination: true, //在表格底部显示分页工具栏
            pageSize: 10,
            pageNumber: 1,
            pageList: [10, 20, 50, 100, 200, 500, 1000, 2000],
            idField: "Id", //标识哪个字段为id主键
            showToggle: false, //名片格式
            cardView: false, //设置为True时显示名片（card）布局
            // showColumns: true, //显示隐藏列
            // showRefresh: true, //显示刷新按钮
            singleSelect: false, //复选框只能选择一条记录
            search: false, //是否显示右上角的搜索框
            clickToSelect: true, //点击行即可选中单选/复选框
            sidePagination: "server", //表格分页的位置
            queryParams: CommissionList.queryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: CommissionList.responseHandler,
            columns: [
                {
                    field: 'RecordId',
                    title: '编号',
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'UserName',
                    title: '佣金所得者',
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'ChildUserName',
                    title: '下线名称',
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'StoreName',
                    title: '门店名称',
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'ProductName',
                    title: '商品名称',
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'OSn',
                    title: '订单编号',
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'Amount',
                    title: '订单金额',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return "¥" + value;
                    }
                },
                {
                    field: 'RebateAmount',
                    title: '佣金金额',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return "¥" + value;
                    }
                },
                // {
                //     field: 'TradeTypes',
                //     title: '佣金类型',
                //     align: 'center',
                //     valign: 'middle',
                // },
                {
                    field: 'SplitRankDesc',
                    title: '佣金等级',
                    align: 'center',
                    valign: 'middle',
                },
                // {
                //     field: '',
                //     title: '是否可用',
                //     align: 'center',
                //     valign: 'middle',
                //     formatter: function (value, row, index) {
                //         if(value){
                //             var html = '是';
                //         }else {
                //             var html = '否';
                //         }
                //         return html;
                //     }
                // },
                {
                    field: 'AdmissionTimes',
                    title: '实际入账时间',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if(value == '1900-01-01 00:00:00'){
                            return '未入账';
                        }else {
                            return value;
                        }
                    }
                },
                {
                    field: 'CreateTimes',
                    title: '产生时间',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'RecordId',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = `<span class="status_edit toCommission" data-id="${value}">佣金明细</span>`;
                        return html;
                    }
                }
            ], //列
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
                $('#productTable').bootstrapTable('removeAll');
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
        //方法名
        var methodName = "/sSplitComm/AdminDistUserAmountList";

        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            "UId": Common.getUrlParam("id")?Common.getUrlParam("id"):0,
            "UserName": $("#UserName").val(),
            "StoreName": $("#StoreName").val(),
            "ChildUserName": $("#ChildUserName").val(),
            "OSn": $("#OSn").val(),
            "SplitRank": $("#SplitRank").val(),
            "StartTime":  $("#start").val(),
            "EndTime": $("#end").val(),
            PageModel: {
                PageSize: params.limit,//页面大小,
                PageIndex: (params.offset / params.limit) + 1,//页码
            }
        };
        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseHandler: function (res) {
        if (res.Data != null) {
            console.log(res);
            return {
                "rows": res.Data.List,
                "total": res.Data.Total
            };
        } else {
            return {
                "rows": [],
                "total": 0
            };
        }
    },
    //表格刷新(直接刷新)
    projectQuery: function (parame) {
        //方法名
        var methodName = "/sSplitComm/AdminDistUserAmountList";

        if (parame == "" || parame == undefined) {
            var obj = {
                "UId": Common.getUrlParam("id")?Common.getUrlParam("id"):0,
                "UserName": $("#UserName").val(),
                "StoreName": $("#StoreName").val(),
                "ChildUserName": $("#ChildUserName").val(),
                "OSn": $("#OSn").val(),
                "SplitRank": $("#SplitRank").val(),
                "StartTime":  $("#start").val(),
                "EndTime": $("#end").val(),
            };
        } else {
            var obj = parame;
        }

        $('#productTable').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );
    },
    //表格刷新(先销毁后初始化)
    projectDestroyQuery: function (parame) {
        //方法名
        var methodName = "/sSplitComm/AdminDistUserAmountList";

        if (parame == "" || parame == undefined) {
            var obj = {
                "UId": Common.getUrlParam("id")?Common.getUrlParam("id"):0,
                "UserName": $("#UserName").val(),
                "StoreName": $("#StoreName").val(),
                "ChildUserName": $("#ChildUserName").val(),
                "OSn": $("#OSn").val(),
                "SplitRank": $("#SplitRank").val(),
                "StartTime":  $("#start").val(),
                "EndTime": $("#end").val(),
                PageModel: {
                    PageSize: 10, //页面大小,
                    PageIndex: 1, //页码
                }
            };
        } else {
            var obj = parame;
        }

        $('#productTable').bootstrapTable(
            "destroy", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );

        CommissionList.initBootstrapTable();

    },
}
