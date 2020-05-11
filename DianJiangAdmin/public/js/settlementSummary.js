$(function () {
    SettlementSummary.init();
})

var SettlementSummary = {
    userLabelTpl: `
        {{each UserLabelList as value i}}
        <option value="{{UserLabelList[i].LId}}">{{UserLabelList[i].Title}}</option>
        {{/each}}
    `,
    setLabelTpl: `
        {{each UserLabelList as value i}}
        <label class="checkbox-inline">
            <input class="set-checkbox" type="checkbox" value="{{UserLabelList[i].LId}}"> {{UserLabelList[i].Title}}
        </label>
        {{/each}}
    `,
    userRankTpl: `
        {{each UserRankList as value i}}
        <option value="{{UserRankList[i].UserRId}}">{{UserRankList[i].Title}}</option>
        {{/each}}
    `,
    init: function () {

        var type = Common.getUrlParam("type");
        if (type) {
            $('.nav-tabs').find('li').each(function (index, item) {
                if ($(item).attr('data-type') == type) {
                    $(item).addClass('active');
                    $(item).siblings().removeClass('active');
                }
            })
        } else {
            $('.nav-tabs').find('li').eq(0).addClass('active').siblings().removeClass('active');
        }
        //tab切换
        $('body').on('click', '.nav-tabs li', function () {
            var state = $(this).attr('data-type');
            $(this).addClass('active').siblings().removeClass('active')
            location.href = '/settlement/settlementSummary?type=' + state + ''
            SettlementSummary.refreshQuery()
        })
        //关闭弹窗
        $(".mask").on("click", ".close", function () {
            $(".mask").hide();
        });

        //查看按钮点击
        $('body').on('click', '.status_see', function () {
            var id = $(this).attr('data-id');
            var type = Number(Common.getUrlParam('type')) ? Common.getUrlParam('type') : 1;
            location.href = '/settlement/settlementDetail?sId=' + id + '&type=' + type + ''
        })


        //每页显示数量
        $("#pagesize_dropdown").on("change", function () {
            SettlementSummary.projectQuery();
        });

        //查询
        $("#search").on("click", function () {
            SettlementSummary.projectQuery();
        });

        //导出
        $("#export").on("click", function () {

            Common.confirmDialog("确认导出当前筛选条件下的当前页数据？", function () {
                SettlementSummary.exportSettlementSummaryData();
            });

        });


        // 初始化日期控件
        Common.initLaydateWithTime();

        SettlementSummary.initBootstrapTable();
    },
    // 导出
    exportSettlementSummaryData: function () {
        var methodName = "/settlementrecord/ExportSettlementSummar";
        var data = {
            Type: Number(Common.getUrlParam('type')) ? Common.getUrlParam('type') : 1,
            StartDate: $("#start").val(),
            EndTime: $("#end").val(),
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                location.href = data.Data;
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //会员列表bootstrapTable
    initBootstrapTable: function () {
        $('#memberTable').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/settlementrecord/AdminGetSettlementSummary',
            dataType: "json",
            striped: true, //使表格带有条纹
            pagination: true, //在表格底部显示分页工具栏
            pageSize: $("#pagesize_dropdown").val(),
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
            queryParams: SettlementSummary.queryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: SettlementSummary.responseHandler,
            columns: [
                {
                    field: 'CreateTime',
                    title: '创建时间',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Amount',
                    title: '金额',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Status',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == 0) {
                            return "待结算";
                        } else {
                            return "已结算";
                        }
                    }
                },
                {
                    field: 'SuccessTime',
                    title: '结算成功时间',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'SettlementDate',
                    title: '结算日',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'SId',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = "";
                        html += "<span class='status_see' data-id='" + value + "'>结算明细</span>";
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
                $('#memberTable').bootstrapTable('removeAll');
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
        var methodName = "/settlementrecord/AdminGetSettlementSummary";
        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            minSize: $("#leftLabel").val(),
            maxSize: $("#rightLabel").val(),
            minPrice: $("#priceleftLabel").val(),
            maxPrice: $("#pricerightLabel").val(),
            Type: Number(Common.getUrlParam('type')) ? Common.getUrlParam('type') : 1,
            StartDate: $("#start").val(),
            EndTime: $("#end").val(),
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
    refreshQuery: function (parame) {
        //方法名
        var methodName = "/settlementrecord/AdminGetSettlementSummary";

        if (parame == "" || parame == undefined) {
            var obj = {

                Type: Number(Common.getUrlParam('type')) ? Common.getUrlParam('type') : 1,
                StartDate: $("#start").val(),
                EndTime: $("#end").val(),
            };
        } else {
            var obj = parame;
        }

        $('#memberTable').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );
    },
    //表格刷新（先销毁后初始化）
    projectQuery: function (parame) {
        //方法名
        var methodName = "/settlementrecord/AdminGetSettlementSummary";
        if (parame == "" || parame == undefined) {
            var obj = {
                Type: Number(Common.getUrlParam('type')) ? Common.getUrlParam('type') : 1,
                StartDate: $("#start").val(),
                EndTime: $("#end").val(),
                PageModel: {
                    PageSize: $("#pagesize_dropdown").val(),//页面大小,
                    PageIndex: 1,//页码
                }
            };
        } else {
            var obj = parame;
        }


        $('#memberTable').bootstrapTable(
            "destroy", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );

        SettlementSummary.initBootstrapTable();
    },


}