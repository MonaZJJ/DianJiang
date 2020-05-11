$(function () {
    logisticObj.init();

});
var logisticObj = {
    id: 0,

    init: function () {

        logisticObj.listInit();

        //点击查询按钮
        $('#search_company_btn').click(function () {
            logisticObj.projectQuery();
        });

        //每页显示数量
        $(".all_zongti_operation #pagesize_dropdown").on("change", function () {
            logisticObj.projectQuery();
        });

        //点击编辑按钮
        $('body').on('click', '.status_edit', function () {
            var id = $(this).attr('data-id');
            var name = $(this).attr('data-name');
            logisticObj.id = id;
            $("#editLogisticModal").modal('show');
            $('#editLogisticModal #edit_Logistic_input').val(name);
        })

        //编辑确认按钮
        $('#edit_Logistic_confirm').click(function () {
            if (!Validate.emptyValidateAndFocus("#edit_Logistic_input", "请输入公司名称", "")) {
                return false;
            }
            logisticObj.editCompany();
        });

        //点击状态
        $('body').on('click', '.stateBtn', function () {
            var id = $(this).attr('data-id');
            logisticObj.openOrclose(id);
        });

    },


    //编辑公司
    editCompany: function () {
        var methodName = "/shipcompanie/AdminEditShipCompanie";
        var data = {
            "ShipCoId": logisticObj.id,
            "Name": $('#edit_Logistic_input').val()
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("编辑成功");
                logisticObj.id = 0;
                $('#edit_Logistic_input').val("");
                $('#editLogisticModal').modal('hide');
                logisticObj.refreshQuery();
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //开启或关闭
    openOrclose: function (ShipCoId) {
        var methodName = "/shipcompanie/AdminChangeShipCompanieState";
        var data = {
            "ShipCoId": ShipCoId
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("状态已改变", function () {
                    logisticObj.refreshQuery();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    listInit: function () {
        $('#logistic_info_tb').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/shipcompanie/AdminShipCompanieList',
            dataType: "json",
            striped: true, //使表格带有条纹
            pagination: true, //在表格底部显示分页工具栏
            pageSize: $("#pagesize_dropdown").val(),
            pageNumber: 1,
            pageList: [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000],
            idField: "ShipCoId", //标识哪个字段为id主键
            showToggle: false, //名片格式
            cardView: false, //设置为True时显示名片（card）布局
            // showColumns: true, //显示隐藏列
            // showRefresh: true, //显示刷新按钮
            singleSelect: false, //复选框只能选择一条记录
            search: false, //是否显示右上角的搜索框
            clickToSelect: true, //点击行即可选中单选/复选框
            sidePagination: "server", //表格分页的位置
            queryParams: logisticObj.queryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: logisticObj.responseHandler,
            columns: [
                // {
                //     field: 'ShipCoId',
                //     title: '',
                //     align: 'center',
                //     valign: 'middle',
                //     formatter: function(value, row, index) {
                //         var html = '<input type="checkbox" class="checkbox" data-id="'+ value +'">'
                //         return html;
                //     }
                // },
                {
                    field: 'ShipCoId',
                    title: '编号',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Name',
                    title: '公司名称',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'State',
                    title: '开启状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == 1) {
                            var html = '<img src="../public/images/dui.png" alt="开" class="stateBtn" data-id="'+ row.ShipCoId +'">';
                        } else {
                            var html = '<img src="../public/images/cuo.png" alt="关" class="stateBtn" data-id="'+ row.ShipCoId +'">';
                        }
                        return html;
                    }
                },
                {
                    field: 'ShipCode',
                    title: '公司编码',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'ShipCoId',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = '<a class="status_edit" data-id="' + value + '" data-name="'+ row.Name +'">编辑</a>';
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
                //$('.caret').remove()
            },
            onLoadError: function (data) {
                //$('#dishes_list_table').bootstrapTable('removeAll');
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
    queryParams: function (params) {//请求参数
        //配置参数
        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            Name: $('#companyNameTxt').val(),
            Page: {
                PageSize: params.limit,
                PageIndex: (params.offset / params.limit) + 1,
            }
        };
        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseHandler: function (res) {
        console.log(res)
        if (res.Data != null) {
            console.log(res);
            return {
                "rows": res.Data.ShipCompanieList,
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
        var methodName = "/shipcompanie/AdminShipCompanieList";
        if (parame == "" || parame == undefined) {
            var obj = {
                Name: $('#companyNameTxt').val(),
            };
        } else {
            var obj = parame;
        }
        $('#logistic_info_tb').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );
    },
    //表格刷新（先销毁后初始化）
    projectQuery: function (parame) {
        //方法名
        var methodName = "/shipcompanie/AdminShipCompanieList";
        if (parame == "" || parame == undefined) {
            var obj = {
                Name: $('#companyNameTxt').val(),
                Page: {
                    PageSize: $("#pagesize_dropdown").val(), //页面大小,
                    PageIndex: 1, //页码
                }
            };
        } else {
            var obj = parame;
        }
        $('#logistic_info_tb').bootstrapTable(
            "destroy", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );
        logisticObj.listInit();
    }

}