var LimitSaleing = {
    name:"",
    pageSize:"10",
    init: function () {
        LimitSaleing.initBootstrapTable();

        //分页条数选择
        $('body').on('change','#pagesize_dropdown',function(){
            LimitSaleing.pageSize = $('#pagesize_dropdown').val();
            LimitSaleing.projectDectoryQuery()
        });

        //点击提前结束
        $('body').on('click','.end_limit_item',function(){
            var id = $(this).attr('data-id');
            LimitSaleing.adminEarlyEndTimeProductActivity(id);
        });

        //点击上架
         $('body').on("click",".status_up",function () {
             var id = $(this).attr('data-id');
             LimitSaleing.adminOnSaleProduct(id);
         });

        //点击下架
        $('body').on("click",".status_down",function () {
            var id = $(this).attr('data-id');
            LimitSaleing.adminOutSaleProduct(id);
        })
    },

    //提前结束接口
    adminEarlyEndTimeProductActivity:function(id){
        //请求方法
        var methodName = "/timeproductactivity/AdminEarlyEndTimeProductActivity";
        var data = {
            "ActivityId": id
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('结束成功',function(){
                    LimitSaleing.projectQuery();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //上架
    adminOnSaleProduct:function(id){
        //请求方法
        var methodName = "/timeproductactivity/AdminOnSaleProduct";
        var data = {
            "ActivityId": id
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('设置成功',function(){
                    LimitSaleing.projectQuery();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //下架
    adminOutSaleProduct:function(id){
        //请求方法
        var methodName = "/timeproductactivity/AdminOutSaleActivity";
        var data = {
            "ActivityId": id
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('设置成功',function(){
                    LimitSaleing.projectQuery();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //bootstrapTable
    initBootstrapTable: function () {
        $('#tb_limit_content').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/timeproductactivity/AdminTimeProductActivitySpecialList',
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
            queryParams: LimitSaleing.queryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: LimitSaleing.responseHandler,
            columns: [

                {
                    field: 'Title',
                    title: '活动标题',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var e = `<span>${value}</span>`
                        return e;
                    }
                },
                {
                    field: 'ToSnapUpPrice',
                    title: '抢购价格',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {

                        var e =`<span>${value}</span>`


                        return e;
                    }
                },
                {
                    field: 'HasRobNumber',
                    title: '已购总量',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var e =`<span>${value}</span>`
                        return e;
                    }
                },
                {
                    field: 'StartTime',
                    title: '开始时间',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var startTime = value.replace('T'," ")

                        var e =`<span>${startTime}</span>`


                        return e;
                    }
                },
                {
                    field: 'EndTime',
                    title: '结束时间',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var endTime = value.replace('T'," ")

                        var e =`<span>${endTime}</span>`

                        return e;
                    }
                },
                {
                    field: 'ShowStateDesc',
                    title: '展示状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var e =`<span>${value}</span>`
                        return e;
                    }
                },
                {
                    field: 'ActivityId',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = "";
                        if(row.ShowState == 0){
                            html += `<a data-id="${value}" href="javascript:void(0)" class="detail_limit_item status_up">上架</a>`;
                        }
                        if(row.ShowState == 1){
                            html += `<a data-id="${value}" href="javascript:void(0)" class="detail_limit_item status_down">下架</a>`;
                        }
                        html += `<a href="/marketMode/limitSaleDetail?ActivityId=${value}" class="detail_limit_item">活动详情</a>`;
                        html += `<a href='javascript:void(0);' class="end_limit_item" data-id="${value}">提前结束</a>` ;
                        html += `<a href="/marketMode/limitSalePerformanceEdit?ActivityId=${value}"  class="edit_limit_item">编辑</a>`;

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
        var methodName = "/timeproductactivity/AdminTimeProductActivitySpecialList";

        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            Page: {
                PageSize: params.limit,
                PageIndex: (params.offset / params.limit) + 1,
            },
            "State": 0,
            "Title": "",
            "Name": "",
        };
        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseHandler: function (res) {
        if (res.Data != null) {
            console.log(res);
            return {
                "rows": res.Data.TimeProductActivityList,
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
            obj = {
                "State": 0,
                "Title": "",
                "Name": "",
                page: {
                    PageSize: LimitSaleing.pageSize,
                    PageIndex: 1
                }
            };
        } else {
            obj = parame;
        }

        $('#tb_limit_content').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + '/timeproductactivity/AdminTimeProductActivitySpecialList',
                query: obj
            }
        );

    },
    //表格刷新
    projectDectoryQuery: function (parame) {
        if (parame == "" || parame == undefined) {
            obj = {
                "State": 0,
                "Title": "",
                "Name": "",
                page: {
                    PageSize: LimitSaleing.pageSize,
                    PageIndex: 1
                }
            };
        } else {
            obj = parame;
        }

        $('#tb_limit_content').bootstrapTable(
            "destroy", {
                url: SignRequest.urlPrefix + '/timeproductactivity/AdminTimeProductActivitySpecialList',
                query: obj
            }
        );
        LimitSaleing.initBootstrapTable()
    },
};

$(function () {

    LimitSaleing.init()


});