var StoreList = {

    init: function () {

        $('body').on('click', '.addBtnClick', function () {
            location.href = '/product/styleAdd'
        })
        //初始化表格
        StoreList.initBootstrapTable();
        //每页显示数量
        $("#pagesize_dropdown").on("change", function () {
            StoreList.projectDectoryQuery();
        });
        //点击删除
        $('body').on('click', '.status_delect', function () {
            var id = $(this).attr('data-id');
            Common.confirmDialog('确认要删除?', function () {
                StoreList.adminDelStyle(id)
            })
        })
        //点击查询
        $('body').on('click', '#searchBtn', function () {
            StoreList.projectQuery()
        })
        //重置按钮点击
        $('body').on('click', '#resetBtn', function () {
            $('#Name').val("")
        })


    },
    //后台删除风格
    adminDelStyle: function (id) {
        var methodName = "/product/AdminDelProductStyle";
        var data = {
            "StyleId": id
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("删除成功", function () {
                    StoreList.projectQuery();
                });
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //bootstrapTable
    initBootstrapTable: function () {
        $('#productTable').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/product/AdminProductStyleList',
            dataType: "json",
            striped: true, //使表格带有条纹
            pagination: true, //在表格底部显示分页工具栏
            pageSize: $("#pagesize_dropdown").val(),
            pageNumber: 1,
            pageList: [5, 10, 20, 50, 100, 500, 1000, 2000, 5000, 10000],
            idField: "Id", //标识哪个字段为id主键
            showToggle: false, //名片格式
            cardView: false, //设置为True时显示名片（card）布局
            sortable: true,
            sortName: 'SId',
            sortOrder: "desc",
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
            columns: [
                {
                    field: 'StyleId',
                    title: '编号',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Name',
                    title: '名称',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var e = '<span>' + value + '</span>';
                        return e;
                    }
                },
                {
                    field: 'DisplayOrder',
                    title: '排序',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {

                        var html = `${value}`

                        return html;
                    }
                },
                {
                    field: 'AddTimes',
                    title: '添加时间',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {

                        var html = `${value}`

                        return html;
                    }
                },
                {
                    field: 'StyleId',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    class: "operation",
                    width: 200,
                    formatter: function (value, row, index) {

                        var html = '<a class="editor" href="/product/styleEdit?id=' + row.StyleId + '">编辑</a>';
                        html += `<span style="padding: 0 6px;color: #3c8dbc;cursor: pointer" class="status_delect " data-id="${row.StyleId}">删除</span>`

                        return html;
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
                console.log(data);

                $('.caret').remove()

            },
            onLoadError: function (data) {
                $('#dishes_list_table').bootstrapTable('removeAll');
            },
            // 1.点击每行进行函数的触发
            onClickRow: function (row, tr, flied) {
                // 书写自己的方法
                // console.log(row);
                // console.log(tr);
                // console.log(flied);
            },
            //2. 点击前面的复选框进行对应的操作
            //点击全选框时触发的操作
            //点击全选框时触发的操作
            onCheckAll: function (rows) {

                // for (var i = 0; i < rows.length; i++) {
                //     DishesList.UserIdsList.push(rows[i].User.Id);
                //     DishesList.UserOpenIds.push(rows[i].User.OpenId);
                // }

            },
            onUncheckAll: function (rows) {

            },
            //点击每一个单选框时触发的操作
            onCheck: function (row) {


            },
            //取消每一个单选框时对应的操作；
            onUncheck: function (row) {


            }
        });
    },
    //bootstrap table post 参数 queryParams
    queryParams: function (params) {
        //配置参数
        //方法名
        var methodName = "/product/AdminProductStyleList";

        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageSize: params.limit, //页面大小
            pageNumber: (params.offset / params.limit) + 1, //页码
            minSize: $("#leftLabel").val(),
            maxSize: $("#rightLabel").val(),
            minPrice: $("#priceleftLabel").val(),
            maxPrice: $("#pricerightLabel").val(),
            sortOrder: params.order,//排序
            sortName: params.sort,//排序字段
            Page: {
                PageSize: params.limit,
                PageIndex: (params.offset / params.limit) + 1,
            },
            Name: $('#Name').val(),

        };
        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseHandler: function (res) {
        if (res.Data != null) {
            console.log(res);
            return {
                "rows": res.Data.AdminProductStyleInfoList,
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
    projectQuery: function (parame) {
        if (parame == "" || parame == undefined) {
            var obj = {
                Name: $('#Name').val(),
            };
        } else {
            var obj = parame;
        }
        //方法名
        var methodName = "/product/AdminProductStyleList";


        $('#productTable').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + '/product/AdminProductStyleList',
                query: obj
            }
        );
        // StoreList.initBootstrapTable()
    },
    projectDectoryQuery: function (parame) {
        if (parame == "" || parame == undefined) {
            var obj = {
                Name: $('#Name').val(),
                Page: {
                    PageSize: $("#pagesize_dropdown").val(),//页面大小,
                    PageIndex: 1,//页码
                }
            };
        } else {
            var obj = parame;
        }
        //方法名
        var methodName = "/product/AdminProductStyleList";


        $('#productTable').bootstrapTable(
            "destroy", {
                url: SignRequest.urlPrefix + '/product/AdminProductStyleList',
                query: obj
            }
        );
        StoreList.initBootstrapTable()
    },


}


$(function () {

    StoreList.init()

})