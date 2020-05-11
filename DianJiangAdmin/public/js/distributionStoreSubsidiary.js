$(function () {
    distributionSubsidiary.init();
})

var distributionSubsidiary = {
    infoTemplate:`
                    <ul>
                        <li class="colorQ">门店名称：<strong style="color: black" >{{info.UserName}}</strong></li>
                        <li class="colorQ">当前可提现佣金：<strong style="color: black" >{{info.Amount}}</strong></li>
                        <li class="colorQ">未结算佣金：<strong style="color: black" >{{info.WithdrawAmount}}</strong></li>
                    </ul>
                    <ul>
                        <li class="colorQ">直接下级数：<strong style="color: black" >{{info.ChildCount}}</strong></li>
                        <li class="colorQ">直接下级成交额：<strong style="color: black" >{{info.ChildOrderAmount}}</strong></li>
                        <li class="colorQ">累计获得佣金：<strong style="color: black" >{{info.TotalAmount}}</strong></li>
                    </ul>
                    <ul>
                    <!--<li class="colorQ">上级分销员：<strong style="color: black" >{{info.DistUserName}}</strong></li>-->
                        <li class="colorQ">VIP总人数：<strong style="color: black" >{{info.VipCount}}</strong></li>
                        <li class="colorQ">会员总人数：<strong style="color: black" >{{info.MemberCount}}</strong></li>
                    </ul>
    `,

    init: function () {
        distributionSubsidiary.getSplitterInfo();
        distributionSubsidiary.initBootstrapTable();

        //表格分页每页显示数据
        $("#pagesize_dropdown").on("change", function () {
            distributionSubsidiary.projectDestroyQuery();
        });
        //查询按钮点击
        $('body').on('click', '#search', function () {
            distributionSubsidiary.projectDestroyQuery();
        })
        //导出按钮点击
        $('body').on('click','#exportBtn',function(){
            distributionSubsidiary.exportAdminDistributionDetailList();
        })

    },

    //获取分销员详细信息
    getSplitterInfo:function(){
        var methodName = "/sSplitComm/AdminGetSplitterInfo";
        var data = {
            "UId":Common.getUrlParam('id')
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                var data = {
                    info: data.Data
                }
                var render = template.compile(distributionSubsidiary.infoTemplate);
                var html = render(data);
                $('.VIPbg').html(html);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //导出后台分销明细列表
    exportAdminDistributionDetailList:function(){
        var methodName = "/sSplitComm/AdminExportDistributionDetailList";
        var data = {
            "UId":Common.getUrlParam('id'),
            "UserName": $('#UserName').val(),
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('导出成功', function () {
                    location.href = data.Data;
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //bootstrapTable
    initBootstrapTable: function () {
        $('#productTable').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/sSplitComm/AdminDistUserChildList',
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
            queryParams: distributionSubsidiary.queryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: distributionSubsidiary.responseHandler,
            columns: [
                {
                    field: 'UId',
                    title: '编号',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Avatar',
                    title: '头像',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = `<img src="${value}" alt="" style="width: 60px;height: 60px;display:inline-block;border-radius: 50%;background-color: #f1f1f1;">`;
                        return html;
                    }
                },
                {
                    field: 'UserName',
                    title: '下级用户昵称',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'UserRIdDesc',
                    title: '会员等级',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'OrderAmount',
                    title: '贡献总金额',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'SplitCommAmount',
                    title: '贡献总佣金',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'DistCount',
                    title: '直接下级数',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'CommAmount',
                    title: '累计获得佣金',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'DistTimes',
                    title: '绑定时间',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
            ], //列
            silent: true, //刷新事件必须设置
            formatLoadingMessage: function () {
                return "请稍等，正在加载中...";
            },
            formatNoMatches: function () { //没有匹配的结果
                return '无符合条件的记录';
            },
            onLoadSuccess: function (data) {

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
        var methodName = "/sSplitComm/AdminDistUserChildList";

        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            "UId":Common.getUrlParam('id'),
            "UserName": $('#UserName').val(),
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
                "total": res.Data.Total,
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
        var methodName = "/sSplitComm/AdminDistUserChildList";

        if (parame == "" || parame == undefined) {
            var obj = {
                "UId":Common.getUrlParam('id'),
                "UserName": $('#UserName').val(),
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
        var methodName = "/sSplitComm/AdminDistUserChildList";

        if (parame == "" || parame == undefined) {
            var obj = {
                "UId":Common.getUrlParam('id'),
                "UserName": $('#UserName').val(),
                PageModel: {
                    PageSize: 10,//页面大小,
                    PageIndex: 1,//页码
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

        distributionSubsidiary.initBootstrapTable();
    }

}
