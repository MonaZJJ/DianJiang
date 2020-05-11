$(function() {
    StoreList.init();
})
var StoreList = {
    name: "",
    init: function() {
        //初始化
        StoreList.initBootstrapTable();

        //点击提交
        $("#search").click(function() {
            StoreList.projectQuery()
        });

        //点击重置
        $("#clear").click(function() {
            $("#storeName").val("");
            $("#userName").val("");
            $("#phone").val("");
        })

        //删除
        $("#storeTable").on("click", ".status_delete", function() {
            var SId = $(this).attr("data-id")
            Common.confirmDialog("确认删除该门店吗？", function() {
                StoreList.deleteStore(SId);
            });
        });

        //点击编辑
        $("body").on("click", ".status_edit", function() {
            var id = $(this).attr("data-id");
            window.location.href = "/store/editStore?id=" + id;
        });

        //查看订单
        $("body").on("click", ".status_see", function() {
            // var id = $(this).attr("data-id");
            StoreList.name = $(this).attr("data-name");
            window.location.href = "/store/storeOrder?name=" + StoreList.name;
        })

    },

    //删除门店
    deleteStore: function(id) {
        //请求方法
        var methodName = "/shipper/AdminDelStore";
        var data = {
            "SId": id,
        };
        //请求接口
        SignRequest.set(methodName, data, function(data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("删除成功", function() {
                    StoreList.projectQuery();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //bootstrapTable
    initBootstrapTable: function() {
        $('#storeTable').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/shipper/AdminStoreList',
            dataType: "json",
            striped: true, //使表格带有条纹
            pagination: true, //在表格底部显示分页工具栏
            smartDisplay: false,
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
            queryParams: StoreList.queryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: StoreList.responseHandler,
            columns: [{
                    field: 'SId',
                    title: '编号',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'StoreName',
                    title: '门店名称',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'StoreUserName',
                    title: '门店联系人',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'StoreMobile',
                    title: '门店电话',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'StoreAddress',
                    title: '门店地址',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'AddTimeStr',
                    title: '入驻时间',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'SId',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        var html = "";
                        html += "<span class='status_edit' style='margin-right: 15px;' data-id='" + value + "'>编辑</span>";
                        html += "<span class='status_delete' style='margin-right: 15px;' data-id='" + value + "'>删除</span>";
                        html += "<span class='status_see' data-id='" + value + "' data-name='" + row.StoreName + "'>查看订单</span>";
                        return html;
                    }
                }
            ], //列
            silent: true, //刷新事件必须设置
            formatLoadingMessage: function() {
                return "请稍等，正在加载中...";
            },
            formatNoMatches: function() { //没有匹配的结果
                return '无符合条件的记录';
            },
            onLoadSuccess: function(data) {

                console.log(data);
            },
            onLoadError: function(data) {
                $('#storeTable').bootstrapTable('removeAll');
            },
            // 1.点击每行进行函数的触发
            onClickRow: function(row, tr, flied) {
                // 书写自己的方法

            },
            //2. 点击前面的复选框进行对应的操作
            //点击全选框时触发的操作
            //点击全选框时触发的操作
            onCheckAll: function(rows) {
                // for (var i = 0; i < rows.length; i++) {
                //     dishes_list.UserIdsList.push(rows[i].User.Id);
                //     dishes_list.UserOpenIds.push(rows[i].User.OpenId);
                // }
            },
            onUncheckAll: function(rows) {

            },
            //点击每一个单选框时触发的操作
            onCheck: function(row) {

            },
            //取消每一个单选框时对应的操作；
            onUncheck: function(row) {
                Array.prototype.remove = function(val) {
                    var index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                };

            }
        });
    },
    //bootstrap table post 参数 queryParams
    queryParams: function(params) {
        //配置参数
        //方法名
        var methodName = "/shipper/AdminStoreList";
        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            "StoreName": StoreList.name,
            Page: {
                PageSize: params.limit, //页面大小,
                PageIndex: (params.offset / params.limit) + 1, //页码
            }
        };
        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseHandler: function(res) {
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
    refreshQuery: function(parame) {
        if (parame == "" || parame == undefined) {
            var obj = {
                "StoreName": StoreList.name,
            };
        } else {
            var obj = parame;
        }
        $('#storeTable').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + '/shipper/AdminStoreList',
                query: obj
            }
        );
    },
    //表格刷新(先销毁后初始化)
    projectQuery: function(parame) {
        if (parame == "" || parame == undefined) {
            var obj = {
                "StoreName": StoreList.name,
                Page: {
                    PageSize: 10, //页面大小,
                    PageIndex: 1, //页码
                }
            };
        } else {
            var obj = parame;
        }

        $('#storeTable').bootstrapTable(
            "destroy", {
                url: SignRequest.urlPrefix + '/shipper/AdminStoreList',
                query: obj
            }
        );
        StoreList.initBootstrapTable();
    }
};